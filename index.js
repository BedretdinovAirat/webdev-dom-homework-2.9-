const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
// const likeButtonElement = document.querySelector(".like-button");
const data = new Date();

const comments = [
  {
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    data: "12.02.22 12:18",
    count: "3",
    like: false,
  },
  {
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    data: "13.02.22 19:22",
    count: "75",
    like: false,
  },
];
// countLikeElement();
const countLikeElement = () => {
  const buttonLikeElements = document.querySelectorAll(".like-button");
  for (const buttonLikeElement of buttonLikeElements) {
    const index = buttonLikeElement.dataset.index;
    buttonLikeElement.addEventListener("click", () => {
      if (comments[index].like) {
        comments[index].count = comments[index].count += 1;
        comments[index].like = false;
      } else {
        comments[index].count = comments[index].count -= 1;
        comments[index].like = true;
      }
      renderComments();
    });
  }
};
// const countLikes = () => {
//   const likeButtonElements = document.querySelectorAll(".like-button");
//   for (const likeButtonElement of likeButtonElements) {
//     likeButtonElement.addEventListener("click", () => {
//       likeButtonElement.classList.toggle("-active-like");
//       // if (comments.like === false) {
//       //   comments.like = true;
//       // } else {
//       //   comments.like = false;
//       // }
//     });
//   }
// };
const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<ul id="ul-comment" class="comments">
        <li class="comment" id="li_comment">
          <div class="comment-header">
            <div>${comment.name}</div>
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
const validation = () => {
  if (nameInputElement.value && textInputElement.value) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
};
validation();
// создали фукнцию с условием, вызвали функцию, потом создали событие для полей ввода и добавили аргументом эту функцию
nameInputElement.addEventListener("input", validation);
textInputElement.addEventListener("input", validation);

const commentPush = () => {
  comments.push({
    name: nameInputElement.value,
    text: textInputElement.value,
    data: data.toLocaleString(),
    count: 0,
    like: true,
  });
};
// commentPush();
buttonElement.addEventListener("click", () => {
  commentPush();
  renderComments();
  countLikeElement();
});
textInputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    commentPush();
    renderComments();
    countLikeElement();
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
