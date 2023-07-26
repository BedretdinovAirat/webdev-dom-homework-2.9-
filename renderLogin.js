import { login, token, setToken, setUserName, userName } from "./api.js";
export { renderLogin };
const renderLogin = ({ getFetch }) => {
  const app = document.querySelector(".app");
  const loginHtml = `<h1>Страница входа</h1>
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button" id="login-button">Войти</button>
    </div>`;
  app.innerHTML = loginHtml;
  const buttonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        console.log(token);
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        console.log(token);
        console.log(userName);
      })
      .then(() => {
        getFetch();
      });
  });
};
