import json
import logging
import time
import datetime

import keyboard
import mouse
from playsound import playsound
from PIL import Image, ImageChops

from desktopmagic.screengrab_win32 import saveScreenToBmp, saveRectToBmp, getScreenAsImage
from flask import Flask, request, Response
from flask_apscheduler import APScheduler
from flask_socketio import SocketIO, emit
from requests import get
from werkzeug.wrappers import BaseResponse

from os import listdir

SAMPLE_IMAGES_PATH = 'image_samples'
SOUND_EFFECTS_PATH = 'sound_effects'

log = logging.getLogger('werkzeug')
log.setLevel(logging.WARNING)


class AutoMacro(Flask):
    class Config(object):
        SECRET_KEY = 'secret!'
        SCHEDULER_API_ENABLED = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.config.from_object(self.Config())

        with open('macro.dat', 'r', encoding='utf-8') as f:
            self.macro_data = json.loads(f.read())
        self.set_route()
        self.io = SocketIO(self)
        self.set_handler()
        self.scheduler = APScheduler()
        self.set_scheduler()
        self.scheduler.init_app(self)
        self.scheduler.start()
        keyboard.on_press_key('F1', self.on_emergency_key_press)
        BaseResponse.automatically_set_content_length = False

    def on_emergency_key_press(self, event):
        self.io.emit('emergency_stop')

    def set_route(self):
        @self.route('/macro_data', methods=['POST', 'GET'])
        def macro_data():
            if request.method == 'POST':
                self.macro_data = json.loads(request.data.decode('utf-8'))
                with open('macro.dat', 'w', encoding='utf-8') as f:
                    f.write(json.dumps(self.macro_data))
                return self.macro_data
            elif request.method == 'GET':
                return self.macro_data

        @self.route('/macro/<path:path>', methods=['POST'])
        def macro(path):
            data = json.loads(request.data.decode('utf-8'))
            print(data)
            if path == 'keydown':
                keyboard.press(data['key'])
            elif path == 'keyup':
                keyboard.release(data['key'])
            elif path == 'mouse_click':
                mouse.click(data['button'])
            elif path == 'mouse_move':
                mouse.move(data['x'], data['y'], duration=float(data['duration']))
            elif path == 'delay':
                time.sleep(float(data['second']))
            elif path == 'sound':
                playsound(f'{SOUND_EFFECTS_PATH}/{data["sound"]}')
            elif path == 'image_compare':
                prev_image = Image.open(f'{SAMPLE_IMAGES_PATH}/{data["sample"]}')

                curr_image = getScreenAsImage(). \
                    crop((int(data['x']), int(data['y']),
                          int(data['x']) + int(data['w']),
                          int(data['y']) + int(data['h'])))

                diff = ImageChops.difference(prev_image, curr_image)
                if diff.getbbox() is None:
                    data['result'] = 'OK'
                else:
                    data['result'] = 'NO'
                    diff.save(f'image_compare_log/{datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.bmp')
            else:
                raise data
            return data

        @self.route('/get_sample_list', methods=['GET'])
        def get_sample_list():
            self.sample_list = {'data': [file_name for file_name in listdir(SAMPLE_IMAGES_PATH)]}
            return self.sample_list

        @self.route('/get_sound_list', methods=['GET'])
        def get_sound_list():
            self.sound_list = {'data': [file_name for file_name in listdir(SOUND_EFFECTS_PATH)]}
            return self.sound_list

        @self.errorhandler(404)
        def proxy(e):
            headers = dict(request.headers)
            if 'Host' in headers and headers['Host'] == 'localhost':
                headers['Host'] = 'localhost:3000'
            data = get(f'http://127.0.0.1:3000{request.path}', headers=headers, timeout=1)
            if 'Content-Type' in data.headers:
                return Response(data.content, mimetype=data.headers[
                    'Content-Type'])
            else:
                return data.content

    def set_handler(self):
        @self.io.on('connect')
        def connect():
            emit('hello', {'data': 'Connected'})

    def set_scheduler(self):
        @self.scheduler.task('interval', seconds=0.01)
        def update_mouse_pos():
            pos = mouse.get_position()
            self.io.emit('mouse_pos', {'x': pos[0], 'y': pos[1]})


app = AutoMacro(__name__)

if __name__ == '__main__':
    app.io.run(app, port=80)
