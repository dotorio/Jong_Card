from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .serializers import CardSerializer, BenefitSerializer, CardDetailSerializer
from .models import Card, Benefit
from .forms import CardForm, BenefitForm


def index(request):
    if request.method == "POST":
        form = CardForm(request.POST)
        if form.is_valid():
            card = form.save()
            return redirect('benefit', card.id)
        pass
    else:
        form = CardForm()

    context = {
        'form': form
    }

    return render(request, 'index.html', context)


def benefit(request, card_id):
    card = Card.objects.get(id=card_id)
    if request.method == "POST":
        form = BenefitForm(request.POST)
        if form.is_valid():
            benefit = form.save()
            return redirect('index')
        pass
    else:
        form = BenefitForm()

    context = {
        'form': form,
        'card_id': card_id
    }

    return render(request, 'benefit.html', context)

# Create your views here.
@api_view(['GET','POST'])
def create_card(request):
    if request.method == 'POST':
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        cards = Card.objects.all()
        serializer = CardDetailSerializer(cards, many=True)
        return Response(serializer.data)




@api_view(['POST'])
def create_benefit(request, card_id):
    card = Card.objects.get(id=card_id)
    serializer = BenefitSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(card=card)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)