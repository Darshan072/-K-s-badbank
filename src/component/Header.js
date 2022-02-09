import React, { useContext, useState } from "react"
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContex"

const Header = () => {
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
        balance: userDetails[0].balance,
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

  const linkStyle = {
    textDecoration: "none",
    hover: {
      color: "red",
    },
  }

  return (
    <Navbar
      className="px-3"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <>
        <Link className="nav-links" style={linkStyle} to="/">
          <Navbar.Brand className="nav-links">
            {user?.name ? `Welcome, ${user.name}` : "Home"}
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link style={linkStyle} to="/login">
              <Nav.Link className="nav-links" href="/login">
                Log In
              </Nav.Link>
            </Link>
            <Link style={linkStyle} to="/createAccount">
              <Nav.Link className="nav-links" href="/createAccount">
                Create Account
              </Nav.Link>
            </Link>
            <Link style={linkStyle} to="/deposit">
              <Nav.Link className="nav-links" href="/deposit">
                Deposite
              </Nav.Link>
            </Link>
            <Link style={linkStyle} to="/withdraw">
              <Nav.Link className="nav-links" href="/withdraw">
                Withdraw
              </Nav.Link>
            </Link>
            <Link style={linkStyle} to="/allData">
              <Nav.Link className="nav-links" href="/allData">
                All Data
              </Nav.Link>
            </Link>
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">
              <input />
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
          {user?.email ? (
            <Button variant="warning" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </>
    </Navbar>
  )
}

export default Header
