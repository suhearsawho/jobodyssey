#!/usr/bin/env python3

import smtplib
import xlsxwriter
from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from application.models import database
import json
import os
from os import getenv

def user_list(main_workbook):
    """
    gets information of users from database

    Return: List of dictionaries
    """
    users = database.all('User')
    email_users = []
    for user in users.values():
        email_users.append(make_message(user, main_workbook))
    return email_users

def make_message(user, main_workbook):
    name = user.name.replace(' ' , '')
    workbook = xlsxwriter.Workbook(name + '.xlsx')

    # Create sheets for student's workbook and main_workbook (staff) 
    worksheet = workbook.add_worksheet()
    main_worksheet = main_workbook.add_worksheet(name)
    applied_jobs = user.get_jobs_applied()
#    applied_jobs = database.userAppliedJobs(user.id)
    message = ['{} Weekly Report\n'.format(user.name)]
    message.append('Number Applied this Week: {}\n\n'.format(2))

    for index, job in enumerate(applied_jobs):
        date = str(job.get('date_applied')).ljust(30)
        company = job.get('company').ljust(40)
        title = job.get('job_title').ljust(40)
        message.append(''.join([date, company, title, '\n']))
        # Add to Worksheet
        row = str(index + 3)
        worksheet.write('A' + row, job['company'])
        worksheet.write('B' + row, job['job_title'])
        worksheet.write('C' + row, job['date_applied'])
        worksheet.write('D' + row, job['status'])
        worksheet.write('E' + row, job['url'])
        worksheet.write('F' + row, job['notes'])
        worksheet.write('G' + row, job['location'])
        worksheet.write('H' + row, job['interview_progress'])

        main_worksheet.write('A' + row, job['company'])
        main_worksheet.write('B' + row, job['job_title'])
        main_worksheet.write('C' + row, job['date_applied'])
        main_worksheet.write('D' + row, job['status'])
        main_worksheet.write('E' + row, job['url'])
        main_worksheet.write('F' + row, job['notes'])
        main_worksheet.write('G' + row, job['location'])
        main_worksheet.write('H' + row, job['interview_progress'])
        
    workbook.close()
    
    return {
        'name' : user.name,
        'email' : 'jobodysseynotifications@gmail.com', #change later
        'message' : ''.join(message),
        'excel': name + '.xlsx'
    }

def send_email(user_email, email_address, email_pwd, email_body, email_excel):
    msg = MIMEMultipart()

    message = email_body

    msg['From'] = email_address
    msg['To'] = user_email #change to user email later
    msg['Subject'] = 'Your Weekly Job Odyssey Report!'

    msg.attach(MIMEText(message, 'plain'))

    part = MIMEBase('application', 'octet-stream')
    part.set_payload(open(email_excel, 'rb').read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="' + email_excel + '"')
    msg.attach(part)

    with smtplib.SMTP_SSL(host='smtp.gmail.com', port=465) as s:
        s.login(email_address, email_pwd)
        s.send_message(msg)

    del msg
    os.remove(email_excel)

def main():
    email_address = getenv('JO_EMAIL')
    email_pwd = getenv('JO_EMAIL_PWD')
    
    # Sets up the workbook for Michelle and staff at Holberton School
    # Each sheet will contain the jobs summary page for each student
    main_workbook_name = 'StudentSummaries' + '.xlsx'
    main_workbook = xlsxwriter.Workbook(main_workbook_name)

    total_report = []

    users = user_list(main_workbook)
    for user in users:
#        send_email(user['email'], email_address, email_pwd, user['message'], user['excel'])
        total_report.append(user['message'])

    main_workbook.close()
    send_email('susan.su.mech@gmail.com', email_address, 
               email_pwd, '\n\n'.join(total_report), main_workbook_name)


if __name__ == '__main__':
    main()
