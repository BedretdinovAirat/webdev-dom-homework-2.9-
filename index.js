const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
const buttonRedactionElement = document.getElementById("button-redaction");
const textCommentElement = document.getElementById(".text");

const data = new Date();

const getFetch = () => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments",
    {
      method: "GET",
    }
  );

  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      console.log(responseData);
      comments = responseData.comments;
      renderComments();
    });
  });
}
getFetch();

let comments = [];
//  находится элемент, отрисовка в иннер html, в addEventListener
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
      renderComments();
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
      renderComments();
    });
  }
};
const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<ul id="ul-comment" class="comments">
        <li class="comment" id="li_comment">
          <div class="comment-header">
            <div class="comment-name">${comment.author.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            ${
              comment.isEdit
                ? `<textarea id=${index}>${comment.text}</textarea>`
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
        </li>
        </ul>`;
    }) // count менял на лайки
    .join("");
  listElement.innerHTML = commentsHtml;
  nameInputElement.value = "";
  textInputElement.value = "";
  buttonElement.disabled = true;
  countLikeElement();
  redactionText();
};
renderComments();
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
const validation = () => {
  buttonElement.disabled = !nameInputElement.value || !textInputElement.value;
};
validation();
// создали фукнцию с условием, вызвали функцию, потом создали событие для полей ввода и добавили аргументом эту функцию
nameInputElement.addEventListener("input", validation);
textInputElement.addEventListener("input", validation);
// безумный прогресс понял
const commentPush = () => {
  fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments", {
    method: "POST",
    body: JSON.stringify(
      { 
      text: textInputElement.value, 
      name: nameInputElement.value, 
    }),
  }).then((response) => {
    response.json().then((responseData) => {
      console.log(responseData);
      listComments = responseData.comments;
      renderComments();
    });
  });
  getFetch();
};
buttonElement.addEventListener("click", () => {
  commentPush();
  renderComments();
  countLikeElement();
  answerComments();
});
textInputElement.addEventListener("keyup", (e) => {
  // e.key === "Enter" перенос строки на интер
  if (e.key === "Shift") {
    commentPush();
    renderComments();
    countLikeElement();
    answerComments();
  }
});
// удаление
deleteButtonElement.addEventListener("click", () => {
  const deleteComment = listElement.innerHTML.lastIndexOf(
    '<li class="comment" id="li_comment">'
  );
  if (deleteComment !== -1) {
    const allComment = listElement.querySelectorAll(".comment");
    const lastElement = allComment[allComment.length - 1];
    lastElement.remove();
  }
  
  // fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments" + id, {
  //   method: "DELETE",
  // }).then((response) => {
  //   response.json().then((responseData) => {
  //     console.log(responseData);
  //     listComments = responseData.comments;
  //     renderComments();
  //   });
  // });
});
// 1. Найти элемент текст ареа, можно просто по queryselector
// 2. С циклом фор оф перебирать каждый нужный нам элемент текст ареа для того чтобы повесить то что нам нужно
// 3. Вешаем обработчик событий на этот элемент
// 4. Должно получиться
// 5.
// 6.
// 7.
// 8.
// 9.
// 10.
