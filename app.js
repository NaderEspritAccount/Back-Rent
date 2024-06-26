const express = require("express");
const app = express();
// const PORT = 3000;
const vehiculeRouter = require("./routes/vehicule");
const reservationRouter = require("./routes/reservation");
const paymentRouter = require("./routes/payment");

const http = require("http");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");

// app.listen(PORT, (error) => {
//   if (!error)
//     console.log(
//       "Server is Successfully Running, and App is listening on port " + PORT
//     );
//   else console.log("Error occurred, server can't start", error);
// });

// Import routes

mongoose.set("strictQuery", true);

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/UrbanMove", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// View engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   cors({
//     origin: ["http://localhost:5000", "http://localhost:4200"],

//     // "true" will copy the domain of the request back
//     // to the reply. If you need more control than this
//     // use a function.

//     credentials: true, // This MUST be "true" if your endpoint is
//     // authenticated via either a session cookie
//     // or Authorization header. Otherwise the
//     // browser will block the response.

//     methods: "POST,GET,PUT,OPTIONS,DELETE,PATCH", // Make sure you're not blocking
//     // pre-flight OPTIONS requests
//   })
// );

// Route handlers
app.use("/reservations", reservationRouter);
app.use("/vehicules", vehiculeRouter);
app.use("/payments", paymentRouter);

// Enable CORS for all routes

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Passes a 404 error to the next middleware
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
server.listen(5000, () => {
  console.log("App is running on port 5000");
});
