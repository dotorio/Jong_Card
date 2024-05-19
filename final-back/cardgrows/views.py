from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from accounts.models import User
from .serializers import CardGrowSerializer

@api_view(['POST'])
def create_card(request, username):
    user = User.objects.get(username=username)
    serializer = CardGrowSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(username=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Create your views here.
