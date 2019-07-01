from flask import Blueprint, session, render_template, redirect, request, url_for, make_response, jsonify
from application.models.user import User
from application.models import database
import requests
import os

bp = Blueprint('user', __name__, url_prefix='/user', static_folder='../static/dist', template_folder='../static/templates')

client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')


@bp.route('/', methods=('GET', 'POST'))
def homepage():
    if 'username' in session:
        resp = make_response(render_template('user.html'))
        return resp

    return redirect(url_for('index'))


@bp.route('/community', methods=('GET', 'POST'))
def community():
    if 'username' in session:
        resp = make_response(render_template('user.html'))
        return resp

    return redirect(url_for('index'))


@bp.route('/auth', methods=('GET', 'POST'))
def github_auth():
    """
    Github OAuth, redirects to github OAuth and obtains token using client id and secret
    :return:
    """
    if 'code' in request.args:
        github_url = 'https://github.com/login/oauth/access_token'
        data = {'client_id': client_id,
                'client_secret': client_secret,
                'code': request.args.get('code'),
                }
        headers = {'Accept': 'application/json'}
        r = requests.post(github_url, data=data, headers=headers)
        results = r.json()

        print(results)
        # Note: Once values are added to session, Flask will turn these into
        # a cookie that will be stored on the client side
        # (using set-cookie on header since cookies is not a valid header on
        # a response?)
        # Because of the secret key, values are stored with cryptography
        
        username, name = get_username(results.get('access_token'))
        session['username'] = username
        session['code'] = request.args.get('code')

        # Import the user model and create a new instance of the object
        users = database.all('User')
        for user in users.values():
            if user.user_name == session['username']:
                session['id'] = user.id
                return redirect(url_for('user.homepage'))
        new_user = User(**({'user_name': username,
                            'name': name}))
        new_user.save()
        session['id'] = new_user.id
        return redirect(url_for('user.homepage'))


@bp.route('/logout')
def user_logout():
    """
    clears session in order to remove username and token
    :return:
    dictionary with redirect url for index
    """
    session.clear()
    return jsonify({'redirect': url_for('index')})


def get_username(access_token):
    """
    Grabs username from Github API using user token
    :param access_token:
    :return:
    The login username of the authenticated user
    """
    github_url = 'https://api.github.com/user'
    headers = {'Authorization': 'token {}'.format(access_token),
               'Accept': 'application/json'
              }

    r = requests.get(github_url, headers=headers)
    results = r.json()
    print('IN GET_USERNAME FUNCTION', results)
    return (results.get('login'), results.get('name'))
