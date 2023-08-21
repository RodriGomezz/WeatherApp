const axios = require("axios");
require("dotenv").config();

exports.citiesApi = async (req, res) => {
  const country_name = req.params.id;
  const urlc = `http://public.opendatasoft.com/api/records/1.0/search/?dataset=countries-codes&q=${country_name}`;
  try {
    const responseCountry = await axios.get(urlc);

    if (!responseCountry.data.records[0])
      throw (CountryError = "Country does not exist");
    const countryCode = responseCountry.data.records[0].fields.iso2_code;
    const apiKey = process.env.API_KEY;
    const city_name = req.params.id2;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},${countryCode}&appid=${apiKey}`;
    const response = await axios.get(url);

    const lon = await response.data.coord.lon;
    const lat = await response.data.coord.lat;
    const units = req.params.id3;
    const urlw = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const responseWeather = await axios.get(urlw);
    return res.status(200).send(responseWeather.data);
  } catch (error) {
    if (error != "Country does not exist") error = "City does not exist";

    return res.status(401).send(error);
  }
};
