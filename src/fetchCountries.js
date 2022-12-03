import { name } from '.';
import { URL } from '.';

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
