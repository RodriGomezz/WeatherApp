const express = require("express");
const app = express();
const cors = require("cors");
const weather = require("./router/weather");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(weather);

app.listen(port, () => {
  console.log(`server is listen on port ${port}`);
});
