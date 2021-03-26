from django.core.mail import send_mail, BadHeaderError
from .response import create_response
from django.conf import settings

def sendmail(obj):
    subject = 'Recupero Password'
    message = f"<h1>Ciao!</h1><p>Clicca <a href='http://localhost:4200/recover?id={ obj['id'] }'>qui</a> per recuperare la tua password"
    to_email = [obj['email']]
    from_email = settings.EMAIL_HOST_USER
    if to_email:
        try:
            send_mail(subject, '', from_email, to_email, html_message=message)
        except BadHeaderError:
            return BadHeaderError
        return create_response(200, 'Email have been sent', True)
    else:
        return create_response(400, 'Error: Bad Request', False)