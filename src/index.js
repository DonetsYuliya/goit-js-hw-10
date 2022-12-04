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

export const URL = `https://restcountries.com/v3.1/name/`;

const updatePage = (clearList = '', clearInfo = '') => {
  return (
    (ref.list.innerHTML = clearList), (ref.countryInfo.innerHTML = clearInfo)
  );
};

const handelInput = () => {
  const value = ref.input.value.trim();

  updatePage();
  if (!value) return;

  fetchCountries(value)
    .then(toShowCountries)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      // console.clear();
    });
};

ref.input.addEventListener('input', debounce(handelInput, DEBOUNCE_DELAY));

const renderCountries = countriesArrya => {
  return countriesArrya
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="country-item" style="list-style:none; display:flex; align-items:center;">
  <img src="${svg}" alt="flag" class="country-flag" style="margin-right:20px;" width=50 height=30/>
  <p class="country-name__official"><b>${official}</b></p>
</li>`;
    })
    .join(' ');
};

const renderCountryInformation = countriesArrya => {
  return countriesArrya
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => {
        return `<div style="display:flex; align-items:center;">
  <img src="${svg}" alt="flag" class="country-flag" style="margin-right:20px;" width=50 height=30/>
  <p class="country-name__official"><b>${official}</b></p></div>
  <p class="country-capital"><b>Capital</b>: ${capital}</p>
  <p class="country-population"><b>Population</b>: ${population}</p>
  <p class="country-languages"><b>Languages</b>: ${Object.values(
    languages
  ).join(', ')}</p>`;
      }
    )
    .join(' ');
};

const toShowCountries = countriesArrya => {
  if (countriesArrya.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countriesArrya.length === 1) {
    const markup = renderCountryInformation(countriesArrya);
    updatePage('', markup);
  } else {
    const markup = renderCountries(countriesArrya);
    updatePage(markup, '');
  }
};
