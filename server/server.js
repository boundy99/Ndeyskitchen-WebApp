const express = require("express");
const userRoutes = require("./routes/users");
const DBConnection = require("./database/DBConnect.js");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({mssg: "Welcome"});
});

//routes
app.use("/api/users", userRoutes);

//app.get("/api/users", userRoutes);
app.post("/api/users", userRoutes);

if (DBConnection) {
  app.listen(process.env.PORT, () => {
    console.log("Server is listenning on port", process.env.PORT);
  });
}
