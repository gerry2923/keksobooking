import { showError } from "./error.js";

// Получить данные с сервера

const Urls = {
  "GET": 'https://23.javascript.pages.academy/keksobooking/data',
  "POST": 'https://23.javascript.pages.academy/keksobooking'
}

const createFetch = (onSuccess,onError, method) => () => {
  try {
    return fetch(
        Urls[method],
        {
          method: method,
          credentials: "same-origin",
          //body: data //new FormData(evt.target)
        }
      )
        .then((response) => {
          if(response.ok) {
            return response.json();
          }
          
          throw new Error(`Ошибка при загрузке данных ${response.status} ${response.statusText}`);
          
        })
        .then((json) => {
          onSuccess(json);
        })
        .catch( (err) => {
          onError(err);
        });
    } catch (error){
      showError(error);
    }
};

  export {createFetch};