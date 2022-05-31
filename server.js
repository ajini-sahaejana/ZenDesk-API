// MongoDB
require("./config/db");

const app = require("express")();
const port = process.env.PORT || 3000;

// For accepting post form data
const bodyParser = require("express").json;
app.use(bodyParser());

app.listen(port, () => {
  console.log("Server running on port", port);
  console.log("Database_URL", process.env.MONGODB_URI);
});

//ROUTES

// const AuthRouter = require("./routes/auth");
// app.use("/auth", AuthRoute);

const UserRouter = require("./routes/user");
app.use("/user", UserRouter);

const CompanyRouter = require("./routes/company");
app.use("/company", CompanyRouter);

const WellbeingRouter = require("./routes/wellbieng");
app.use("/wellbeing", WellbeingRouter);

const EventRouter = require("./routes/event");
app.use("/event", EventRouter);
