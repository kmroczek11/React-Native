const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.users = [];
    this.userId = 0
    this.initApp();
  }

  initApp() {
    this.app.use(express.json());
    this.app.listen(3000, () => console.log("Listening on port 3000!"));

    this.app.post("/", (req, res) => {
      if (this.checkIfUserExists(req.body.login)) {
        res.send({ status: "exists" });
      } else if(this.checkEmptyFields(req.body.login, req.body.password)){
        res.send({ status: "empty" });
      }
      else {
        this.users.push({ id: this.userId, login: req.body.login, password: req.body.password });
        this.userId++
        console.log("Users after adding: ", this.users);
        res.send({ status: "ok", users: this.users });
      }
    });

    this.app.post("/deleteUser", (req, res) => {
        this.deleteUser(req.body.id)
        console.log("Users after deleting: ", this.users);
        res.send({ users: this.users });
      });
  }

  deleteUser(id){
      for (let i = 0; i < this.users.length; i++){
          if (this.users[i].id == id){
              this.users.splice(i, 1)
              break
          }
      }
  }

  checkEmptyFields(login, password) {
    if (login == "" || password == "") return true;
    return false;
  }

  checkIfUserExists(login) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].login == login) {
        return true;
      }
    }
    return false;
  }
}

const server = new Server();
