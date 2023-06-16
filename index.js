const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const deleteButtonElement = document.getElementById("delete__button");
const data = new Date();
function validation() {
  if (nameInputElement.value && textInputElement.value) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
}
validation();
// создали фукнцию с условием, вызвали функцию, потом создали событие для полей ввода и добавили аргументом эту функцию
nameInputElement.addEventListener("input", validation);
textInputElement.addEventListener("input", validation);
buttonElement.addEventListener("click", () => {
  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML =
    oldListHtml +
    `<ul id="ul-comment" class="comments">
        <li class="comment" id="li_comment">
          <div class="comment-header">
            <div>${nameInputElement.value}</div>
            <div>${data.toLocaleString()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${textInputElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>
        </ul>`;
  nameInputElement.value = "";
  textInputElement.value = "";
  buttonElement.disabled = true;
});
textInputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML =
      oldListHtml +
      `<ul id="ul-comment" class="comments">
        <li class="comment" id="li_comment">
          <div class="comment-header">
            <div>${nameInputElement.value}</div>
            <div>${data.toLocaleString()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${textInputElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>
        </ul>`;
        nameInputElement.value = "";
        textInputElement.value = "";
  }
})
// удаление 
deleteButtonElement.addEventListener("click", () => {
   const deleteComment = listElement.innerHTML.lastIndexOf('<li class="comment" id="li_comment">');
        if (deleteComment !== -1) {
          const allComment = listElement.querySelectorAll(".comment");
          const lastElement = allComment[allComment.length - 1];
          lastElement.remove();
        } 
})