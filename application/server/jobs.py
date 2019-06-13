from flask import Blueprint, session, render_template, redirect, request, url_for
from application.models.user import User
from application.models import database
import requests
import os

bp = Blueprint('jobs', __name__, url_prefix='/jobs', static_folder='../static/dist', template_folder='../static/templates')

client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')

@bp.route('/appliedform')
def applied_form():
    if 'username' in session:
        return render_template('user.html')
    return render_template('index.html')

@bp.route('/appliedhistory')
def applied_history():
    if 'username' in session:
        return render_template('user.html')
    return render_template('index.html')
