#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float


class Reward(BaseModel, Base):
    """
    Reward class handles all application users
    """
    __tablename__ = 'rewards'
    name = Column(String(128), nullable=True)
    image = Column(String(128), nullable=False)
    rarity = Column(String(128), nullable=False)
    user_rewards = relationship('UserReward', backref='rewards', cascade='delete')  # might have to adjust this based on our system and whether this relationship is true

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        super().__init__(*args, **kwargs)
