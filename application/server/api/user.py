#!/usr/bin/env python3
"""
Flask route that returns json response for user
"""
from server.api import api_views
from flask import abort, jsonify, request


@api_views.route('/users/', methods=['GET', 'POST'])
def users(user_id=None):
    """
    testing things
    """
    return jsonify({})
