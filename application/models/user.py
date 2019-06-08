#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, Float, ForeignKey,\
    MetaData, Table, JSON


class UserReward(Base):
    """
    User Reward TO DO
    """
    __tablename__ = 'user_reward'
    metadata = Base.metadata
    user_id = Column(String(60),
                     ForeignKey('users.id'),
                     nullable=False,
                     primary_key=True)
    reward_id = Column(String(60),
                       ForeignKey('rewards.id'),
                       nullable=False,
                       primary_key=True)


class User(BaseModel, Base):
    """
    User class handles all application users
    """
    __tablename__ = 'users'
    user_name = Column(String(128), nullable=True)
    currency = Column(Integer, default=0)
    jobs_applied = Column(JSON, nullable=False)
    jobs_interested = Column(JSON, nullable=False)
    level_id = Column(String(60), ForeignKey('levels.id'))
    rewards = relationship('Reward', secondary='user_reward', viewonly=False)

    """ Dictionary of all keys in our JSON of jobs applied """
    applied_columns = ['date', 'company', 'url', 'title', 'address', 'status']
    sheets_columns = '"Date of Application","Company Name","URL to Job Post","Job Title (As Listed in Job Posting)","Full Address","Status","Additional Notes"\n'

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        super().__init__(*args, **kwargs)
        self.jobs_applied = {
            'name': user.username,
            'data': {'max': 0}
        }
        self.jobs_interested = {
            'name': user.username,
            'data': {'max': 0}
        }

    def get_csv(self):
        """
        returns a csv formatted version of jobs applied
        """
        if not self.jobs_applied:
            return ''
        csv_applied = self.sheets_columns
        for i in self.jobs_applied.get('data'):
            for col in self.applied_columns:
                csv_applied += i.get(col) + ','
                """ to fit csv formatting notes not included """
            csv_applied += i.get('notes') + '\n'
        return csv_applied
