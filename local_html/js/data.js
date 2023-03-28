import {getRandFloat, getRandInt, getRandFloatFormated, getRandIntFromArray, getRandIntFormated} from './util.js';

const ADV_COUNT = 10;
const MAX_GUESTS = 5;
const MAX_ROOMS = 8;
const MAX_PRICE = 80000;
const MIN_PRICE = 1500;
const ADVERTIZEMENTS = [];
const TYPE = ["palace","flat","house","bungalow"];
const CHECKIN_OUT = ["12:00","13:00","14:00"];
const FEATURES = ["wifi","dishwasher","parking", "washer", "elevator", "conditioner"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
                "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
                "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const TITLES = ["Отель Гельвеция",
                "Кино Хостел на Выборгской",
                "Bronza",
                "Brick Design Отель",
                "Александр Хаус",
                "1912 квартир",
                "Отель Graden Streen",
                "Галунов Отель",
                "Rixos Красная Поляна",
                "Центр Отель"];

const DESCRIPTIONS = ["Самый дизайнерский и уютный хостел, который вы видели. Тематика Кино раскрывается в оформлении номеров, посвященных различным фильмам.",
                      "Современные номера отеля «Гельвеция» оснащены телевизором с плоским экраном, мини-баром и обставлены удобной мебелью. Находясь в самом центре города, Вы можете насладиться тишиной и европейским уютом во внутреннем дворике отеля. ",
                      "Уютный Гест Хаус в центре Санкт-Петербурга. Слева Медный всадник, справа Зимний дворец и Дворцовая площадь. Напротив, через Неву находится Кунтскамера, Зоологический Музей, Ростральные колонны. Из окон номеров открывается вид на Адмиралтейство",
                      "Отель предлагает круглосуточную стойку регистрации, услуги консьержа и обслуживание в номер. Кроме того, к услугам гостей",
                      "В шаговой доступности находятся Никольский и Троицкий соборы, Мариинский театр, новый Концертный зал Мариинского театра, Консерватория им. Н.А. Римского-Корсакова; в пятнадцати минутах езды — центр города и Невский проспект.",
                      "Идеально подойдет для всех типов путешественников: туристы, пары, небольшие семьи, бизнес-туристы. Мы находимся рядом с основными достопримечательностями: крейсер Аврора, Петропавловская крепость, домик Петра Первого, Летний сад. Вокруг есть вся инфраструктура",
                      "Мы приглашаем вас в семейный эко-отель, который пропитан домашней теплотой и уютом. Отель расположен в историческом центре Санкт-Петербурга, буквально в нескольких шагах от Михайловского театра, Русского музея и Инженерного замка. Отель спрятан от городского шума и суеты мегаполиса. Гостиничные интерьеры перекликаются с архитектурой города и изысканно подчеркивают ее",
                      " В числе стандартных удобств номеров — телевизор с плоским экраном и собственная ванная комната. Предоставляются тапочки, бесплатные туалетно-косметические принадлежности и фен. Стойка регистрации работает круглосуточно.",
                      "находится на высоте 960 метров над уровнем моря в окружении Кавказских гор в самом сердце знаменитого курорта. Отель предлагает 114 элегантных номеров с непревзойденным видом на горы для настоящих ценителей роскоши и комфорта. На территории отеля расположена панорамная терраса для загара с белоснежным песочным пляжем. Летний отдых на море и в горах одновременно - уникальный сервис, который доступен для всех гостей, благодаря ежедневному бесплатному трансферу на пляж курорта на Черном море в Имеретинской низменности. ",
                      "Звукоизолированные номера оборудованы телевизором с плоским экраном, а в некоторых имеется уютная гостиная зона, мини-бар. В собственной ванной комнате с подогреваемым полом предоставляются халаты, тапочки и бесплатные туалетно-косметические принадлежности. "];



const getAuthor = () => {
  return {avatar: `'img/avatars/user${getRandIntFormated(1, 10, 2, 0)}.png'` };
};

const getLocation = () => {
  return {
        x: getRandFloatFormated(35.65000, 37.70000, 5),
        y: getRandFloatFormated(139.7000, 139.80000, 5)
      };
};

const getOffer = () => {
  return {
        title: TITLES[getRandIntFromArray(TITLES)],
        price: getRandInt(MIN_PRICE, MAX_PRICE),
        type: TYPE[getRandIntFromArray(TYPE)],
        rooms: getRandInt(1, MAX_ROOMS),
        guests: getRandInt(1, MAX_GUESTS),
        checkin: CHECKIN_OUT[getRandIntFromArray(CHECKIN_OUT)],
        checkout: CHECKIN_OUT[getRandIntFromArray(CHECKIN_OUT)],
        features: FEATURES.slice(getRandIntFromArray(FEATURES)),
        description: DESCRIPTIONS[getRandIntFromArray(DESCRIPTIONS)],
        photos: PHOTOS[getRandIntFromArray(PHOTOS)]
    };
};

const createObject = () => {
  return {
    author: getAuthor(),
    location: getLocation(),
    offer: getOffer()
    };
};

const getAdvertizements = () => {
  for(let i = 0; i < ADV_COUNT; i++) {
    const obj = createObject();
    obj.offer.address = `${obj.location.x}, ${obj.location.y}`;
    ADVERTIZEMENTS.push(obj);
  }
  return ADVERTIZEMENTS;
};



export {getAdvertizements};