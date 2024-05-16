from rest_framework import serializers
from .models import Card, Benefit


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = '__all__'
        read_only_fields = ('card',)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        # fields = '__all__'
        exclude = ('like_users',)

class CardDetailSerializer(serializers.ModelSerializer):
    class BenefitDetailSerializer(serializers.ModelSerializer):
        class Meta:
            model = Benefit
            # fields = '__all__'
            exclude = ('id',)
            

    benefit = BenefitDetailSerializer(read_only=True, many=True)

    class Meta:
        model = Card
        fields = '__all__'