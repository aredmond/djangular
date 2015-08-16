from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, viewsets

from app1.models import Tweet
from app1.permissions import IsAuthorOrReadOnly
from app1.serializers import TweetSerializer, UserSerializer


@csrf_protect
@ensure_csrf_cookie
def index(request):
    user = authenticate(username='bob', password='bob')
    if user is not None:
        login(request, user)
        return render(request, 'app1/index.html')


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsAuthorOrReadOnly,)

    def pre_save(self, obj):
        obj.user = self.request.user


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
