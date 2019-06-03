from flask import Flask, render_template
import requests

def create_app():
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

    @app.route('/')
    def index():
        return render_template('index.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
