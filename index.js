const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
const data = new Date();

const comments = [
  {
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    data: "12.02.22 12:18",
    count: "3",
    like: "❤",
  },
  {
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    data: "13.02.22 19:22",
    count: "75",
    like: "❤",
  },
];

const renderComments = () => {
  const commentsHtml = comments
    .map((comment) => {
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
              <button class="like-button">${comment.like}</button>
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
// const newComment = () => {
//   // const oldListHtml = listElement.innerHTML;
//   // listElement.innerHTML =
//   //   oldListHtml +
//   //   `<ul id="ul-comment" class="comments">
//   //       <li class="comment" id="li_comment">
//   //         <div class="comment-header">
//   //           <div>${nameInputElement.value}</div>
//   //           <div>${data.toLocaleString()}</div>
//   //         </div>
//   //         <div class="comment-body">
//   //           <div class="comment-text">
//   //             ${textInputElement.value}
//   //           </div>
//   //         </div>
//   //         <div class="comment-footer">
//   //           <div class="likes">
//   //             <span class="likes-counter">0</span>
//   //             <button class="like-button"></button>
//   //           </div>
//   //         </div>
//   //       </li>
//   //       </ul>`;
//   // nameInputElement.value = "";
//   // textInputElement.value = "";
//   // buttonElement.disabled = true;
// };
// создали фукнцию с условием, вызвали функцию, потом создали событие для полей ввода и добавили аргументом эту функцию
nameInputElement.addEventListener("input", validation);
textInputElement.addEventListener("input", validation);

buttonElement.addEventListener("click", () => {
  renderComments();
  // const oldListHtml = listElement.innerHTML;
  // listElement.innerHTML =
  //   oldListHtml +
  //   `<ul id="ul-comment" class="comments">
  //       <li class="comment" id="li_comment">
  //         <div class="comment-header">
  //           <div>${nameInputElement.value}</div>
  //           <div>${data.toLocaleString()}</div>
  //         </div>
  //         <div class="comment-body">
  //           <div class="comment-text">
  //             ${textInputElement.value}
  //           </div>
  //         </div>
  //         <div class="comment-footer">
  //           <div class="likes">
  //             <span class="likes-counter">0</span>
  //             <button class="like-button"></button>
  //           </div>
  //         </div>
  //       </li>
  //       </ul>`;
  // nameInputElement.value = "";
  // textInputElement.value = "";
  // buttonElement.disabled = true;
});
textInputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    renderComments();
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
