#!/usr/bin/env python3
"""
Flask route that returns json responses necessary for web application
"""
from application.server.api import api_views
from application.models import database, CLASS_DICT
import requests

from application.models.user import User
from flask import abort, jsonify, session, request


@api_views.route('/users/', methods=['GET', 'POST'])
def users(user_id=None):
    """
    testing things
    """
    print(request.data)
    test_dict = {'name': 'Susan'}
    test = User(**test_dict)
    print(test)
    return jsonify(test.to_json())

@api_views.route('/user/', methods=['GET']) #feed in user id if we are doing this by user id
def user_info():
    """
    return user info in order to populate user page
    """
    users = database.all('User')
    for user in users.values():
        username = user.user_name
        if username is not None and username == session.get('username'): # need to decide how we are going to grab information
            return jsonify(user.to_json())
    return jsonify({'username': 'French Fries'})

@api_views.route('/job_search/', methods=['GET'])
def job_search():
    """
    for searching github job api
    """
    r = requests.get('https://jobs.github.com/positions.json?description=python&full_time=true&location=sf')
    return jsonify({'items': r.json()})
