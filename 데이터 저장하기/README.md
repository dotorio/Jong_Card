### 데이터 저장하기
1. http://127.0.0.1:8000/card/write_card/ 에 접속하여 Card 정보를 입력한다 -> Create Card창이 뜬다 (무시)
2. http://127.0.0.1:8000/card/<card_id>/write_benefit/ 에서 card_id를 1번에서 생성된 카드의 id를 입력해준 뒤 접속한다.
3. benefit을 입력한다. -> 저장 완료
4. 종료하기 전 bash창에 입력 -> 데이터 저장 
``` 
python manage.py dumpdata --indent 4 cards.card > cards.json
python manage.py dumpdata --indent 4 cards.benefit > benefits.json
```

### 데이터 구조
#### `Card`
| 필드명 | 내용 | 데이터 타입 |
| :---: | :---: | :---: | 
| cardBigCategory | 신용카드/체크카드 | CharField |
| cardSmallCategory | 할인/적립 | CharField |
| cardCompany | 카드 회사 | CharField |
| cardName | 카드 이름 | CharField |
| annualFee | 연회비 | CharField |

#### `Benefit`

| 필드명 | 내용 | 데이터 타입 |
| :---: | :---: | :---: | 
| card | 카드 | ForeignKey |
| convenience_store | 편의점 | CharField |
| telecom | 통신요금 | CharField |
| fuel | 주유요금 | CharField |
| OTT | OTT | CharField |
| cafe | 카페 | CharField |
| food | 음식점 | CharField |
| public_transport | 대중교통 | CharField |
| hospital | 병원 | CharField |
| movie | 영화 | CharField |
| online_shopping | 온라인 쇼핑 | CharField |
| offline_shopping | 쇼핑 | CharField |
| delivery | 배달 | CharField |
| details | 상세내역 | CharField |