import React, { useContext, useState } from "react"
import { Container, Alert, Button, Card, Form } from "react-bootstrap"
import { UserContext } from "../context/UserContex"

const CreateAccount = () => {
  const [user, setUser] = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    if (password.length < 8) {
      return setError(
        "Error! Password must be at least 8 characters in length."
      )
    }

    let userDetails = user.userList.filter(
      (user) => user.email === email && user.password === password
    )

    if (userDetails.length === 0) {
      setIsSuccess(true)
      userDetails = {
        name,
        email,
        password,
        balance: 100,
      }
      const cloneUser = { ...user }
      cloneUser.userList.push(userDetails)
      setUser(cloneUser)
      setIsSubmited(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } else {
      setError("Error! Account already exists.")
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setError("")
    if (name === "email") {
      setEmail(value)
    }
    if (name === "name") {
      setName(value)
    } else {
      //   setPassword(value)
    }
  }
  return (
    <Container className="pt-4">
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {isSuccess && (
        <Alert variant={"success"}>
          Success! In order to use this account you must now log in.
        </Alert>
      )}

      {user?.email ? (
        <Card
          bg={"danger"}
          text={"white"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Header>Create an Account</Card.Header>
          <Card.Body>
            <Card.Text>
              In order to use this feature you must first log out of the current
              account.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          bg={"primary"}
          text={"white"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Header>Create Account</Card.Header>
          {isSubmited ? (
            <Card.Body>
              <Card.Text> Use this form to create a new account.</Card.Text>
              <Button variant="light" onClick={() => setIsSubmited(false)}>
                Add Another Account
              </Button>
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Text> Use this form to create a new account.</Card.Text>
              <Card.Text>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={name}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
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
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <Button variant="info" onClick={handleSubmit}>
                    Create Account
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          )}
        </Card>
      )}
    </Container>
  )
}

export default CreateAccount
