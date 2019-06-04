from flask import Blueprint, Flask, render_template, redirect, request, url_for, jsonify, g
from flask_cors import CORS, cross_origin
import os

client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')
from models import database

def create_app():
    app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')
    app.url_map.strict_slashes = False

    cors = CORS(app, resources={r"/*": {"origins": "*"}})


    from server.api import api_views
    app.register_blueprint(api_views)

    from server import access
    app.register_blueprint(access.bp)

    @app.route('/', methods=('GET', 'POST'))
    def index():
        return render_template('index.html')

    @app.route('/login')
    def github_login():
        github_url = 'https://github.com/login/oauth/authorize?client_id={}'.format(client_id);
        return jsonify({'redirect': github_url});
    
    @app.route('/hi')
    def hi():
        return database.all()

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('error.html'), 404
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

def testing():
    print('in testing', g.get('username'))
