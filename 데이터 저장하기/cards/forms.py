from django import forms
from .models import Card, Benefit

class CardForm(forms.ModelForm):
    class Meta:
        model = Card
        # fields = '__all__'
        exclude = ('like_users',)

class BenefitForm(forms.ModelForm):
    class Meta:
        model = Benefit
        fields = '__all__'