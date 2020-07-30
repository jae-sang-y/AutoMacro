from uuid import uuid4

import mouse
from flask import Flask


class AutoMacro(Flask):
    class State:
        idle = 0
        run = 1

    class CommandTypes:
        add_global_var = 0
        image_search = 3
        key_down = 4
        key_up = 5
        mouse_click = 6
        sound_alarm = 8
        goto_group = 8
        delay = 10

    class AbleKeyList:
        a = 'A'
        b = 'B'
        c = 'C'
        d = 'D'
        e = 'E'
        f = 'F'
        g = 'G'
        h = 'H'
        i = 'I'
        j = 'J'
        k = 'K'
        l = 'L'
        m = 'M'
        n = 'N'
        o = 'O'
        p = 'P'
        q = 'Q'
        r = 'R'
        s = 'S'
        t = 'T'
        u = 'U'
        v = 'V'
        w = 'W'
        x = 'X'
        y = 'Y'
        z = 'Z'

    class AbleButtonList:
        left = 'Left'
        middle = 'Middle'
        right = 'Right'

    CommandPushButtons = {
        '전역 변수 추가': {
            'enable': False,
            'default_value': {'type': CommandTypes.add_global_var, },
        },
        '이미지 서치 추가': {
            'enable': False,
            'default_value': {'type': CommandTypes.image_search, },
        },
        '키다운 추가': {
            'enable': True,
            'default_value': {'type': CommandTypes.key_down, 'key': AbleKeyList.a},
        },
        '키 업 추가': {
            'enable': True,
            'default_value': {'type': CommandTypes.key_up, 'key': AbleKeyList.a},
        },
        '마우스 클릭': {
            'enable': True,
            'default_value': {'type': CommandTypes.mouse_click, 'button': AbleButtonList.left},
        },
        '사운드 알람': {
            'enable': False,
            'default_value': {'type': CommandTypes.sound_alarm, },
        },
        '그룹 전환': {
            'enable': False,
            'default_value': {'type': CommandTypes.goto_group, },
        },
        '시간 지연': {
            'enable': True,
            'default_value': {'type': CommandTypes.delay, 'second': 1.0},
        },
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.state = AutoMacro.State.idle
        self.groups = {
            '메인': {
                'command_blocks': [
                    {**self.CommandPushButtons['시간 지연']['default_value'], 'uuid': uuid4()}
                ]
            },
            '서브루틴': {
                'command_blocks': [
                    {**self.CommandPushButtons['시간 지연']['default_value'], 'uuid': uuid4()}
                ]
            },
        }

        @self.route('/get_mouse_pos')
        def get_mouse_pos():
            pos = mouse.get_position()
            return {'x': pos[0], 'y': pos[1]}


app = AutoMacro(__name__)
if __name__ == '__main__':
    app.run(port=80, debug=True)
