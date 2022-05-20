require("express-async-errors");
require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");
const app = express();

// app.use(morgan("tiny"));
const cookieParser = require("cookie-parser");
// ....security packages........
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
// .....other imports
const connectDB = require("./db/connect");
const pizzaRouter = require("./routes/pizzaRoutes");
const authRouter = require("./routes/authRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const orderRouter = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// .......body persers.......
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// ............ routes ................
app.use("/api/v1/pizzas", pizzaRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/dashboard", dashboardRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

//   const path = require("path");

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// ..........error handlers..............
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    console.log(`Successfully connected to ${db.connection.host}`);
    app.listen(port, () => console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
