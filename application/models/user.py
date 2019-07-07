#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from application import models
from application.models.jobs_applied import JobsApplied
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
    name = Column(String(128), nullable=False)
    email = Column(String(254), nullable=True)
    currency = Column(Integer, default=0)
    jobs_applied = relationship("JobsApplied")
    jobs_interested = Column(JSON, nullable=False)
    level_id = Column(String(60), ForeignKey('levels.id'))
    rewards = relationship('Reward', secondary='user_reward', viewonly=False)

    """ Dictionary of all keys in our JSON of jobs applied """
    applied_columns = ['date_applied', 'company', 'url', 'job_title', 'role', 'address', 'status', 'interview']
    sheets_columns = '"Date of Application","Company Name","URL to Job Post","Job Title (As Listed in Job Posting)",\
        "Role","Full Address","Status","Interviews Received","Additional Notes"\n'

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        if 'name' not in kwargs or not kwargs['name']:
            print('successfully entered')
            kwargs['name'] = kwargs['user_name']
        super().__init__(*args, **kwargs)
        self.jobs_interested = json.dumps({})

    def get_csv(self):
        """
        returns a csv formatted version of jobs applied
        """
        if not self.jobs_applied:
            return ''
        csv_applied = str(self.sheets_columns) + '\n'
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

    def get_average_app(self):
        """
        Returns a number corresponding to the average number of applications
        per week
        """
        pass

    def get_jobs_applied(self, **kwargs):
        """Queries database for jobs_applied table for entries associated with user
        Args:
        Returns:
            List of dictionary results
        """
        jobs = []
        query_results = models.database.get_associated('JobsApplied', 'user_id', self.id)
        for job in query_results:
            jobs.append({'id': job.id,
                         'company': job.company,
                         'job_title': job.job_title,
                         'date_applied': job.date_applied,
                         'status': job.status,
                         'url': job.url,
                         'location': job.location,
                         'interview_progress': job.interview_progress,
                         'notes': job.notes,
                         })
        return jobs

    def get_user_rewards(self, **kwargs):
        """Queries database for user rewards table for entries associated with user
        Args:
        Returns:
            List of dictionary results
        """
        user_rewards = []
        query_results = models.database.get_associated('UserReward', 'user_id', self.id)
        for reward in query_results:
            user_rewards.append(models.database.get('Reward', reward.reward_id).to_json())
        return user_rewards

    def check_duplicate_reward(self, reward_id):
        """Queries database for user rewards table for entries that match user and reward id
        Args:
            reward_id the id of the reward being checked
        Returns:
            Boolean indicating presence of reward
        """
        user_rewards = self.get_user_rewards()
        for reward in user_rewards:
            if reward.get('id') == reward_id:
                return True
        return False
