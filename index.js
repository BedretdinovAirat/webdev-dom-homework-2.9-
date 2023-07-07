const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
const buttonRedactionElement = document.getElementById("button-redaction");
const contentContainer = document.querySelector(".container");
const loaderElement = document.querySelector(".loader");
const addForm = document.querySelector(".add-form");
// const mainLoader = document.querySelector(".main__loader");
// const textCommentElement = document.getElementById("text");
const data = new Date();
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
  return fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      loaderElement.textContent = "";
      comments = responseData.comments;
      renderComments();
    })
    .catch(() => {
      alert("У вас пропал интернет, повторите попытку позже.");
    });
};
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
    })
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
  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий добавляется...";
  fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: textInputElement.value,
      name: nameInputElement.value,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Сервер упал :(");
      }
    })
    .then((responseData) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      getFetch();
      return responseData;
    })
    .catch(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("У вас пропал интернет, повторите попытку позже.");
    });
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
