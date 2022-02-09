import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./page/home"
import { useState } from "react"
import { UserContext } from "./context/UserContex"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from "./component/Login"
import CreateAccount from "./component/CreateAccount"
import Header from "./component/Header"
import AllData from "./component/AllData"
import Withdraw from "./component/Withdraw"
import Deposit from "./component/Deposit"

function App() {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    balance: "",
    userList: [
      {
        name: "Kathryn",
        email: "kathyll@pretend.com",
        password: "secret12",
        balance: 1000,
      },
      {
        name: "Michael",
        email: "michael@pretend.com",
        password: "secret12",
        balance: 500,
      },
    ],
  })
  return (
    <Router>
      {/* <div className="App"> */}
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <div>
          {/* <Switch> */}
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/allData" component={AllData} exact />
          <Route path="/createAccount" component={CreateAccount} exact />
          <Route path="/withdraw" component={Withdraw} exact />
          <Route path="/deposit" component={Deposit} exact />
          {/* </Switch> */}
        </div>
      </UserContext.Provider>
      {/* </div> */}
    </Router>
  )
}

export default App
