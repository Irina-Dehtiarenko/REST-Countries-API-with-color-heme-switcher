let region = "";
let country = "";

//get the last saved mode and apply it to our site
let theme = localStorage.getItem("theme");

// get elements frome home page
const homePage = document.querySelector(".homepage");
const body = document.querySelector("body");
const buttonDarkMode = document.querySelector("#dark_mode");
const divCountries = document.querySelector("div.countries");
const selectRegion = document.querySelector("select");
const searcher = document.querySelector("input");
const optionZero = document.querySelector("option.zero");

// get elements frome details page
const detailsPage = document.querySelector(".detail_page");
const buttonBackHome = document.querySelector("button.back_home");
const flagImg = document.querySelector("div.flag_img");
const nameCountry = document.querySelector(".country_details h2.name-country");
const nativeName = document.querySelector(".main-details .native-name span");
const population = document.querySelector(".main-details .population span");
const regionSpan = document.querySelector(".main-details .region span");
const subRegion = document.querySelector(".main-details .sub-region span");
const capital = document.querySelector(".main-details .capital span");
const tld = document.querySelector(".other-details .top-level-domain span");
const currencies = document.querySelector(".other-details .currencies span");
const languages = document.querySelector(".other-details .languages span");

// border countries
const allBorderCountries = document.querySelector(".all-border-countries");

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
const showAllCounties = () => {
  const url = `https://restcountries.com/v3.1/all`;

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
const showCounties = () => {
  const url = `https://restcountries.com/v3.1/name/${country}`;

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
      showCountryDetail(data);
    })
    .catch((err) => console.log(err));
};

// download api with country code about clickes border country
const showCountryCode = () => {
  const url = `https://restcountries.com/v3.1/alpha/${country}
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
      showCountryDetail(data);
    })
    .catch((err) => console.log(err));
};

// the reset function
const resetInfo = () => {
  region = "";
  divCountries.textContent = "";
  country = "";
};

// funktion with show border countries
const showBorder = (border) => {
  let borderCountry = document.createElement("div");
  borderCountry.classList.add("border-country");
  borderCountry.textContent = border;
  allBorderCountries.appendChild(borderCountry);

  borderCountry = document.querySelectorAll(".border-country");

  // funktion with show details about searching border country
  borderCountry.forEach((borderName) => {
    borderName.addEventListener("click", (e) => {
      country = e.target.textContent;
      showCountryCode();
    });
  });
};

// funktion with show details about searching country

const showCountryDetail = (country) => {
  flagImg.style.backgroundImage = `url(${country[0].flags.svg})`;
  nameCountry.textContent = country[0].name.common;
  nativeName.textContent = Object.values(
    country[0].name.nativeName
  )[0].official;

  population.textContent = country[0].population.toLocaleString();
  regionSpan.textContent = country[0].region;
  subRegion.textContent = country[0].subregion;
  capital.textContent = country[0].capital;
  tld.textContent = country[0].tld[0];
  currencies.textContent = Object.values(country[0].currencies)[0].name;

  languages.textContent = Object.values(country[0].languages);

  //details about border country

  allBorderCountries.textContent = "";

  if (country[0].borders) {
    const borders = country[0].borders;

    borders.forEach((border) => {
      showBorder(border);
    });
  } else {
    allBorderCountries.textContent = "No border countries";
  }
};
const showDetail = () => {
  homePage.classList.add("invisible");
  detailsPage.classList.remove("invisible");
  showCounties();

  buttonBackHome.addEventListener("click", () => {
    searcher.value = "";
    selectRegion.value = optionZero.value;
    optionZero.textContent = "Filter by Region";
    resetInfo();

    showAllCounties();
    detailsPage.classList.add("invisible");
    homePage.classList.remove("invisible");
  });
};

// a function that displays all selected countries on the 'home page'
const showCounty = (countries) => {
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

    spanPopulation.textContent = `${country.population.toLocaleString()}`;
    //musz?? by?? przycinki poni??dzy 000,000,000

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
  // funktion with show details about searching country

  [...document.querySelectorAll(".country")].forEach((countryDet) =>
    countryDet.addEventListener("click", () => {
      country = countryDet.querySelector("h2").textContent;
      showDetail();
    })
  );
};

// function with  region selection
selectRegion.addEventListener("change", (e) => {
  region = e.target.value;

  //sercher reset
  searcher.value = "";

  if (region === "") {
    resetInfo();
    showAllCounties();
  } else {
    showRegion();
    resetInfo();
  }
});

// function with  country searching by input
searcher.addEventListener("search", (e) => {
  country = e.target.value;

  // reset selection
  selectRegion.value = optionZero.value;
  optionZero.textContent = "Filter by Region";

  if (searcher.value === "") {
    resetInfo();
    showAllCounties();
  } else {
    showCounties();
    resetInfo();
  }
});

showAllCounties();
