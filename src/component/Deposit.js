import React, { useContext, useState } from "react"
import { Alert, Button, Card, Container, Form } from "react-bootstrap"
import { UserContext } from "../context/UserContex"

const Deposit = () => {
  const [user, setUser] = useContext(UserContext)

  const [email, setEmail] = useState(user?.email || "")
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)

  const handleSubmit = (e) => {
    if (user?.email) {
      if (amount < 0) {
        return setError("Error! You must deposit an amount greater than $0.")
      }

      const newUserList = []

      user.userList.map((item) => {
        if (item.email === user.email && item.password === user.password) {
          item.balance = Number(user.balance) + Number(amount)
          newUserList.push(item)
        } else {
          newUserList.push(item)
        }
      })

      setIsSuccess(true)
      setUser({
        ...user,
        balance: Number(user.balance) + Number(amount),
        userList: newUserList,
      })
      setIsSubmited(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } else {
      setError("Do Login.")
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setError("")
    setAmount(value)
  }

  return (
    <Container className="pt-4">
      {error && <Alert variant={"danger"}>{error}</Alert>}
      {isSuccess && (
        <Alert variant={"success"}>
          Success! You successfully deposit money from your account.
        </Alert>
      )}
      {user?.email ? (
        <Card
          bg={"primary"}
          text={"white"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Header>Deposit</Card.Header>
          {isSubmited ? (
            <Card.Body>
              <Card.Text>Balance: $ {user?.balance || 0}</Card.Text>
              <Button variant="light" onClick={() => setIsSubmited(false)}>
                Make Another Deposit
              </Button>
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Text>Balance: $ {user?.balance || 0}</Card.Text>
              <Card.Text>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Amount </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Amount"
                      name="amount"
                      value={amount}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>

                  <Button variant="info" onClick={handleSubmit}>
                    Deposit
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          )}
        </Card>
      ) : (
        <Card
          bg={"secondary"}
          text={"white"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Header>Deposite</Card.Header>
          <Card.Body>
            <Card.Text>
              In order to use this feature you must be logged in.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default Deposit
