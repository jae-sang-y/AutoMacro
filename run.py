import keyboard
import mouse
from flask import Flask

app = Flask(__name__)

mouse.click()
@app.route('/')
def main():
    return open('index.html', encoding='utf-8').read()


if __name__ == '__main__':
    app.run(port=80)
