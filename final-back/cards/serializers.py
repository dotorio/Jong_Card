from .models import Card, Benefit
from rest_framework import serializers

# Create your views here.
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class CardFullSerializer(serializers.ModelSerializer):
    class BenefitSerializer(serializers.ModelSerializer):
        class Meta:
            model = Benefit
            exclude = ('id',)

    benefit = BenefitSerializer(read_only=True, many=True)
    class Meta:
        model = Card
        fields = '__all__'

