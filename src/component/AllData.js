import React, { useContext } from "react"
import { Card, Container, Table } from "react-bootstrap"
import { UserContext } from "../context/UserContex"

const AllData = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>All Data</Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {user.userList.map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{`$${user.balance}`}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AllData
