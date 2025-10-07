import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Register students for courses
    Args: event with httpMethod, body, headers; context with request_id
    Returns: HTTP response with enrollment confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    course_id = body_data.get('course_id')
    course_title = body_data.get('course_title')
    student_name = body_data.get('name')
    student_email = body_data.get('email')
    student_phone = body_data.get('phone')
    
    if not all([course_id, course_title, student_name, student_email, student_phone]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO enrollments (course_id, course_title, student_name, student_email, student_phone) VALUES (%s, %s, %s, %s, %s) RETURNING id, enrolled_at",
        (course_id, course_title, student_name, student_email, student_phone)
    )
    
    result = cur.fetchone()
    enrollment_id = result[0]
    enrolled_at = result[1].isoformat()
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'enrollment_id': enrollment_id,
            'enrolled_at': enrolled_at,
            'message': 'Вы успешно записаны на курс!'
        }),
        'isBase64Encoded': False
    }
