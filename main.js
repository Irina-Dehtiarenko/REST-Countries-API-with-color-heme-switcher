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

const divCountries = document.querySelector("div.countries");
const selectRegion = document.querySelector("select");

const showCounties = () => {
  // dla wszystkich krajów

  // const url = `https://restcountries.com/v3.1/all`;

  // dla sortowania względem regionu:
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

// funkcja która wyświetla wszystkie potrzebne kraje na 'home page'
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
const resetInfo = () => {
  region = "";
  divCountries.textContent = "";
  country = "";
};

selectRegion.addEventListener("change", (e) => {
  region = e.target.value;

  if (region === "") {
    // treba by było coś z tym wymyślić, żeby w konsoli nie wyskakiwał błąd,albo opisywało na czym polega błąd
    region = "";
    resetInfo();
  } else {
    showCounties();
    resetInfo();
  }
});
