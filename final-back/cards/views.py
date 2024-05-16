from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import CardFullSerializer

from .models import Card


@api_view(['GET'])
def update_card_list(request):
    if request.method == 'GET':
        cards = Card.objects.all()
        serializer = CardFullSerializer(cards, many=True)

        return Response(serializer.data)