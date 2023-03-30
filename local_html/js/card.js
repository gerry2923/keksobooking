import { getAdvertizements } from "./data.js";

const HousingType = {
  "flat": "Квартира",
  "bungalow" : "Бунгало",
  "house": "Дом",
  "palace": "Дворец"
};
const cardsData = getAdvertizements();
console.log(cardsData);
const cardsListFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector("#card").content.querySelector('.popup');;
console.log(cardTemplate);

const fillCardTemplate = (cardTempl, card) => {
  cardTempl.querySelector('.popup__title').textContent = card.offer.title;
  cardTempl.querySelector('.popup__text--address').textContent = card.offer.address;
  cardTempl.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽ / ночь`;
  cardTempl.querySelector('.popup__type').textContent = HousingType[card.offer.type];
  cardTempl.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardTempl.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`; 
  cardTempl.querySelector('.popup__features').textContent =  card.offer.features.join(", ");
  cardTempl.querySelector('.popup__description').textContent = card.offer.description;
  
  const photos = cardTempl.querySelector('.popup__photos');
  const img = cardTempl.querySelector('.popup__photo');
  card.offer.photos.forEach(photo => {
    const pic = img.cloneNode();
    pic.src = photo;
    photos.appendChild(pic);
    
  });
  photos.firstElementChild.remove();
  cardTempl.querySelector('.popup__avatar').src = card.author.avatar;
  return cardTempl;
};

const card = cardsData[0];
const cardTempl = cardTemplate.cloneNode(true);
  fillCardTemplate(cardTempl, card);
  cardsListFragment.appendChild(cardTempl);

// cardsData.forEach( card => {
//   const cardTempl = cardTemplate.cloneNode(true);
//   fillCardTemplate(cardTempl, card);
//   cardsListFragment.appendChild(cardTempl);
// });

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cardsListFragment);