const express = require("express");
const routes = require("./routes");

const app = express();

routes(app);

app.listen(5001, () => {
    console.log("server is running on port 5001");
});