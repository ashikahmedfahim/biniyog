const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const { connectToDatabase } = require("./configs/dbConfig");
const { modelService, ExpressError } = require('./utilities');
const { userRoute } = require('./routes');

const PORT = process.env.PORT || 3000;
const STAGE = process.env.STAGE || "dev";

app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: 'Authorization',
}));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    if (err.name && err.name.includes('Sequelize'))
        err.message = err.errors?.length && err.errors[0]?.message || "Database Error";
    const { statusCode = 500, message = "Internal Server Error" } = err;
    modelService.errorResponse(res, statusCode, message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
});
connectToDatabase();


