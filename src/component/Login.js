import React, { useContext, useState } from "react"
import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import { UserContext } from "../context/UserContex"

const Login = () => {
  const [user, setUser] = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    const userDetails = user.userList.filter(
      (user) => user.email === email && user.password === password
    )
    if (userDetails.length > 0) {
      setIsSuccess(true)
      setUser({
        ...user,
        name: userDetails[0].name,
        email: userDetails[0].email,
        password: userDetails[0].password,
        balance: Number(userDetails[0].balance),
      })
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } else {
      setError(true)
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setError(false)
    if (name === "email") {
      setEmail(value)
    } else {
      //   setPassword(value)
    }
  }

  const handleLogout = () => {
    setUser({
      ...user,
      name: "",
      password: "",
      email: "",
      balance: "",
    })
  }
  return (
    <Container className="pt-4">
      {error && (
        <Alert variant={"danger"}>
          Error! Email or password does not match the accounts on file.
        </Alert>
      )}
      {isSuccess && (
        <Alert variant={"success"}>Success! You successfully logged in.</Alert>
      )}
      <Card
        bg={"primary"}
        text={"white"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Log In</Card.Header>
        {user?.email ? (
          <Card.Body>
            <Card.Text>
              Please use the button below to log out when you are done banking.
            </Card.Text>
            <Button variant="light" onClick={() => handleLogout()}>
              Log out
            </Button>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Text>
              Use this form to login in to your existing account.
            </Card.Text>
            <Card.Text>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="info" onClick={handleSubmit}>
                  Login
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </Container>
  )
}

export default Login
