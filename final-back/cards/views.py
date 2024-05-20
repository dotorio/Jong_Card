from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import CardFullSerializer, CardSerializer
from collections import Counter
from django.db.models import Count
from .models import Card, Benefit
from accounts.models import User

cards = Card.objects.all()

@api_view(['GET'])
def update_card_list(request, username):

    recommend_card_list = get_recommend_cards(username)
    
    return Response(recommend_card_list)
    
@api_view(['GET','POST'])
def likes_card_toggle(request, username, card_id):
    user = get_object_or_404(User, username=username)
    # 좋아요 취소 또는 추가
    if request.method == 'POST':
        card = get_object_or_404(Card, id=card_id)
        if card.like_users.filter(id=user.id).exists():
            card.like_users.remove(user)
            action = "unliked"
        else:
            card.like_users.add(user)
            action = "liked"
        card.save()
    
    return Response({"card": CardSerializer(user.like_cards.all(), many=True).data}, status=status.HTTP_200_OK)

def get_recommend_cards(username):
    recommend_card_list = []

    if username == 'null':
        for card in cards:
            recommend_card_list.append(CardFullSerializer(card).data)
        return recommend_card_list
    
    user = User.objects.get(username=username)
    print(user)
    # 1. 그 유저가 좋아요한 카드 가져오기
    liked_cards = user.like_cards.all()

    # 2. 그 카드를 좋아요 누른 유저들 조사
    related_user_ids = set()
    for card in liked_cards:
        related_user_ids.update(card.like_users.exclude(id=user.id).values_list('id', flat=True))
    
    if not liked_cards or not related_user_ids:
        # 유저가 좋아요한 카드가 없을 경우, 좋아요가 많은 카드 순으로 추천
        popular_cards = Card.objects.annotate(like_count=Count('like_users')).order_by('-like_count')
        

        for card in popular_cards:
            recommend_card_list.append(CardFullSerializer(card).data)
        return recommend_card_list

    

    # 3. 조사한 유저들이 좋아요 누른 카드 가져오기 및 가중치 계산
    weight_counter = Counter()
    for related_user_id in related_user_ids:
        user_liked_cards = Card.objects.filter(like_users__id=related_user_id)
        for card in user_liked_cards:
            weight_counter[card.id] += 1

    # 4. 가중치가 높은 순서대로 카드 추천
    recommended_cards = [Card.objects.get(id=card_id) for card_id, _ in weight_counter.most_common()]

    for card in recommended_cards:
        recommend_card_list.append(CardFullSerializer(card).data)

    all_cards = Card.objects.exclude(id__in=[card.id for card in recommended_cards])
    for card in all_cards:
        recommend_card_list.append(CardFullSerializer(card).data)

    return recommend_card_list

def detail_calculate(card_data):
    category = card_data['cardSmallCategory']
    change_money = {
        'convenience_store' : 
        {'라면' : 1000,
         '우유' : 3000,
         '달걀' : 5000},
        'telecom' : 
        {'알뜰 요금제' : 10000,
         '적당 요금제' : 30000,
         '무제한 요금제' : 50000},
        'fuel' : 
        {'만원치만 넣어주세요' : 10000,
         '가득 넣어주세요' : 50000},
        'OTT' : 
        {'넷플릭스' : 17000,
         '티빙' : 13900,
         '쿠팡플레이' : 4990},
        'cafe' : 
        {'아메리카노' : 4500,
         '바닐라 빈 라떼' : 7000,
         '초콜릿 케이크' : 6500},
        'food' : 
        {'짜장면' : 7000,
         '한정식' : 20000,
         '오마카세' : 50000},
        'public_transport' : 
        {'버스' : 1550,
         '택시' : 5000},
        'hospital' : 
        {'진료비' : 5000,
         '약값' : 10000,
         '수술비' : 100000},
        'movie' : 
        {'일반 2D' : 15000,
         'SCREENX' : 17000,
         '4DX 3D' : 24000},
        'online_shopping' : 
        {'즉석밥 30개' : 26350,
         '콜라 30개' : 15810,
         '화장품 세트' : 35760},
        'offline_shopping' : 
        {'크록스' : 40295,
         '원피스' : 57690,
         '훼이셜크림' : 79050},
        'delivery' : 
        {'치킨' : 21900,
         '족발' : 50000,
         '짬뽕' : 11000}
    }
    
    change_dict = {
        'convenience_store' : 
        {'라면' : 0,
         '우유' : 0,
         '달걀' : 0},
        'telecom' : 
        {'알뜰 요금제' : 0,
         '적당 요금제' : 0,
         '무제한 요금제' : 0},
        'fuel' : 
        {'만원치만 넣어주세요' : 0,
         '가득 넣어주세요' : 0},
        'OTT' : 
        {'넷플릭스' : 0,
         '티빙' : 0,
         '쿠팡플레이' : 0},
        'cafe' : 
        {'아메리카노' : 0,
         '바닐라 빈 라떼' : 0,
         '초콜릿 케이크' : 0},
        'food' : 
        {'짜장면' : 0,
         '한정식' : 0,
         '오마카세' : 0},
        'public_transport' : 
        {'버스' : 0,
         '택시' : 0},
        'hospital' : 
        {'진료비' : 0,
         '약값' : 0,
         '수술비' : 0},
        'movie' : 
        {'일반 2D' : 0,
         'SCREENX' : 0,
         '4DX 3D' : 0},
        'online_shopping' : 
        {'즉석밥 30개' : 0,
         '콜라 30개' : 0,
         '화장품 세트' : 0},
        'offline_shopping' : 
        {'크록스' : 0,
         '원피스' : 0,
         '훼이셜크림' : 0},
        'delivery' : 
        {'치킨' : 0,
         '족발' : 0,
         '짬뽕' : 0}
    }
    for benefit in change_dict:
        for item in change_dict[benefit]:
            now = card_data['benefit'][0][benefit]
            if category == '할인':

                if now.endswith('%'):
                    change_dict[benefit][item] = change_money[benefit][item] * (1-int(now[:-1])/100)
                elif now.endswith('원/L'):
                    change_dict[benefit][item] = change_money[benefit][item] - int(now[:-3])*(change_money[benefit][item]//1670)                
                elif int(now) and now.isdigit():
                    change_dict[benefit][item] = max(0, change_money[benefit][item] - now(benefit))
                
            elif category == '적립':
                if now.endswith('%'):
                    change_dict[benefit][item] = change_money[benefit][item] * int(now[:-1])/100
                elif now.endswith('원/L'):
                    change_dict[benefit][item] = int(now[:-3])*(change_money[benefit][item]//1670)
                elif int(now) and now.isdigit():
                    change_dict[benefit][item] = now
    if category == '할인':
        change_dict['할인유형'] = 1
    else:
        change_dict['할인유형'] = 2
    change_dict['상세'] = list(card_data['benefit'][0]['details'].split('\r\n'))
                
    return change_dict

@api_view(['GET'])
def card_detail(request, card_id): 
    card = get_object_or_404(Card, id=card_id)
    card_detail_dict = detail_calculate(CardFullSerializer(card).data)
    return Response(card_detail_dict)