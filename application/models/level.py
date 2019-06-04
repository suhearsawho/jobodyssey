#!/usr/bin/python3
"""
Level Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float


class Level(BaseModel, Base):
    """
    Level class handles all application users
    """
    __tablename__ = 'levels'
    name = Column(String(128), nullable=True)
    users = relationship('User', backref='level')

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        super().__init__(*args, **kwargs)
