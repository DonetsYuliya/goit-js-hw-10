import { name } from '.';

const URL = `https://restcountries.com/v3.1/name/`;

export const fetchCountries = () => {
  return fetch(`${URL}${name}?name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};
