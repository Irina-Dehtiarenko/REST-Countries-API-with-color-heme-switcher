/* 
data[i].
 nazwa -   name.common 
population - population
region - region
capital - capital

native name: ??? każdy kraj ma inną ścieżkę
"name": {
"common": "Ukraine",
"official": "Ukraine",
"nativeName": {
"ukr": {
"official": "Україна",
"common": "Україна"
}
}
}

subregion - subregion
top level domain - tld[0]

currencies  - inna ścieżka:
"currencies": {
"UAH": {
"name": "Ukrainian hryvnia",
"symbol": "₴"
}
},

languages - tak samo: nie wiem jak
"languages": {
"ukr": "Ukrainian"
},

flag - flags.svg
 */
let region = "";
let country = "";

//get the last saved mode and apply it to our site
let theme = localStorage.getItem("theme");

const body = document.querySelector("body");
const buttonDarkMode = document.querySelector("#dark_mode");
const divCountries = document.querySelector("div.countries");
const selectRegion = document.querySelector("select");
const searcher = document.querySelector("input");

// dark mode

buttonDarkMode.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.className === "dark") {
    theme = "dark";
  } else if (body.className !== "dark") {
    theme = "light";
  }
  //get the last saved mode and apply it to our site
  localStorage.setItem("theme", theme);
});

if (theme === "dark") {
  body.classList.add("dark");
}
if (theme === "light") {
  body.classList.remove("dark");
}

// download api with countries by region

const showRegion = () => {
  // for all countries

  // const url = `https://restcountries.com/v3.1/all`;

  // for sort by region:
  const url = `https://restcountries.com/v3.1/region/${region}`;

  fetch(url, {
    cache: "no-cache",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid url adress");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      showCounty(data);
    })
    .catch((err) => console.log(err));
};

// download api with  country from search
const showCounties = () => {
  const url = `https://restcountries.com/v3.1/name/${country}
  `;

  fetch(url, {
    cache: "no-cache",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid url adress");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      showCounty(data);
    })
    .catch((err) => console.log(err));
};

// a function that displays all the necessary countries on the 'home page'

const showCounty = (countries) => {
  //   console.log(randomCountry);

  countries.forEach((country) => {
    const divCountry = document.createElement("div");
    divCountry.classList.add("country");

    const divImg = document.createElement("div");
    divImg.classList.add("img");
    divImg.style.backgroundImage = `url('${country.flags.svg}')`;

    const h2 = document.createElement("h2");
    h2.classList.add("name-country");
    h2.textContent = `${country.name.common}`;
    const ul = document.createElement("ul");
    const liPopulation = document.createElement("li");
    liPopulation.classList.add("population");
    liPopulation.textContent = `Population: `;
    const spanPopulation = document.createElement("span");
    spanPopulation.textContent = `${country.population}`; //muszą być przecinki poniędzy 000,000,000

    const liRegion = document.createElement("li");
    liRegion.classList.add("region");
    liRegion.textContent = `Region: `;
    const spanRegion = document.createElement("span");
    spanRegion.textContent = `${country.region}`;

    const liCapital = document.createElement("li");
    liCapital.classList.add("capital");
    liCapital.textContent = `Capital: `;
    const spanCapital = document.createElement("span");
    spanCapital.textContent = `${country.capital}`;

    divCountries.appendChild(divCountry);
    divCountry.appendChild(divImg);
    divCountry.appendChild(h2);
    divCountry.appendChild(ul);
    ul.appendChild(liPopulation);
    liPopulation.appendChild(spanPopulation);
    ul.appendChild(liRegion);
    liRegion.appendChild(spanRegion);
    ul.appendChild(liCapital);
    liCapital.appendChild(spanCapital);
  });
};

// the reset function
const resetInfo = () => {
  region = "";
  divCountries.textContent = "";
  country = "";
};

// function with  region selection
selectRegion.addEventListener("change", (e) => {
  region = e.target.value;

  if (region === "") {
    // you need to think of something about it, so that an error does not pop up in the console, or it describes what the error is
    region = "";
    resetInfo();
  } else {
    showRegion();
    resetInfo();
  }
});

// function with  country searching by input
searcher.addEventListener("search", (e) => {
  country = e.target.value;
  showCounties();
  resetInfo();
});
