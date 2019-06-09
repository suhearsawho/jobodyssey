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

@api_views.route('/job_search/', methods=['POST'])
def job_search():
    """
    for searching github job api
    """
    params = request.get_json()
    r = requests.get('https://jobs.github.com/positions.json?', params=params)
    return jsonify({'items': r.json()})

@api_views.route('/jobs/applied', methods=['GET', 'POST', 'PUT', 'DELETE'])
def jobs_applied():
    """
    Used to retrieve, add, update, and delete jobs that the user has applied to
    """
    user = database.get('User', session['id'])
    # applied is a dictionary 
    if request.method == 'GET':
        return jsonify(user.jobs_applied)

    data = request.get_json()
    if request.method == 'PUT':
        # User can change status or notes
        # Frontend - Send Dictionary {key: {values to update}}
        for index, value in data.items():
            for key, change in value.items():
                user.jobs_applied[index][key] = change
        response = {}

    if request.method == 'POST':
        # Frontend - Send dictionary of new values {values to update}
        user.jobs_applied[applied['max'] + 1] = data
        user.jobs_applied['max'] += 1
        user.currency += 10
        
        # TODO add a multiplier?
        response = {'index': user.jobs_applied['max'] + 1}
        # Return the index so that it can be used by Frontend
         
    if request.method == 'DELETE':
        # This method assumes that the data is an integer type
        del user.jobs_applied[data]
        response = {}

    user.save()
    return jsonify(response)


@api_views.route('/jobs/interested', methods=['GET', 'POST', 'PUT', 'DELETE'])
def jobs_interested():
    """
    Used to retrieve, add, update, and delete jobs that the user is interested in
    """
    user = database.get('User', session['id'])
    # applied is a dictionary 
    if request.method == 'GET':
        return jsonify(user.jobs_interested)

    data = request.get_json()
    if request.method == 'PUT':
        # User can change status or notes
        # Frontend - Send Dictionary {key: {values to update}}
        for index, value in data.items():
            for key, change in value.items():
                user.jobs_interested[index][key] = change
        response = {}

    if request.method == 'POST':
        # Frontend - Send dictionary of new values {values to update}
        user.jobs_interested[applied['max'] + 1] = data
        user.jobs_interested['max'] += 1
        user.currency += 10
        
        # TODO add a multiplier?
        response = {'index': user.jobs_interested['max'] + 1}
        # Return the index so that it can be used by Frontend
         
    if request.method == 'DELETE':
        del user.jobs_interested[data]
        response = {}

    user.save()
    return jsonify(response)
