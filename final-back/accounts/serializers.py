from rest_framework import serializers
from .models import User
from cards.models import Card
from cardgrows.models import CardGrow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class UserInfoSerializer(serializers.ModelSerializer):
    class CardSerializer(serializers.ModelSerializer):
        class Meta:
            model = Card
            fields = ('cardName',)
    class CardGrowSerializer(serializers.ModelSerializer):
        class Meta:
            model = CardGrow
            exclude = ('id',)

    like_cards = CardSerializer(read_only=True, many=True)
    card_grow = CardGrowSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'like_cards', 'card_grow')