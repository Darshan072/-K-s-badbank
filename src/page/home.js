import React, { useContext } from "react"
import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../component/Header"
import Login from "../component/Login"
import { UserContext } from "../context/UserContex"

const Home = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <Container className="mt-4">
      <Card
        bg={"light"}
        text={"dark"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Welcome to the Bank</Card.Header>
        <Card.Body>
          <Card.Text>
            {user?.email ? (
              <h5>Thank you for banking with us, Kathryn.</h5>
            ) : (
              <h5>For all your banking needs.</h5>
            )}
          </Card.Text>
          {user?.email ? (
            <Card.Text>
              <Link to="/deposite">Make a deposit</Link> or
              <Link to="/withdraw"> withdraw</Link> funds now.
            </Card.Text>
          ) : (
            <Card.Text>
              <Link to="/createAccount">Create a new account</Link> or
              <Link to="/login"> log in</Link> to your account to begin.
            </Card.Text>
          )}

          <img src="./bank.png" width="100%" />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home
