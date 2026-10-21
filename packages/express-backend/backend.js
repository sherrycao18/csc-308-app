import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error.");
    });
});

app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params["id"])
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((addedUser) => res.status(201).send(addedUser))
    .catch((error) => {
      console.log(error);
      res.status(400).send("Invalid user data.");
    });
});

app.delete("/users/:id", (req, res) => {
  userServices
    .deleteUserById(req.params["id"])
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
