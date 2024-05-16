from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_card, name='create_card'),
    path('<int:card_id>/create_benefit/', views.create_benefit),
    path('write_card/', views.index, name='index'),
    path('<int:card_id>/write_benefit/', views.benefit, name='benefit'),
]

 
# 1. http://127.0.0.1:8000/card/write_card/ 에 접속하여 Card 정보를 입력한다 -> Create Card창이 뜬다 (무시)
# 2. http://127.0.0.1:8000/card/<card_id>/write_benefit/ 에서 card_id를 1번에서 생성된 카드의 id를 입력해준 뒤 접속한다.
# 3. benefit을 입력한다. -> 저장 완료


# 4. 종료하기 전 bash창에  
#$ python manage.py dumpdata --indent 4 cards.card > cards.json
#$ python manage.py dumpdata --indent 4 cards.benefit > benefits.json

 