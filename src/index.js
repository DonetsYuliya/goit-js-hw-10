import './css/styles.css';
import Notiflix from 'notiflix';
Notiflix.Notify.info(
  'Too many matches found. Please enter a more specific name.'
);

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const URL = `https://restcountries.com/v3.1/name/`;

const ref = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let name = '';

const fetchCountries = () => {
  fetch(`${URL}${name}?name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(renderCountries)

    .catch(error => {
      console.log(`error:${error}`);
    });
};

const handelInput = e => {
  e.preventDefault();
  const { value } = ref.input;

  if (value !== name) {
    ref.list.innerHTML = '';
    name = value;
  }
  fetchCountries();
};

ref.input.addEventListener('input', debounce(handelInput, DEBOUNCE_DELAY));

const renderCountries = items => {
  const country = items
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="country-item" style="list-style:none; display:flex; align-items:center;">
  <img src="${svg}" alt="flag" class="country-flag" style="margin-right:20px;" width=50 height=30/>
  <p class="country-caption">${official}</p>
</li>`;
    })
    .join(' ');
  ref.list.insertAdjacentHTML('beforeend', country);
};
