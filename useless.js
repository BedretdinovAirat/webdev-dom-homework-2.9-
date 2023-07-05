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