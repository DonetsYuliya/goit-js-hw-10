import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
ref.list.style.paddingLeft = 0;

export let name = '';

const handelInput = () => {
  const value = ref.input.value.trim();

  if (!value) return;

  if (value !== name) {
    ref.list.innerHTML = '';
    ref.countryInfo.innerHTML = '';
    name = value;
  }

  fetchCountries()
    .then(toShowCountries)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      ref.list.innerHTML = '';
      ref.countryInfo.innerHTML = '';
    });
};

ref.input.addEventListener('input', debounce(handelInput, DEBOUNCE_DELAY));

const renderCountries = countriesArrya => {
  const country = countriesArrya
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="country-item" style="list-style:none; display:flex; align-items:center; justify-items: flex-start;">
  <img src="${svg}" alt="flag" class="country-flag" style="margin-right:20px;" width=50 height=30/>
  <p class="country-name__official"><b>${official}</b></p>
</li>`;
    })
    .join(' ');
  ref.list.innerHTML = country;
};

const renderCountryInformation = countriesArrya => {
  const info = countriesArrya
    .map(({ capital, population, languages }) => {
      return `<p class="country-capital"><b>Capital</b>: ${capital}</p>
      <p class="country-population"><b>Population</b>: ${population}</p>
      <p class="country-languages"><b>Languages</b>: ${Object.values(
        languages
      )}</p>`;
    })
    .join(' ');
  ref.countryInfo.innerHTML = info;
};

const toShowCountries = countriesArrya => {
  if (countriesArrya.length > 9) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countriesArrya.length === 1) {
    renderCountries(countriesArrya);
    renderCountryInformation(countriesArrya);
  } else {
    renderCountries(countriesArrya);
  }
};
