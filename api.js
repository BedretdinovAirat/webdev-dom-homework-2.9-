export {
  getRender,
  postRender,
  setToken,
  token,
  login,
  userName,
  setUserName,
};

const host = "https://wedev-api.sky.pro/api/v2/airat-bedretdinov/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

let userName;

const setUserName = (newUserName) => {
  userName = newUserName;
};

let token;
const setToken = (newToken) => {
  token = newToken;
};

const getRender = () => {
  return fetch(host, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};
const postRender = ({ textInputElement, nameInputElement }) => {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text: textInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      forceError: true,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Ошибка сервера");
    }

    if (response.status === 400) {
      throw new Error("Не верный запрос");
    }

    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error("У вас сломался интернет");
    }
  });
};
// const deleteRender = ({ id }) => {
//   return fetch(`${userUrl}/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     return response.json();
//   });
// };
const login = ({ login, password }) => {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      alert("Неверные данные, попробуйте снова");
      throw new Error("Неверные данные, попробуйте снова");
    }
    return response.json();
  });
};
