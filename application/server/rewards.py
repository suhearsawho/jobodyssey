from flask import Blueprint, session, render_template, redirect, request, url_for
from application.models.user import User
from application.models import database
import requests
import os

bp = Blueprint(
    'rewards', __name__, url_prefix='/rewards', static_folder='../static/dist', template_folder='../static/templates')


@bp.route('/', methods=('GET', 'POST'))
def homepage():
    """
    Homepage Route
    :return:
    Route for the homepage if the username is found
    """
    if 'username' in session:
        return render_template('user.html')
    return render_template('index.html')
