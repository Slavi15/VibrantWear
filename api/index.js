require("dotenv").config();
require("./config/db.js");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes/index.js");

const app = express();

app.set("json spaces", 4);
// app.use('/api/webhook', express.raw({ 
//     type: "application/json" 
// }));
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(helmet());
app.use(morgan("dev"));

app.disable("x-powered-by");

app.use("/api", routes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on: http://localhost:${port}`));