const express = require("express");
const router = express();
const { citiesApi } = require("../controller/weather");
const cacheService = require("express-api-cache");
const cache = cacheService.cache;

router.get("/cities/:id/:id2/:id3", cache("10 minutes"), citiesApi);

module.exports = router;
