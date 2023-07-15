export { getRender, postRender };
const getRender = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments", {
      method: "GET",
    }).then((response) => {
      return response.json();
    });
}
const postRender = ({ textInputElement, nameInputElement }) => {
  return fetch("https://wedev-api.sky.pro/api/v1/airat-bedretdinov/comments", {
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