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
from application.models.user import UserReward

class Storage:
    """
    storage of class instances
    """
    CLASS_DICT = {
        'User': user.User,
        'Level': level.Level,
        'Reward': reward.Reward,
        'JobsApplied': JobsApplied,
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

    def get_associated(self, primary_cls, foreign_key, foreign_id):
        """Queries the database for cls that are associated with the foreign key.
        Args:
            primary_cls: string with name of table to query
            foreign_key: string of the foreign_key name
            foreign_id: id (string) of the foreign key to find in the primary table.
        Return: List of dictionaries containing matches. Each dictionary represents
        a matched object in the database.
        """
        results = []
        query_filter = "{}.{} == '{}'".format(primary_cls, foreign_key, foreign_id)
        for result in self.__session.query(eval(primary_cls)).\
            filter(eval(query_filter)):
            results.append(result)
        return results

    def count(self, cls=None):
        """
        returns count of all objects
        """
        return (len(self.all(cls)))
