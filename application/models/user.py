#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, Float, ForeignKey,\
    MetaData, Table


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
    level_id = Column(String(60), ForeignKey('levels.id'), nullable=False)
    rewards = relationship('Reward', secondary='user_reward', viewonly=False)

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        super().__init__(*args, **kwargs)
