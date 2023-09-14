function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function CookieStore(name, minCust, maxCust, avgSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.custPerHour = [];
  this.cookiesPerHour = [];
}

CookieStore.prototype.calcCustPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    let numCust = randomNum(this.minCust, this.maxCust);
    this.custPerHour.push(numCust);
  }
};
CookieStore.prototype.calcCookiesPerHour = function () {
  for (let i = 0; i < this.custPerHour.length; i++) {
    this.cookiesPerHour.push(Math.floor(this.custPerHour[i] * this.avgSale));
  }
};

CookieStore.prototype.render = function () {
  this.calcCustPerHour();
  this.calcCookiesPerHour();
  const tableEl = document.getElementById("table");

  const rowEl = document.createElement("tr");

  tableEl.appendChild(rowEl);

  let el = document.createElement("th");
  el.textContent = this.name;
  rowEl.appendChild(el);

  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    el = document.createElement("td");
    el.textContent = this.cookiesPerHour[i];
    rowEl.appendChild(el);
  }
};

const SeattleStore = new CookieStore("Seattle", 5, 45, 3.3);
const TokyoPlace = new CookieStore("Tokyo", 3, 40, 6.3);
const DubaiStore = new CookieStore("Dubai", 10, 30, 2.3);
const ParisStore = new CookieStore("Paris", 5, 45, 3.3);
const LimaStore = new CookieStore("Lima", 5, 45, 3.3);

const stores = [SeattleStore, TokyoPlace, DubaiStore, ParisStore, LimaStore];
SeattleStore.render();
TokyoPlace.render();
DubaiStore.render();
ParisStore.render();
LimaStore.render();

const form = document.getElementById("new-store-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const storeNameInput = event.target.name.value;
  const minCustInput = event.target.minCust.value;
  const maxCustInput = event.target.maxCust.value;
  const avgCookieInput = event.target.avgCookies.value;

  console.log(storeNameInput);
  console.log(minCustInput);
  console.log(maxCustInput);
  console.log(avgCookieInput);

  form.reset();

  const newStore = new CookieStore(
    storeNameInput,
    minCustInput,
    maxCustInput,
    avgCookieInput
  );

  newStore.render();
});
