#!/usr/bin/env python3
"""
Flask route that returns json responses necessary for web application
"""
from application.server.api import api_views
from application.models import database, CLASS_DICT
import requests

from application.models.user import User, UserReward
from application.models.reward import Reward
from application.models.jobs_applied import JobsApplied
from flask import abort, jsonify, session, request
import pdb
import json
from random import randint
import uuid


@api_views.route('/rewards', methods=['GET', 'POST'])
def rewards():
    """
    Processes GET and POST requests to fetch a randomized array of rewards or update user_rewards with a newly
    created user_reward relationship, respectively
    :return:
    For GET requests will return a dictionary with an array of randomized rewards, populated based on rarity
    For POST requests will take the data and add the user_reward object to the database based on user_id and reward_id
    """
    if request.method == 'GET':
        rand_rewards = {'data': []}
        for i in range(10):
            random_int = randint(0, 100)
            """ Setting rarities of rewards based on the result of a random int """
            if random_int < 70:
                roll = database.get('Reward', str(randint(26, 48)))
            elif random_int < 90:
                roll = database.get('Reward', str(randint(17, 25)))
            elif random_int < 98:
                roll = database.get('Reward', str(randint(3, 16)))
            else:
                roll = database.get('Reward', str(randint(0, 2)))
            if roll is None:
                roll = database.get('Reward', '30')
            rand_rewards['data'].append({'name': roll.name, 'img': roll.image, 'rarity': roll.rarity, 'id': roll.id})
        return jsonify(rand_rewards)
    data = request.get_json()
    user = database.get('User', data['user_id'])
    """ Checks database for duplicate user_reward entry """
    if user.check_duplicate_reward(data['reward_id']) is False:
        new_user_reward = UserReward(**data)
        new_user_reward.save()
    user.currency -= 30
    user.save()
    return jsonify(user.to_json())


@api_views.route('/user', methods=['GET'])
def user_info():
    """
    API call for returning a user for userpage
    Return:
        JSON formatted user information
    """
    user = database.get('User', session['id'])
    print(user.to_json())
    return jsonify(user.to_json())


@api_views.route('/user/currency', methods=['GET'])
def user_token():
    """
    API call for obtaining the user's current amount of currency
    :return:
    Currency of a user
    """
    user = database.get('User', session['id'])
    return jsonify({'currency': user.currency})


@api_views.route('/csv', methods=['GET'])
def csv():
    """
    API call for the CSV formatted jobs_applied variable of a user
    :return:
    CSV formatted jobs_applied variable of the user
    """
    user = database.get('User', session['id'])
    return user.get_csv()


@api_views.route('/user/rewards', methods=['GET'])
def user_rewards():
    """
    return all rewards associated with a user
    """
    user = database.get('User', session['id'])
    return jsonify(user.get_user_rewards())


@api_views.route('/job_search', methods=['POST'])
def job_search():
    """
    Uses the Github Jobs API to find results that match search parameters
    :return:
    Results that match the POST request search parameters from Github Jobs
    """
    params = request.get_json()
    r = requests.get('https://jobs.github.com/positions.json?', params=params)
    return jsonify({'items': r.json()})


@api_views.route('/jobs/applied', methods=['GET', 'POST', 'PUT', 'DELETE'])
def jobs_applied():
    """
    Used to retrieve, add, update, and delete jobs that the user has applied to
    :return:
    A user's jobs_applied for successful GET requests, error on invalid requests, and status code otherwise
    """
    user = database.get('User', session['id'])

    # GET: Return all jobs that user has applied to
    if request.method == 'GET':
        results = user.get_jobs_applied()
        return jsonify(results), 200

    if request.is_json is False:
        return jsonify(error="Not a valid JSON"), 400

#    jobs = json.loads(user.jobs_applied)
    data = request.get_json()
    if request.method != 'POST':
        job_id = data.get('id')
    if ((request.method == 'DELETE' or request.method == 'PUT') and
        (job_id not in jobs)):
        response = {'error': 'Not a valid ID'}
    else:
        # PUT: Change an existing entry
        response = {'success': True }
        message = ''
        if request.method == 'PUT':
            token = 10
            for key, value in data.items():
                if key != 'id':
                    if value == 'Rejection':
                        message = 'Rejection is hard - Have some extra coins!'
                        token += 20
                    if value == 'Received Offer':
                        message = 'Congratulations!!!!'
                        token += 50
                    jobs[job_id][key] = value
            user.currency += token

        # POST: Creates a new entry
        elif request.method == 'POST':
            user.jobs_applied.append(JobsApplied(**data))
            token = 30
            user.currency += token

        # DELETE: Deletes an entry
        elif request.method == 'DELETE':
            token = 0
            jobs.pop(job_id)

        # TODO: make sure to update how delete and put save the new data! there
        # is currently nothing right now

        user.save()
        response['token'] = token
        response['message'] = message
#        response['updated_jobs'] = jobs
        print('return value from applied', response)

    status = 200 if 'success' in response.keys() else 404
    return jsonify(response), status


@api_views.route('/jobs/interested', methods=['GET', 'POST', 'PUT', 'DELETE'])
def jobs_interested():
    """
    Used to retrieve, add, update, and delete jobs that the user is interested in
    :return:
    A user's jobs_interested for valid GET request, error, or status code for valid non GET requests
    """
    #TODO this function is not in use at the moment.
    pass

@api_views.route('/user/email/<user_id>', methods=['GET', 'PUT'])
def user_email(user_id):
    """Used to retrieve, add and update user's email
    Assumptions:
        All checks to verify if email is valid will be performed on frontend side
        User id should exist in database
    Args:
        Params: user_id should be specified in url
        Response Body:
            Put Request - Should contain new email address
    Returns:
        Email address of the user.
    """
    user = database.get('User', user_id)
    if request.method == 'PUT':
        body = request.get_json()
        print(body)
        user.email = body.get('email')
        print(user.__dict__)
        user.save()

    return jsonify(email=user.email), 200
