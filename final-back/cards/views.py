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
from .models import Card
from accounts.models import User

cards = Card.objects.all()

@api_view(['GET'])
def update_card_list(request, username):

    recommend_card_list = get_recommend_cards(username)
    
    return Response(recommend_card_list)
    
@api_view(['POST'])
def likes_card_toggle(request, username, card_id):
    user = get_object_or_404(User, username=username)
    print(user)
    card = get_object_or_404(Card, id=card_id)

    # 좋아요 취소 또는 추가
    if card.like_users.filter(id=user.id).exists():
        card.like_users.remove(user)
        action = "unliked"
    else:
        card.like_users.add(user)
        action = "liked"
    
    card.save()

    return Response({"action": action, "card": CardSerializer(card).data}, status=status.HTTP_200_OK)

def get_recommend_cards(username):
    recommend_card_list = []
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