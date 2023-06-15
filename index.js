const buttonElement = document.getElementById("button");
const listElement = document.getElementById("ul-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-comment");
const data = new Date();
buttonElement.addEventListener("click", () => {
    // buttonElement.classList.remove("add-form-button");
    // if (nameInputElement.value === '' || textInputElement.value === '') {
    // buttonElement.classList.add("add-form-button");
    // } 
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
})