#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from application import models
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, Float, ForeignKey,\
    MetaData, Table, JSON
import json

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

    def __init__(self, *args, **kwargs):
        """
        initialize new UserReward Class
        """
        if kwargs:
            self.__set_attributes(kwargs)
        else:
            print('Need Kwargs')

    def __set_attributes(self, attr_dict):
        """
        private: converts attr_dict values to python class attributes
        """
        for attr, val in attr_dict.items():
            setattr(self, attr, val)

    def save(self):
        """
        Saves our userreward instance
        """
        models.database.new(self)
        models.database.save()
    
    def to_json(self):
        return {'user_id': self.user_id, 'reward_id': self.reward_id}

    def delete(self):
        """
        deletes instance from storage
        """
        models.database.delete(self)


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
    applied_columns = ['date_applied', 'company', 'url', 'job_title', 'role' , 'address', 'status', 'interview']
    sheets_columns = '"Date of Application","Company Name","URL to Job Post","Job Title (As Listed in Job Posting)","Role","Full Address","Status","Interviews Recieved","Additional Notes"\n'

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        super().__init__(*args, **kwargs)
        self.jobs_applied = json.dumps({})
        self.jobs_interested = json.dumps({})

    def get_csv(self):
        """
        returns a csv formatted version of jobs applied
        """
        if not self.jobs_applied:
            return ''
        csv_applied = str(self.sheets_columns)
        applied = json.loads(self.jobs_applied)
        for i in applied.values():
            for col in self.applied_columns:
                if col == 'interview':
                    csv_applied += '|'.join(i.get(col)) + ','
                else:
                    csv_applied += str(i.get(col)) + ','
                """ to fit csv formatting notes not included """
            csv_applied += i.get('notes') + '\n'
        return csv_applied
