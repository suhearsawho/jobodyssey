#!/usr/bin/env python3
"""
Database engine
"""

from os import getenv
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, scoped_session
from application.models.base_model import Base
from application.models import base_model, user, level, reward
from application.models.jobs_applied import JobsApplied

class Storage:
    """
    storage of class instances
    """
    CLASS_DICT = {
        'User': user.User,
        'Level': level.Level,
        'Reward': reward.Reward
    }

    __engine = None
    __session = None

    def __init__(self):
        """
        initialize the engine
        """
        self.__engine = create_engine(
            'mysql+pymysql://{}:{}@{}/{}'.format(
                getenv('JO_MYSQL_USER'),
                getenv('JO_MYSQL_PWD'),
                getenv('JO_MYSQL_HOST'),
                getenv('JO_MYSQL_DB')))

    def all(self, cls=None):
        """
        returns all objects
        """
        obj_dict = {}
        if cls is not None:
            a_query = self.__session.query(Storage.CLASS_DICT[cls])
            for obj in a_query:
                obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                obj_dict[obj_ref] = obj
        else:
            for cls in Storage.CLASS_DICT.values():
                a_query = self.__session.query(cls)
                for obj in a_query:
                    obj_ref = '{}.{}'.format(type(obj).__name__, obj.id)
                    obj_dict[obj_ref] = obj

        return obj_dict

    def new(self, obj):
        """
        add object to db
        """
        self.__session.add(obj)

    def save(self):
        """
        commits changes to db session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        deletes obj from db session if obj != None
        """
        if obj:
            self.__session.delete(obj)
            self.save()

    def reload(self):
        """
        creates tables in db and session from engine
        """
        Base.metadata.create_all(self.__engine)
        self.__session = scoped_session(
            sessionmaker(
                bind=self.__engine,
                expire_on_commit=False))

    def close(self):
        """
        calls remove() on session attribute
        """
        self.__session.remove()

    def get(self, cls, id):
        """
        gets one object based on the class and id
        """
        if cls and id:
            obj_str = '{}.{}'.format(cls, id)
            all_obj = self.all(cls)
            return all_obj.get(obj_str)
        return None

    def count(self, cls=None):
        """
        returns count of all objects
        """
        return (len(self.all(cls)))

    def duplicateUserReward(self, user_id, reward_id):
        """
        checks for a duplicate of the user reward
        """
        for duplicate in self.__session.query(user.UserReward).\
            filter(user.UserReward.user_id == user_id).\
            filter(user.UserReward.reward_id == reward_id):
            return True
        return False

    def userRewards(self, user_id):
        """
        returns a list of associated user rewards
        """
        user_rewards = []
        for rewards in self.__session.query(user.UserReward).\
            filter(user.UserReward.user_id == user_id):
            user_rewards.append(self.get('Reward', rewards.reward_id).to_json())
        return user_rewards

    def userWeeklyAvg(self, user_id):
        """
        Returns a tuple of the following format:
        (jobs applied to this week, weekly average)
        """
        pass

    def userAppliedJobs(self, user_id):
        """
        Queries database for list of jobs associated with user
        Args:
            user_id - User's id
        Return: Dictionary of results -> To maintain consistency with existing Ajax Calls
        in frontend
        """
        jobs = []
        for job in self.__session.query(JobsApplied).\
            filter(JobsApplied.user_id == user_id):
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
