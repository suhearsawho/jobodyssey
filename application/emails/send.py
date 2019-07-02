#!/usr/bin/env python3

import smtplib

from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from application.models import database
import json
from os import getenv

def user_list():
    """
    gets information of users from database
    """
    users = database.all('User')
    email_users = []
    for user in users.values():
        email_users.append(make_message(user))
    return email_users

def make_message(user):
    applied_jobs = database.userAppliedJobs(user.id)
    message = ['{} Weekly Report\n'.format(user.name)]
    message.append('Number Applied this Week: {}\n\n'.format(2))

    for job in applied_jobs:
        date = str(job.get('date_applied')).ljust(30)
        company = job.get('company').ljust(40)
        title = job.get('job_title').ljust(40)
        message.append(''.join([date, company, title, '\n']))

    return {
        'name' : user.name,
        'email' : 'jobodysseynotifications@gmail.com', #change later
        'message' : ''.join(message)
    }

def send_email(user_email, email_address, email_pwd, email_body):
    msg = MIMEMultipart()

    message = email_body

    msg['From'] = email_address
    msg['To'] = user_email #change to user email later
    msg['Subject'] = 'Your Weekly Job Odyssey Report!'

    msg.attach(MIMEText(message, 'plain'))

    with smtplib.SMTP_SSL(host='smtp.gmail.com', port=465) as s:
        s.login(email_address, email_pwd)
        s.send_message(msg)
    del msg

def main():
    email_address = getenv('JO_EMAIL')
    email_pwd = getenv('JO_EMAIL_PWD')

    total_report = []

    users = user_list()
    for user in users:
        send_email(user['email'], email_address, email_pwd, user['message'])
        total_report.append(user['message'])
    send_email('susan.su.mech@gmail.com', email_address, email_pwd, '\n\n'.join(total_report))

if __name__ == '__main__':
    main()
