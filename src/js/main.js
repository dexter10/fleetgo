// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const btn = document.querySelector(".btn");
const countriesContainer = document.querySelector(".countries");
const url = "https://countries-api-836d.onrender.com/countries/";

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} M</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getJSON2 = async function (url, errorMsg = "Something went wrong.") {
  const response = await fetch(url);
  // With 'return' this creates a promise
  if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);
  return await response.json();
};

const getCountryData = function (country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    "Country not found."
  )
    .then((data) => {
      renderCountry(data[0]); // Render country 1
      const neighbor = data[0].borders[0]?.toLowerCase(); // Get neighbor
      // if (!neighbor) return;

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
        "No bordering country."
      );
    })
    // .then(response => response.json())
    .then((data) => {
      console.log(data);
      renderCountry(data, "neighbour");
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`); // dev
      renderError(`Something went wrong 💥💥 ${err.message}. Try again`); // client
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("germany");
});
