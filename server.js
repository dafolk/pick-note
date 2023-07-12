const express = require("express");
const app = express();
const PORT = 4003;

app.listen(PORT, () => {
  console.log(`Server is active on http://localhost:${PORT}.`);
});
