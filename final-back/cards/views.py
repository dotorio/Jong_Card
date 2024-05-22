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
        related_user_ids.update(card.like_users.values_list('id', flat=True))
    
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
    print(weight_counter)

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
        {'삼각김밥' : [1000],
         '빵빠레' : [2000],
         '도시락' : [4000]},
        'telecom' : 
        {'KT엠모바일 알뜰' : [9900],
         'KT LTE 데이터ON' : [49000],
         'KT 5G 스페셜' : [100000]},
        'fuel' : 
        {'만원치만 넣어주세요' : [10000],
         '가득 넣어주세요' : [50000]},
        'OTT' :
        {'쿠팡플레이' : [4990],
         '티빙' : [13900],
         '넷플릭스' : [17000]},
        'cafe' : 
        {'아메리카노' : [4500],
         '에그 샌드위치' : [4900],
         '크림치즈 케이크' : [6900]},
        'food' : 
        {'라멘' : [8000],
         '부대찌개 2인' : [27000],
         '삼겹살 2인분' : [38000]},
        'public_transport' : 
        {'버스' : [1550],
         '택시 2km' : [6000]},
        'hospital' : 
        {'약값' : [4740],
         '진료비' : [6450],
         '수술비' : [300000]},
        'movie' : 
        {'일반 2D' : [15000],
         'SCREENX' : [17000],
         '4DX 3D' : [24000]},
        'online_shopping' : 
        {'티셔츠 3장' : [19900],
         '맥주 24개' : [28100],
         '햇반 36개' : [31000]},
        'offline_shopping' : 
        {'원피스' : [56050],
         '핸드백' : [79020],
         '구두' : [100280]},
        'delivery' : 
        {'불고기버거 세트' : [5200],
         '블루베리치즈설빙' : [13900],
         '페퍼로니 피자 라지' : [25900]}
    }
    
    for benefit in change_money:
        for item in change_money[benefit]:
            now = card_data['benefit'][0][benefit]
            if category == '할인':
                if now.endswith('%'):
                    change_money[benefit][item].append(change_money[benefit][item][0] * (1-float(now[:-1])/100))
                elif now.endswith('원/L'):
                    change_money[benefit][item].append(change_money[benefit][item][0] - float(now[:-3])*(change_money[benefit][item][0]//1670))               
                elif float(now) and now.isdigit():
                    change_money[benefit][item].append(max(0, change_money[benefit][item][0] - float(now)))
                
            elif category == '적립':
                if now.endswith('%'):
                    change_money[benefit][item].append(change_money[benefit][item][0] * float(now[:-1])/100)
                elif now.endswith('원/L'):
                    change_money[benefit][item].append(float(now[:-3])*(change_money[benefit][item][0]//1670))
                elif float(now) and now.isdigit():
                    change_money[benefit][item].append(float(now))

    if category == '할인':
        change_money['category'] = 1
    else:
        change_money['category'] = 2

    change_money['site'] = card_data['site']
    change_money['cardName'] = card_data['cardName']

    detail_list = list(card_data['benefit'][0]['details'].split('\r\n'))
    change_money['detail'] = dict()
    for i in detail_list:
        key, value = i.split(' : ')
        change_money['detail'][key] = value
                
    return change_money

@api_view(['GET'])
def card_detail(request, card_id): 
    card = get_object_or_404(Card, id=card_id)
    card_detail_dict = detail_calculate(CardFullSerializer(card).data)
    return Response(card_detail_dict)