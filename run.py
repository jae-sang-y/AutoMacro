from flask import Flask

import mime

app = Flask(__name__)

mime.react = mime.MimeReact(
    app,
    extensions=("material", "components", 'bootstrap'),
    jsx_folder='react/jsx/'
)

'''

@app.route('/get_mouse_pos')
def get_mouse_pos():
    pos = mouse.get_position()
    return {'x': pos[0], 'y': pos[1]}


@app.route('/lib/<path:filename>')
def static_files(filename):
    try:
        response = make_response(
            open(f'lib/{filename}', encoding='utf-8').read(),
            200
        )
        if filename.endswith('.js') or filename.endswith('.jsx'):
            response.headers['Content-Type'] = 'application/javascript; charset="utf-8"'
            response.headers['X-Content-Type-Options'] = 'nosniff'
        elif filename.endswith('.css'):
            response.headers['Content-Type'] = 'text/css'
        return response
    except:
        print(traceback.format_exc())
        return make_response('', 500)
'''
if __name__ == '__main__':
    app.run(port=80, debug=True)
