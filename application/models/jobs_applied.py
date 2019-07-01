#!/usr/bin/python3
"""
JobsApplied Class from Models Module
"""
import hashlib
import os
from application.models.base_model import BaseModel, Base
import application.models
from sqlalchemy.orm import relationship, backref
from sqlalchemy import (
    Column, Integer, String, Float, ForeignKey,
    MetaData, Table, JSON, DateTime)
import json


class JobsApplied(BaseModel, Base):
    """
    The JobsApplied table has a many to one relationship with User Table.

    Mandatory Fields that the user must submit include:
        * Company
        * Job_Title
    
    The following attributes have special characteristics that must
    be followed:

    status -> Values must be one of the following:
    ['Applied', 'Interviewing', 'Offer Stage', 'Archived']

    interview_progress -> Values must be one of the following:
    ['Recruiter Call', 'Onsite', 'Tech Screen', 'Awaiting Decision', 'Phone Interview']
    """
    __tablename__ = 'jobs_applied'
    user_id = Column(String(60), ForeignKey('users.id'))
    company = Column(String(128), nullable=False)
    job_title = Column(String(128), nullable=False)
    date_applied = Column(DateTime())
    status = Column(String(32), nullable=True)
    url = Column(String(2048), nullable=True)
    location = Column(String(128), nullable=True)
    interview_progress = Column(String(60), nullable=True)
    notes = Column(String(2048), nullable=True)
