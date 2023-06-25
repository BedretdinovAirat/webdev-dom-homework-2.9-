const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
const buttonRedactionElement = document.getElementById("button-redaction");
const textCommentElement = document.getElementById(".text");
const data = new Date();

const comments = [
  {
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    data: "12.02.22 12:18",
    count: 3,
    like: false,
  },
  {
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    data: "13.02.22 19:22",
    count: 75,
    like: false,
  },
];
//  находится элемент, отрисовка в иннер html, в addEventListener
const countLikeElement = () => {
  const buttonLikeElements = document.querySelectorAll(".like-button");
  for (const buttonLikeElement of buttonLikeElements) {
    const index = buttonLikeElement.dataset.index;
    buttonLikeElement.addEventListener("click", () => {
      if (comments[index].like) {
        comments[index].count = comments[index].count -= 1;
        comments[index].like = false;
      } else {
        comments[index].count = comments[index].count += 1;
        comments[index].like = true;
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
            <div class="comment-name">${comment.name}</div>
            <div>${comment.data}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.count}</span>
              <button data-index="${index}" class="like-button ${
        comment.like ? "-active-like" : ""
      }"></button>
            </div>
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
};
renderComments();
const textConclusions = document.querySelectorAll(".comment-text");
const liComments = document.querySelectorAll(".comment");
const answerComments = () => {
  for (const liComment of liComments) {
    const answerLiComment = liComment.querySelector(".comment-text");
    const answerLiName = liComment.querySelector(".comment-name");
    answerLiComment.addEventListener("click", () => {
      textInputElement.value = `${answerLiComment.textContent} ${answerLiName.textContent}`;
    });
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

const commentPush = () => {
  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    text: textInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    data: data.toLocaleString(),
    count: 0,
    like: false,
  });
};
buttonElement.addEventListener("click", () => {
  commentPush();
  renderComments();
  countLikeElement();
  answerComments();
});
textInputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
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
