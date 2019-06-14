"""This module creates the application for Job Odyssey"""
from flask import Blueprint, Flask, render_template, redirect, request, url_for, jsonify, session
from flask_cors import CORS, cross_origin
import os
import requests
from application.models import database

# Retrieves client ID and secret from Github
client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')

# Key for storing session and cookie information cryptographically
flask_secret = os.environ.get('FLASK_SECRET')

# Creates the application
app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')
app.url_map.strict_slashes = False
app.secret_key = flask_secret

cors = CORS(app, resources={r"/*": {"origins": "*"}})


from application.server.api import api_views
app.register_blueprint(api_views)

from application.server import access
app.register_blueprint(access.bp)

from application.server import jobs
app.register_blueprint(jobs.bp)

from application.server import rewards
app.register_blueprint(rewards.bp)

@app.teardown_appcontext
def teardown_db(exception):
    """
    teardown current SQLAlchemy session with each request
    """
    database.close()

@app.route('/', methods=('GET', 'POST'))
def index():
    if session.get('username'):
        return redirect(url_for('user.homepage'))
    return render_template('index.html')

@app.route('/login')
def github_login():
    github_url = 'https://github.com/login/oauth/authorize?client_id={}'.format(client_id);
    return jsonify({'redirect': github_url});

@app.errorhandler(404)
def page_not_found(e):
    if session.get('username'):
        return render_template('user.html')
    return render_template('index.html')

if __name__ == '__main__':
    if os.environ.get('DEV'):
        host = '127.0.0.1'
    else:
        host = '0.0.0.0'
    app.run(debug=True, host=host, port=8000)
