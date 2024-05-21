from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import status
from accounts.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from .serializers import UserSerializer, UserInfoSerializer

# Create your views here.
@api_view(['GET'])
def index(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
        

@api_view(['GET'])
def user_info(request, username):
    user = User.objects.get(username=username)
    serializer = UserInfoSerializer(user)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
# @authentication_classes([TokenAuthentication, BasicAuthentication])
def update(request, username):
    user = User.objects.get(username=username)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    

