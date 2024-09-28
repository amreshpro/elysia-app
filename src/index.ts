import Elysia from "elysia";
import dotenv from "dotenv";
import user from "./data/user";
import swagger from "@elysiajs/swagger";
import { env } from "bun";
import { configDotenv } from "dotenv";
// load env variables
dotenv.config();
const port = process.env.PORT || 4567;
const app = new Elysia();

// middleware
app.use(swagger());

type UserType = {
  id: string;
  name: string;
};

app.get("/", {
  message:"Yes it Works",
  framework:"Elysia.js Backend"
});

app.get("/api/user", () => {
  user.push({ id: "4", name: "Jarvis" });
  return user;
});
app.post("/api/user", ({ body }: { body: UserType }) => {
  console.log(body);
  if (body) {
    user.push(body);
    return body;
  }
  return null;
});

app.delete("/api/user", ({ body }: { body: UserType }) => {
  const userIndex = user.reduce((res, userItem: UserType, index) => {
    if (userItem.id == body.id) {
      res = index;
    }
    return res;
  }, -1);

  user.splice(userIndex, 1);
});

app.listen(port, () => {
  console.log("server running on " + port);
});
