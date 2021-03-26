from rest_framework.response import Response
from rest_framework import status

def response_code(code):
    if code == 200:
        return status.HTTP_200_OK
    elif code == 400:
        return status.HTTP_400_BAD_REQUEST

def create_response(code=None, message=None, success=None, redirect=None):
    response = { 'success': success, 'message': message }
    if redirect != None:
        response['redirect'] = redirect
    return Response(data=response, status=response_code(code))