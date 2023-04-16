import { showError } from "./pop-up.js";

// Получить данные с сервера

const Urls = {
  "GET": 'https://23.javascript.pages.academy/keksobooking/data',
  "POST": 'https://23.javascript.pages.academy/keksobooking'
}


const createFetchGet = (onSuccess,onError) => () => {
  try {
    return fetch(
      'https://23.javascript.pages.academy/keksobooking/data',
        {
          method: 'GET',
          credentials: "same-origin",
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


const createFetchPost = (onSuccess, onError, data) => () => {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: new FormData(data)
    })
    .then( (response) => {
      console.log('isResp? - ' + response.ok);
      if(response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте еще раз');
      }
    }).catch( (err) => {
      onError('Не удалось отправить форму. Попробуйте еще раз' + err.message);
    })
  };

  export {createFetchGet, createFetchPost};