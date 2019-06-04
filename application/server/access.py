from flask import Blueprint, render_template, redirect, request

bp = Blueprint('user', __name__, url_prefix='/user', static_folder='../static/dist', template_folder='../static/templates')

@bp.route('/', methods=('GET', 'POST'))
def homepage():
    return render_template('user.html')
