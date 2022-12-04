import { URL } from '.';

export const fetchCountries = value => {
  return fetch(`${URL}${value}?name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};
