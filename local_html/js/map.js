console.log("in map js");

const setInactiveState = (className, childClassName) => {
  const form  = document.querySelector("."+className);
  form.classList.add(className + "--disabled");
  const fsl = form.querySelectorAll(childClassName);

  for( const fs of fsl) {
    fs.setAttribute("disabled", "");
  }
};

const setActiveState = (className, childClassName) => {
  const form  = document.querySelector("."+className);
  form.classList.remove(className + "--disabled");
  const fsl = form.querySelectorAll(childClassName);

  for( const fs of fsl) {
    fs.removeAttribute("disabled");
  }
};

const loadMap = () => {
  
};

setInactiveState("ad-form", ".ad-form__element");
setInactiveState("map__filters", ".map__filter");
console.log("dkdkdk");

const mapp = document.querySelector('#map');
console.log(mapp);
// L.map('map').setView({
//     lat: 59.92746,
//     lng: 30.31127
//   }, 10);

//   L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//   ).addTo(map);

