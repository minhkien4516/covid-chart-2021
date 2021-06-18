import axios from "axios";

export const getCountries = () =>
  axios.get("https://api.covid19api.com/countries");

export const getReportByCountry = (country) =>
  axios.get(`https://api.covid19api.com/dayone/country/${country}`);

export const getMapDataByCountryId = (selectedCountryId) =>
  import(
    `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
  );
