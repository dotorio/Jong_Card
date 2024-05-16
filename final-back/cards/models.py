from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Card(models.Model):
    # 신용카드:1, 체크카드:2
    cardBigCategory = models.CharField(max_length=50)
    # 할인: 1, 적립: 2
    cardSmallCategory = models.CharField(max_length=50)
    # 카드 회사
    cardCompany = models.CharField(max_length=50)
    # "카드 이름"
    cardName = models.CharField(max_length=50)
    # 연회비
    # 0 = 0원
    # 1 = 1만원 이하
    # 2 = 1만원 초과, 3만원 이하
    # 3 = 3만원 초과, 5만원 이하
    # 4 = 5만원 초과
    annualFee = models.CharField(max_length=50)

    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_cards')


    
    

class Benefit(models.Model):
    # 카드
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="benefit")
    # 편의점
    convenience_store = models.CharField(max_length=50)
    # '통신요금'
    telecom = models.CharField(max_length=50)
    # '주유요금' : 
    fuel = models.CharField(max_length=50)
    # 'OTT별로'
    OTT =  models.CharField(max_length=50)
    # '카페'
    cafe =  models.CharField(max_length=50)
    # '음식점'
    food =  models.CharField(max_length=50)
    # 대중교통
    public_transport = models.CharField(max_length=50)
    # 병원
    hospital = models.CharField(max_length=50)
    # 영화
    movie =  models.CharField(max_length=50)
    # 온라인 쇼핑
    online_shopping = models.CharField(max_length=50)
    # 쇼핑
    offline_shopping = models.CharField(max_length=50)
    # 배달
    delivery = models.CharField(max_length=50)
    # 상세내역
    details = models.TextField() 


class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)