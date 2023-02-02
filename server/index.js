const express = require("express");
const app = express();
app.use(express.json());

//.env path
const path = require("path");
const dotenv = require("dotenv");
const root_dir = __dirname.split("src")[0];
dotenv.config({ path: path.join(root_dir, `.env`) });

//db
const connectDB = require("./config/db");
connectDB();

// cors
const cors = require("cors");
// const whitelist = [
//   "http://127.0.0.1:3000",
//   "http://localhost:3000",
//   "http://localhost:3000/",
// ];
// const corsOptions = {
//   origin(origin, callback) {
//     if (!origin) {
//       return callback(null, true);
//     }
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   allowedHeaders: "*",
//   "Access-Control-Request-Headers": "*",
// };
// app.use(cors(corsOptions));
app.use(cors());

app.get("/status", (req, res) => {
  res.json({ status: "Alive" });
});

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

app.post("/todo/new", (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    console.log("from server");
    todo.save();
    res.status(200).json(todo);
  } catch (err) {
    console.log("error found");
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json(result);
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
