#!/usr/bin/env python3
"""
Flask route that returns json responses necessary for web application
"""
from application.server.api import api_views
from application.models import database, CLASS_DICT
import requests

from application.models.user import User, UserReward
from application.models.reward import Reward
from flask import abort, jsonify, session, request
import pdb
import json
from random import randint
import uuid


@api_views.route('/rewards', methods=['GET', 'POST'])
def rewards():
    """
    testing things
    """
    if request.method == 'GET':
        rewards = {'data': []}
        for i in range(10):
            random_int = randint(0, 100)
            """ This logic can be changed as rewards becomes more populated"""
            if random_int < 70:
                roll = database.get('Reward', '4')
            elif random_int < 90:
                roll = database.get('Reward', '3')
            elif random_int < 98:
                roll = database.get('Reward', '2')
            elif random_int == 98:
                roll = database.get('Reward', '1')
            else:
                roll = database.get('Reward', '0')
            rewards['data'].append({'name': roll.name, 'img': roll.image, 'rarity': roll.rarity, 'id': roll.id})
        return jsonify(rewards)
    data = request.get_json()
    user = database.get('User', data['user_id'])
    if database.duplicateUserReward(data['user_id'], data['reward_id']) is False:
        new_user_reward = UserReward(**data)
        new_user_reward.save()
    user.currency -= 5
    user.save()
    return jsonify(user.to_json())

@api_views.route('/user', methods=['GET']) #feed in user id if we are doing this by user id
def user_info():
    """
    return user info in order to populate user page
    """
    user = database.get('User', session['id'])
    return jsonify(user.to_json())

@api_views.route('/csv', methods=['GET'])
def csv():
    """
    returns a string csv of the jobs applied for a user
    """
    user = database.get('User', session['id'])
    return user.get_csv()

@api_views.route('/user/rewards', methods=['GET'])
def user_rewards():
    """
    return all rewards associated with a user
    """
    return jsonify(database.userRewards(session['id']))

@api_views.route('/job_search', methods=['POST'])
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

    # GET: Return all jobs that user has applied to
    if request.method == 'GET':
        return jsonify(user.jobs_applied), 200

    if request.is_json is False:
        return jsonify(error="Not a valid JSON"), 400

    jobs = json.loads(user.jobs_applied)
    data = request.get_json()
    if request.method != 'POST':
        job_id = data.get('id')
    if ((request.method == 'DELETE' or request.method == 'PUT') and
        (job_id not in jobs)):
        response = {'error': 'Not a valid ID'}
    else:
        # PUT: Change an existing entry
        if request.method == 'PUT':
            for key, value in data.items():
                if key != 'id':
                    jobs[job_id][key] = value
            user.currency += 10
        # POST: Creates a new entry
        elif request.method == 'POST':
            print(data)
            job_id = str(uuid.uuid4())
            jobs[job_id] = data
            user.currency += 10

        # DELETE: Deletes an entry
        elif request.method == 'DELETE':
            jobs.pop(job_id)

        user.jobs_applied = json.dumps(jobs)
        user.save()
        response = {'success': True}

    status = 200 if 'success' in response else 404
    return jsonify(response), status

@api_views.route('/jobs/interested', methods=['GET', 'POST', 'PUT', 'DELETE'])
def jobs_interested():
    """
    Used to retrieve, add, update, and delete jobs that the user is interested in

    """
    user = database.get('User', session['id'])
    # GET: Return all jobs that user is interested in
    if request.method == 'GET':
        return jsonify(user.jobs_interested), 200

    if request.is_json is False:
        return jsonify(error="Not a valid JSON"), 400

    jobs = json.loads(user.jobs_interested)
    data = request.get_json()
    job_id = data.get('id')
    if ((request.method == 'DELETE' or request.method == 'PUT') and
        (job_id not in jobs)):
        response = {'error': 'Not a valid job ID'}
    else:
        # PUT: Change an existing entry
        if request.method == 'PUT':
            for key, value in data.items():
                if key != 'id':
                    jobs[job_id][key] = value
            user.currency += 10
        # POST: Creates a new entry
        elif request.method == 'POST':
            if job_id not in jobs:
                data.pop('id')
                jobs[job_id] = data
                user.currency += 10

        # DELETE: Deletes an entry
        elif request.method == 'DELETE':
            jobs.pop(job_id)

        user.jobs_interested = json.dumps(jobs)
        user.save()
        response = {'success': True}

    status = 200 if 'success' in response else 404
    return jsonify(response), status
