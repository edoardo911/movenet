from rest_framework.decorators import api_view
from .email import sendmail

@api_view(["POST"])
def post_sendmail(request):
    if request.method == "POST":
        return sendmail(request.data)