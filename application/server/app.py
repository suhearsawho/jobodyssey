from flask import Blueprint, Flask, render_template, redirect, request
from flask_cors import CORS, cross_origin
import os

client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')
from application.models import database

app = Flask(__name__, static_folder='../static/dist', template_folder='../static/templates')
app.url_map.strict_slashes = False

cors = CORS(app, resources={r"/*": {"origins": "*"}})


from application.server.api import api_views
app.register_blueprint(api_views)

from application.server import access
app.register_blueprint(access.bp)

@app.route('/', methods=('GET', 'POST'))
def index():
    github_url = 'https://github.com/login/oauth/authorize?client_id={}'.format(client_id);
    if request.method == 'POST':
        print('request.method')
        return redirect(github_url)

    return render_template('index.html')

@app.route('/hi')
def hi():
    return database.all()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html'), 404


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8000)
