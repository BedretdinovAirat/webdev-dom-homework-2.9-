// добавление нового комментария через пуш
// comments.push({
//   name: nameInputElement.value
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;"),
//   text: textInputElement.value
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;"),
//   data: data.toLocaleString(),
//   count: 0,
//   like: false,
// });
// FETCH глобальная функция 
// const fetchPromise = fetch(
//   "https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments",
//   {
    // method: "POST",
    // body: JSON.stringify({
    //   text: textInputElement.value,
    //   name: nameInputElement.value,
    // }),
//   }
// );
// const jsonPromise = response.json();

// мой массив 
//  {
//     name: "Глеб Фокин",
//     text: "Это будет первый комментарий на этой странице",
//     data: "12.02.22 12:18",
//     count: 3,
//     like: false,
//     isEdit: false,
//   },
//   {
//     name: "Варвара Н.",
//     text: "Мне нравится как оформлена эта страница! ❤",
//     data: "13.02.22 19:22",
//     count: 75,
//     like: false,
//     isEdit: true,
//   },
//const fetchPromise = 
// loader 
// listElement.textContent = `контент загружается`;
// const backData = () => {
//   // return (listElement.innerHTML = `<p>Контент загружается</p>`);
//   listElement.innerHTML = `<p>Контент загружается</p>`;
//   return `${listElement}`;
// };
// backData();
// const getLoad = () => {
//   return fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments")
//     .then((response) => {
//       return response.json();
//     })
//     .then(() => {
//       console.log(responseData);;
//     });
// };
// getLoad().then(() => {
//   return contentContainer.textContent = "контент загружается";
// })
// getLoad();
// Promise.all(getFetch()).then(() => {
//   contentContainer.textContent = "контент загружается";
//   return getFetch();
// });

// всё добавили в рендер функцию, вся отрисовка идёт из рендера
/* <ul id="ul-comment" class="comments">
        <!-- <li class="comment" id="li_comment">
          <div class="comment-header">
            <div>Глеб Фокин</div>
            <div>12.02.22 12:18</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              Это будет первый комментарий на этой странице
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">3</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>
        <li class="comment">
          <div class="comment-header">
            <div>Варвара Н.</div>
            <div>13.02.22 19:22</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              Мне нравится как оформлена эта страница! ❤
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">75</span>
              <button class="like-button -active-like" id="like-butt" data-index=""></button>
            </div>
          </div>
        </li> -->
      </ul>
      <!-- <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="name-input"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="text-comment"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="button" data-index="">
            Написать
          </button>
        </div>
        <div class="add-form-row">
          <button class="add-form-button" id="delete__button" data-index="">
            Удалить последний комментарий
          </button>
        </div>
      </div> --> */
    //   const listElement = document.getElementById("ul-comment");
        // fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments" + id, {
  //   method: "DELETE",
  // }).then((response) => {
  //   response.json().then((responseData) => {
  //     console.log(responseData);
  //     listComments = responseData.comments;
  //     renderComments();
  //   });
  // });

  // 11.07.2023 Цепочка промисов с ошибками
  // .then((response) => {
  //     if (response.status === 500) {
        
  //     }
  //   })
  //   .then((response) => {
  //     if (response.status === 400) {
  //       throw new Error("Не верный запрос");
  //     }
  //   })
  //   .then((response) => {
  //     if (response.status === 201) {
  //       return response.json();
  //     } else {
  //       throw new Error("Сервер упал :(");
  //     }
  //   })