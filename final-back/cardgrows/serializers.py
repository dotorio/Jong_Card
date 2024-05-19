from .models import CardGrow

from rest_framework import serializers

class CardGrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardGrow
        fields = '__all__'
        read_only_fields = ('username',)


