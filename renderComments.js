import { token, userName } from "./api.js";
import {
  countLikeElement,
  redactionText,
  validation,
  answerComments,
  commentPush,
  app,
  getFetch,
} from "./index.js";
import { format } from "date-fns";
import { renderLogin } from "./renderLogin.js";
// import { getRender, postRender } from "./api.js";
export { renderComments };

const checkLogin = () => {
  // console.log(token);
  if (token === undefined) {
    return false;
  } else {
    return true;
  }
};

const renderComments = ({ comments, app: innerHTML }) => {
  // const data = new Date();
  const commentsHtml = comments
    .map((comment, index) => {
      const createDate = format(new Date(comment.date), "dd/MM/yyyy hh:mm");
      console.log(comment);
      return `<li class="comment" id="li_comment">
          <div class="comment-header">
            <div class="comment-name">${comment.author.name}</div>
            <div></div>${createDate}</div>
          </div>
          <div class="comment-body">
            ${
              comment.isEdit
                ? `<textarea type="textarea" rows='10' id=${index}>${comment.text}</textarea>`
                : `<div class="comment-text">
              ${comment.text}
            </div>`
            }
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span> 
              <button data-index="${index}" class="like-button ${
        comment.isLiked ? "-active-like" : ""
      }"></button>
            </div>
          </div>
          <div class="add-form-row">
          <button class="add-form-button button-redaction" data-index="${index}">
            ${
              comment.isEdit
                ? "Сохранить комментарий"
                : "Редактировать комментарий"
            } 
          </button>
        </div>
        </li>`;
    })
    .join("");
  const listHTML = `<ul id="ul-comment" class="comments">${commentsHtml}</ul>
  <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder=${userName} readonly
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
      </div>
      <div class="authorization">
      <h1>
      Для добавления комментария небходимо <a class="authorization-link">авторизоваться</a>. 
      </h1>
      </div>`;
  app.innerHTML = listHTML;
  const buttonElement = document.getElementById("button");
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-comment");
  const deleteButtonElement = document.getElementById("delete__button");
  // const buttonRedactionElement = document.getElementById("button-redaction");
  // const contentContainer = document.querySelector(".container");
  // const addForm = document.querySelector(".add-form");
  // listElement.innerHTML = commentsHtml;
  nameInputElement.value = "";
  textInputElement.value = "";
  buttonElement.disabled = true;
  // nameInputElement.disabled = true;
  countLikeElement();
  redactionText();
  nameInputElement.addEventListener("input", validation);
  textInputElement.addEventListener("input", validation);
  validation();
  buttonElement.addEventListener("click", () => {
    commentPush();
    // renderComments();
    countLikeElement();
    answerComments();
  });
  textInputElement.addEventListener("keyup", (e) => {
    // e.key === "Enter" перенос строки на интер
    if (e.key === "Shift") {
      commentPush();
      // renderComments();
      countLikeElement();
      answerComments();
    }
  });

  const addForm = document.querySelector(".add-form");
  const authorization = document.querySelector(".authorization");
  const authorizationLink = document.querySelector(".authorization-link");
  if (checkLogin() === false) {
    addForm.style.display = "none";
    authorization.style.display = "block";
  } else {
    addForm.style.display = "block";
    authorization.style.display = "none";
  }
  authorizationLink.addEventListener("click", () => {
    renderLogin({ getFetch });
  });
  // удаление
  // нужно будет переписать код, все данные ушли в массив, нужно будет удалять из массива данных комментарий, с помощью метода, после этого вызывать перерисовку
  // Объявляем каждый элемент в отдельной функции(const), есть переменные которые дублируем => удалить, повторяющиеся части нужно будет передать как аргументы(button, nameInput, textInput), объявить внутри рендера, дальше передавать как аргументы.
  deleteButtonElement.addEventListener("click", () => {
    // deleteRender({ id });
    // const deleteComment = listElement.innerHTML.lastIndexOf(
    //   '<li class="comment" id="li_comment">'
    // );
    // if (deleteComment !== -1) {
    //   const allComment = listElement.querySelectorAll(".comment");
    //   const lastElement = allComment[allComment.length - 1];
    //   lastElement.remove();
    // }
  });
};
// renderComments();
