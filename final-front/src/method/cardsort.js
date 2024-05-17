export const cardsort = function(cardList) {
  const convenience_store = []
  const telecom = []
  const OTT = []
  const fuel = []
  const cafe = []
  const food = []
  const public_transport = []
  const hospital = []
  const movie = []
  const online_shopping = []
  const offline_shopping = []
  const delivery = []

  // console.log(cardList.value)
  cardList.value.forEach(element => {

    if (element.benefit[0].convenience_store === '0') {
      convenience_store.push(false)
    } else {
      convenience_store.push(true)
    }
    if (element.benefit[0].telecom === '0') {
      telecom.push(false)
    } else {
      telecom.push(true)
    }
    if (element.benefit[0].OTT === '0') {
      OTT.push(false)
    } else {
      OTT.push(true)
    }
    if (element.benefit[0].fuel === '0') {
      fuel.push(false)
    } else {
      fuel.push(true)
    }
    if (element.benefit[0].cafe === '0') {
      cafe.push(false)
    } else {
      cafe.push(true)
    }
    if (element.benefit[0].food === '0') {
      food.push(false)
    } else {
      food.push(true)
    }
    if (element.benefit[0].public_transport === '0') {
      public_transport.push(false)
    } else {
      public_transport.push(true)
    }
    if (element.benefit[0].hospital === '0') {
      hospital.push(false)
    } else {
      hospital.push(true)
    }
    if (element.benefit[0].movie === '0') {
      movie.push(false)
    } else {
      movie.push(true)
    }
    if (element.benefit[0].online_shopping === '0') {
      online_shopping.push(false)
    } else {
      online_shopping.push(true)
    }
    if (element.benefit[0].offline_shopping === '0') {
      offline_shopping.push(false)
    } else {
      offline_shopping.push(true)
    }
    if (element.benefit[0].delivery === '0') {
      delivery.push(false)
    } else {
      delivery.push(true)
    }
    
  })
  const benefitList = {
    convenience_store, telecom, OTT, fuel, cafe, food, public_transport, hospital, movie, online_shopping, offline_shopping, delivery
  }

  return benefitList
}