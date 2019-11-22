import React, {useState } from "react";
import { Container, Form, Row, Col, Input, Button, Label } from "reactstrap";
import {Link} from "react-router-dom"

const LoginPage = (props) => {
  const login = async (e, username, password) => {
    e.preventDefault()  
    let jsonRaw = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    
    let message = await jsonRaw.json()

    if (message.error) {
      setStatusMessage('Användarnamn eller lösenord är fel')
    } else {
      setStatusMessage(`Inloggad som ${message.username} - (${message.role})`)
      props.history.push('/')
    }
    props.loginHandler()
  }
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [statusMessage, setStatusMessage] = useState('')


return (
  <Container fluid={true} className="login-container">
    <Form onSubmit={(e) => login(e, usernameValue, passwordValue)}>
      <Row>
        <Col sm="12"  md={{ size: 6, offset: 3 }}>
        <h1 className="text-center">Logga in</h1>
        </Col>
      </Row>
      <Row className="input-field">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Label  className="floating-label" for="exampleUsername">Användarnamn</Label>
          <Input
          autoComplete="username" onChange={(e) => setUsernameValue(e.target.value)} name="username" placeholder="Användarnamn" type="username" required={true} 
          ></Input>
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Label className="floating-label" for="examplePassword">Lösenord</Label>
          <Input 
         autoComplete="current-password" onChange={(e) => setPasswordValue(e.target.value)} name="password" placeholder="Lösenord" type="password" required={true}
         ></Input>
           <p> {statusMessage} </p>
        </Col>
        <Col sm="3" md={{ size: 6, offset: 3 }} >
      <Link  className="float-right" to="/">glömt lösenord?</Link>
      </Col>
      </Row>

      <Row className="button-field">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
        <Button className="login" name="submit" value="Logga in" type="submit" >Logga in</Button>
        </Col>
      </Row>
    </Form>

    <Row className="link-field">
      <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
      <p  className="no-account" to="/">Har ej ett konto?</p>
      </Col>
      <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
      <Link  className="register" to="/registrera">Registrera</Link>
      </Col>
      <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
      <Link  className="" to="/vanliga-fragor">Frågor och svar</Link>
      </Col>
    </Row>
    </Container>
    
  );
}
export default LoginPage;
