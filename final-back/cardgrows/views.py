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
from .models import CardGrow


@api_view(['GET'])
def get_card_grow(request, username):
    card_grow = CardGrow.objects.filter(username=username)
    serializer = CardGrowSerializer(card_grow, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_card(request, username):
    user = User.objects.get(username=username)
    serializer = CardGrowSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(username=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def save_card(request, username):
    cardgrow = CardGrow.objects.get(username=username)
    print('아아아아아', cardgrow)
    serializer = CardGrowSerializer(cardgrow, data=request.data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
# Create your views here.
