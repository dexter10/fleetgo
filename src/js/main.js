// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// const heightOutput = document.querySelector("#height");
// const widthOutput = document.querySelector("#width");

const columns = document.querySelectorAll(".column");

function reportColumnSize() {
  columns.forEach((element) => {
    const width = element.clientWidth;
    const columnText = element.querySelector(".column_width");
    columnText.textContent = width + "px";
  });
}

window.onresize = reportColumnSize;
