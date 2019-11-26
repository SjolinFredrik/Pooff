import React, { useState } from "react"
import { Container, Form, Row, Col, Input, Button, Label } from "reactstrap"
import { Link, useHistory } from "react-router-dom"

import { usePooff } from "../../context"

const LoginPage = () => {
  const state = usePooff()
  // Force login route to go through to / route when
  // you push the login button 
  const history = useHistory()

  const checkIfActive = async username => {
    let user = await fetch(`/api/active/${username}`)
    console.log(user)
    user = await user.json()
    console.log(user)
    return user
  }

  const login = async (e, username, password) => {
    e.preventDefault()

    const user = await checkIfActive(username)

    if (user.active) {
      let jsonRaw = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      let message = await jsonRaw.json()

      if (message.error) {
        setStatusMessage("Användarnamn eller lösenord är fel")
      } else {
        /* setStatusMessage(`Inloggad som ${message.username} - (${message.role})`)
        props.history.push("/") */
        const fetchedUser = await fetch("/api/myuser")
        const user = await fetchedUser.json()
        const fetchedBalance = await fetch('/api/mytransactions/balance')
        const balanceObj = await fetchedBalance.json()
        user.balance = balanceObj.balance
        state.setLoggedIn(user)

        if (user.role === "parent") {
          const fetchedChildren = await fetch("api/mychildren")
          const children = await fetchedChildren.json()
          state.setChildren(children)
        }

        history.push('/')
      }
      
      
    }
    else if (user.error === "error") {
      setStatusMessage(
        "Kunde inte hitta konto",
      )
    }
    
    
    else {
      console.log(user.error)
      setStatusMessage(
        "Ditt konto är inte aktiverat. Ett mail har skickats till dig ifall du vill aktivera det",
      )
      await fetch("api/send", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          type: "activate",
          email: user.email,
        }),
      })
    }
  }
  const [usernameValue, setUsernameValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  return (
    <Container fluid={true} className="login-container no-gutters">
      <h2 className="page-title">Logga in</h2>
      <Form onSubmit={e => login(e, usernameValue, passwordValue)}>
        
        <Row className="input-field no-gutters">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Label className="floating-label" for="exampleUsername">
              Användarnamn
            </Label>
            <Input
              autoComplete="username"
              onChange={e => setUsernameValue(e.target.value)}
              name="username"
              placeholder="Användarnamn"
              type="username"
              required={true}
            ></Input>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Label className="floating-label" for="examplePassword">
              Lösenord
            </Label>
            <Input
              autoComplete="current-password"
              onChange={e => setPasswordValue(e.target.value)}
              name="password"
              placeholder="Lösenord"
              type="password"
              required={true}
            ></Input>
            <p> {statusMessage} </p>
          </Col>
          <Col sm="3" md={{ size: 6, offset: 3 }}>
            <Link className="float-right" to="/aterstall-losenord">
              glömt lösenord?
            </Link>
          </Col>
        </Row>
        <Row className="button-field no-gutters">
          <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
            <Button
              className="login primary-btn"
              name="submit"
              value="Logga in"
              type="submit"
            >
              Logga in
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="link-field">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          {/* <Link className="no-account" to="/"> */}
            <p>Har ej ett konto?</p>
          {/* </Link> */}
        </Col>
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Link className="register" to="/registrera">
            Skapa konto
          </Link>
        </Col>
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Link className="" to="/vanliga-fragor">
            Frågor och svar
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
export default LoginPage
