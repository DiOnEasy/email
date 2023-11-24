const selectSingle = document.querySelector(".__select");
const selectSingle_title = selectSingle.querySelector(".__select__title");
const selectSingle_labels = selectSingle.querySelectorAll(".__select__label");

// Toggle menu
selectSingle_title.addEventListener("click", () => {
  if ("active" === selectSingle.getAttribute("data-state")) {
    selectSingle.setAttribute("data-state", "");
  } else {
    selectSingle.setAttribute("data-state", "active");
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener("click", (evt) => {
    selectSingle_title.innerHTML =
      '<span>' + evt.target.textContent + '</span>' +
      ' <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="base-0-2-23" ie-style=""><path fill-rule="evenodd" d="M5.171 7.226A.75.75 0 015.75 6h4.5a.75.75 0 01.579 1.226l-2.223 2.966a.75.75 0 01-1.212 0L5.171 7.226z"></path></svg></span>';
    selectSingle.setAttribute("data-state", "");
  });
}

// Reset title
// const reset = document.querySelector(".reset");
// reset.addEventListener("click", () => {
//   selectSingle_title.textContent =
//     selectSingle_title.getAttribute("data-default");
// });


