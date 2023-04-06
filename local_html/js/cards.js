const HousingType = {
  "flat": "Квартира",
  "bungalow" : "Бунгало",
  "house": "Дом",
  "palace": "Дворец"
};

const cardTemplate = document.querySelector("#card").content.querySelector('.popup');;

// const fillCardTemplate = (cardTempl, card) => {
//   cardTempl.querySelector('.popup__title').textContent = card.offer.title;
//   cardTempl.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardTempl.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽ / ночь`;
//   cardTempl.querySelector('.popup__type').textContent = HousingType[card.offer.type];
//   cardTempl.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
//   cardTempl.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`; 
//   cardTempl.querySelector('.popup__features').textContent =  card.offer.features.join(", ");
//   cardTempl.querySelector('.popup__description').textContent = card.offer.description;
  
//   const photos = cardTempl.querySelector('.popup__photos');

//   const img = cardTempl.querySelector('.popup__photo');
//   card.offer.photos.forEach(photo => {

//     const pic = img.cloneNode();
//     pic.src = photo;
//     photos.appendChild(pic);
    
//   });
//   photos.firstElementChild.remove();
//   cardTempl.querySelector('.popup__avatar').src = (card.author.avatar.length !== 0) ? card.author.avatar : "" ;

//   return cardTempl;
// };

const setPropertyValue = (elem, propValue) => {
  if((typeof propValue) === "string" && !elem.classList.contains("popup__avatar")) {
    if(propValue){
      elem.textContent = propValue;
    } else {
      elem.style.display = "none";
    }
  } else {
    if (propValue.length === 0) {
      if(elem.classList.contains("popup__avatar")) {
        elem.setAttribute("src", "");
      } 
      elem.style.display = "none";
    } else {
      if(elem.classList.contains("popup__avatar")){
        elem.setAttribute("src", propValue);
      } else {
        const img  = elem.children[0];
        propValue.forEach( photo => {
          const pic = img.cloneNode();
          pic.setAttribute("src", photo);
          elem.appendChild(pic);
        });
        elem.firstElementChild.remove();
      }
    }
  }
};

const fillCardTemplate = (cardTempl, card) => {

  setPropertyValue(cardTempl.querySelector('.popup__title'), card.offer.title);
  setPropertyValue(cardTempl.querySelector('.popup__text--address'), card.offer.address);
  setPropertyValue(cardTempl.querySelector('.popup__text--price'), `${card.offer.price} ₽ / ночь`);
  setPropertyValue(cardTempl.querySelector('.popup__type'), HousingType[card.offer.type]);
  setPropertyValue(cardTempl.querySelector('.popup__text--capacity'), `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  setPropertyValue(cardTempl.querySelector('.popup__text--time'), `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`); 
  setPropertyValue(cardTempl.querySelector('.popup__features'),  card.offer.features.join(", "));
  setPropertyValue(cardTempl.querySelector('.popup__description'), card.offer.description);
  setPropertyValue(cardTempl.querySelector('.popup__photos'), card.offer.photos);
  setPropertyValue(cardTempl.querySelector('.popup__avatar'), card.author.avatar);

  return cardTempl;
};

const createCard  = (dataObj) => {
  const cardTempl = cardTemplate.cloneNode(true);
  return fillCardTemplate(cardTempl, dataObj);
}

export {createCard};
