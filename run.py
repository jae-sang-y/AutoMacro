import json
import logging
import time

import keyboard
import mouse
from flask import Flask, request, Response
from flask_apscheduler import APScheduler
from flask_socketio import SocketIO, emit
from requests import get
from werkzeug.wrappers import BaseResponse

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

        BaseResponse.automatically_set_content_length = False

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
            else:
                raise data
            return data

        @self.errorhandler(404)
        def proxy(e):
            headers = dict(request.headers)
            if 'Host' in headers and headers['Host'] == 'localhost':
                headers['Host'] = 'localhost:3000'
            data = get(f'http://127.0.0.1:3000{request.path}', headers=headers, timeout=1)
            if 'Content-Type' in data.headers:
                return Response(data.content, mimetype=data.headers[
                    'Content-Type'])  # data.raw.read(), data.status_code, data.headers.items()
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
