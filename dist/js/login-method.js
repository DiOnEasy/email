let loginMethods = document.querySelectorAll(".form__login-method-item");
let activeMethod = document.querySelector(".form__login-method-item_active");
let loginInput = document.querySelector(".form__login-input input");
let loginButtonText = document.querySelector(
  ".form__login-button button span:nth-child(1)"
);
let select = document.querySelector(".form__select");
let loginText = document.querySelector(".form__login-method-text");

let formLink = document.querySelector(".form__recover-links a:nth-child(1)");

function changeLoginMethod(i) {
  let selectText = document.querySelector(".__select__title span:nth-child(1)");

  console.log("fasdkj");
  loginMethods[i].classList.toggle("form__login-method-item_active");
  activeMethod.classList.toggle("form__login-method-item_active");
  activeMethod = loginMethods[i];
  select.classList.remove("none");

  switch (i) {
    case 0:
      loginText.textContent = "";
      loginButtonText.textContent = "Ввести пароль";
      formLoginButton.setAttribute("data-state", "mail");

      selectText.textContent = "@mail.ru";
      select.classList.remove("none");
      formLink.textContent = "Восстановить доступ";
      loginInput.classList.remove("input__full");
      break;
    case 1:
      loginText.textContent =
        "Для авторизации через Яндекс OAuth вам не нужно вводить пароль, а достаточно предоставить доступ к вашему аккаунту Яндекс.";
      loginButtonText.textContent = "Продолжить";
      formLoginButton.setAttribute("data-state", "yandex");
      selectText.textContent = "@yandex.ru";
      formLink.textContent = "";
      loginInput.classList.remove("input__full");

      break;
    case 2:
      loginText.textContent =
        "Для авторизации через Google OAuth вам не нужно вводить пароль, а достаточно предоставить доступ к вашему аккаунту Gmail.";
      loginButtonText.textContent = "Продолжить";
      formLoginButton.setAttribute("data-state", "gmail");

      selectText.textContent = "@gmail.com";
      select.classList.remove("none");
      formLink.textContent = "";
      loginInput.classList.remove("input__full");

      break;
    case 3:
      loginText.textContent = "";
      loginButtonText.textContent = "Ввести пароль";
      formLoginButton.setAttribute("data-state", "other");

      select.classList.add("none");
      formLink.textContent = "";
      loginInput.classList.add("input__full");

      break;
  }
}

// loginMethods.forEach((item) => {
//   item.onclick = () => changeLoginMethod(item);
// });

for (let i = 0; i < loginMethods.length; i++) {
  loginMethods[i].addEventListener("click", () => changeLoginMethod(i));
}

function loadingSimulator() {
  setTimeout(() => {
    document.querySelector("main").classList.add("dark__bg");

    document.querySelector("#preloader").classList.remove("none");
  }, 500);
  setTimeout(() => {
    document.querySelector("#preloader").classList.add("none");
    document.querySelector(".form-login-wrapper").classList.remove("none");
  }, 1900);
  console.log("sadfksdajlfj");
}

loadingSimulator();
