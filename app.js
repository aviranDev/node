const express = require("express");
const app = express();


app.get('/', (req, res) => {
  res.send('Weolcome to the home page!');
});

const port = 3000
app.listen(port, () => {
  console.log("Server runs on port:", port);
});

