import { renderComments } from "./renderComments.js";
import { getRender, postRender } from "./api.js";
// import { renderLogin } from "./renderLogin.js";
export {
  countLikeElement,
  redactionText,
  validation,
  answerComments,
  commentPush,
  app,
  getFetch,
};
// const buttonElement = document.getElementById("button");
// const listElement = document.getElementById("ul-comment");
// const nameInputElement = document.getElementById("name-input");
// const textInputElement = document.getElementById("text-comment");
// const deleteButtonElement = document.getElementById("delete__button");
// const buttonRedactionElement = document.getElementById("button-redaction");
// const contentContainer = document.querySelector(".container");
const loaderElement = document.querySelector(".loader");
// const addForm = document.querySelector(".add-form");
const app = document.querySelector(".app");
// const mainLoader = document.querySelector(".main__loader");
// const textCommentElement = document.getElementById("text");
// const loaderDate = () => {
// window.addEventListener("load", () => {
// mainLoader.classList.add("hide");
// setTimeout(() => {
// mainLoader.remove();
// }, 1000);
// });
// };
// loaderDate();
// contentContainer.textContent = "контент загружается";

//  про классы API, promise - напомнить
// addForm.style.display = "none";
// addForm.style.display = "";
const getFetch = () => {
  loaderElement.textContent =
    "Подождите пожалуйста, комментарии загружаются...";
  getRender()
    .then((responseData) => {
      loaderElement.textContent = "";
      comments = responseData.comments;
      renderComments({ comments, app });
    })
    .catch((error) => {
      console.error(error);
      // console.error("У вас пропал интернет, повторите попытку позже.");
    });
};
getFetch();
// renderLogin({getFetch});
let comments = [];
//  находится элемент, отрисовка в иннер html, в addEventListener
//  классы сложные - дизлайк, back, front на классике
const redactionText = () => {
  const buttonRedactionElements =
    document.querySelectorAll(".button-redaction");
  for (const buttonRedactionElement of buttonRedactionElements) {
    const index = buttonRedactionElement.dataset.index;
    buttonRedactionElement.addEventListener("click", () => {
      if (comments[index].isEdit) {
        const textArea = document.getElementById(index);
        comments[index].isEdit = false;
        comments[index].text = textArea.value;
      } else {
        comments[index].isEdit = true;
      }
      renderComments({ comments, app });
    });
  }
};
const countLikeElement = () => {
  const buttonLikeElements = document.querySelectorAll(".like-button");
  for (const buttonLikeElement of buttonLikeElements) {
    const index = buttonLikeElement.dataset.index;
    buttonLikeElement.addEventListener("click", () => {
      if (comments[index].isLiked) {
        comments[index].likes = comments[index].likes -= 1;
        comments[index].isLiked = false;
      } else {
        comments[index].likes = comments[index].likes += 1;
        comments[index].isLiked = true;
      }
      renderComments({ comments, app });
    });
  }
};
// не хранить данные в разметке
// если есть then то функция обязательно должна возвращать(return) что-то
const validation = () => {
  const textInputElement = document.getElementById("text-comment");
  const nameInputElement = document.getElementById("name-input");
  const buttonElement = document.getElementById("button");
  // buttonElement.disabled = !nameInputElement.value || !textInputElement.value;
  buttonElement.disabled = !textInputElement.value;
};
// const renderComments = () => {
//   const data = new Date();
//   const commentsHtml = comments
//     .map((comment, index) => {
//       return `<li class="comment" id="li_comment">
//           <div class="comment-header">
//             <div class="comment-name">${comment.author.name}</div>
//             <div>$${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             ${
//               comment.isEdit
//                 ? `<textarea type="textarea" rows='10' id=${index}>${comment.text}</textarea>`
//                 : `<div class="comment-text">
//               ${comment.text}
//             </div>`
//             }
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button data-index="${index}" class="like-button ${
//         comment.isLiked ? "-active-like" : ""
//       }"></button>
//             </div>
//           </div>
//           <div class="add-form-row">
//           <button class="add-form-button button-redaction" data-index="${index}">
//             ${
//               comment.isEdit
//                 ? "Сохранить комментарий"
//                 : "Редактировать комментарий"
//             }
//           </button>
//         </div>
//         </li>`;
//     })
//     .join("");
//   const listHTML = `<ul id="ul-comment" class="comments">${commentsHtml}</ul><div class="add-form">
//         <input
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//           id="name-input"
//         />
//         <textarea
//           type="textarea"
//           class="add-form-text"
//           placeholder="Введите ваш коментарий"
//           rows="4"
//           id="text-comment"
//         ></textarea>
//         <div class="add-form-row">
//           <button class="add-form-button" id="button" data-index="">
//             Написать
//           </button>
//         </div>
//         <div class="add-form-row">
//           <button class="add-form-button" id="delete__button" data-index="">
//             Удалить последний комментарий
//           </button>
//         </div>
//       </div>`;

//   app.innerHTML = listHTML;
//   const buttonElement = document.getElementById("button");
//   const nameInputElement = document.getElementById("name-input");
//   const textInputElement = document.getElementById("text-comment");
//   const deleteButtonElement = document.getElementById("delete__button");
//   // const buttonRedactionElement = document.getElementById("button-redaction");
//   // const contentContainer = document.querySelector(".container");
//   // const addForm = document.querySelector(".add-form");
//   // listElement.innerHTML = commentsHtml;
//   nameInputElement.value = "";
//   textInputElement.value = "";
//   buttonElement.disabled = true;
//   countLikeElement();
//   redactionText();
//   nameInputElement.addEventListener("input", validation);
//   textInputElement.addEventListener("input", validation);
//   validation();
//   buttonElement.addEventListener("click", () => {
//     commentPush();
//     // renderComments();
//     countLikeElement();
//     answerComments();
//   });
//   textInputElement.addEventListener("keyup", (e) => {
//     // e.key === "Enter" перенос строки на интер
//     if (e.key === "Shift") {
//       commentPush();
//       // renderComments();
//       countLikeElement();
//       answerComments();
//     }
//   });
//   // удаление
//   // нужно будет переписать код, все данные ушли в массив, нужно будет удалять из массива данных комментарий, с помощью метода, после этого вызывать перерисовку
//   // Объявляем каждый элемент в отдельной функции(const), есть переменные которые дублируем => удалить, повторяющиеся части нужно будет передать как аргументы(button, nameInput, textInput), объявить внутри рендера, дальше передавать как аргументы.
//   deleteButtonElement.addEventListener("click", () => {
//     // const deleteComment = listElement.innerHTML.lastIndexOf(
//     //   '<li class="comment" id="li_comment">'
//     // );
//     // if (deleteComment !== -1) {
//     //   const allComment = listElement.querySelectorAll(".comment");
//     //   const lastElement = allComment[allComment.length - 1];
//     //   lastElement.remove();
//     // }
//   });
// };
// renderComments();
const textConclusions = document.querySelectorAll(".comment-text");
const liComments = document.querySelectorAll(".comment");
const answerComments = () => {
  for (const liComment of liComments) {
    const answerLiComment = liComment.querySelector(".comment-text");
    const answerLiName = liComment.querySelector(".comment-name");
    if (answerLiComment && answerLiName) {
      answerLiComment.addEventListener("click", () => {
        textInputElement.value = `QUOTE_BEGIN ${answerLiComment.textContent} ${answerLiName.textContent} QUOTE_END`;
      });
    }
  }
};
answerComments();
// создали фукнцию с условием, вызвали функцию, потом создали событие для полей ввода и добавили аргументом эту функцию
// безумный прогресс понял
const commentPush = () => {
  const buttonElement = document.getElementById("button");
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-comment");
  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий добавляется...";
  postRender({ textInputElement, nameInputElement })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      return getFetch();
      // return responseData;
    })
    .catch((error) => {
      if (error.message === "Не верный запрос") {
        alert("Имя и комментарий должны быть не короче 3 симолов");
      } else if (error.message === "Ошибка сервера") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert("Кажется у вас сломался интернет, попробуйте позже");
      }
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      // console.error("У вас пропал интернет, повторите попытку позже.");
    });
};
