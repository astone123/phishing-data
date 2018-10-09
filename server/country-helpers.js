/* Helper functions to derive country counts from Phish data. */
const countries = require('./countries.json');

const getCountryCoords = countryCode => {
  const country = countries.find(
    country => country.country == countryCode.toUpperCase()
  );
  return country ? [country.latitude, country.longitude] : null;
};

const getCountryName = countryCode => {
  const country = countries.find(
    country => country.country == countryCode.toUpperCase()
  );
  return country ? country.name : null;
};

const getCountryFromArray = (array, countryCode) =>
  array.find(element => element.code == countryCode);

const sortByCountAscending = (a, b) => a.count < b.count;

const getCountryArray = data => {
  const countryArray = [];
  data.forEach(phish => {
    const countryCode = phish.country || phish.details[0].country;
    const country = getCountryFromArray(countryArray, countryCode);
    if (country) {
      country.count = country.count + 1;
    } else {
      const name = getCountryName(countryCode);
      const coords = getCountryCoords(countryCode);
      if (name) {
        countryArray.push({
          code: countryCode,
          name,
          coordinates: [coords[1], coords[0]],
          count: 1
        });
      }
    }
  });

  countryArray.sort(sortByCountAscending);

  return countryArray;
};

module.exports = getCountryArray;
