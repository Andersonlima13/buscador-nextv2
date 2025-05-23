'use client';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
  height: 100vh;
  background: #475d62 url('/img/star-sky.jpg');
  background-size: cover;
  position: relative;
`;

const Form = styled.form`
  max-width: 320px;
  width: 90%;
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
`;

const Illustration = styled.div`
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #2980ef;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
`;

const Button = styled.button`
  background: #214a80;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;
  width: 100%;

  &:hover {
    background: #1a3b66;
  }
`;

const Footer = styled.div`
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  margin-top: 20px;

  &:hover {
    opacity: 1;
  }
`;

export default function Login() {
  return (
    <Container>
      <Form method="post">
      <h2 className="d-flex justify-content-center text-light">Login</h2>
        <Illustration>
          <i className="icon ion-ios-locked-outline"></i>
        </Illustration>
        <div className="form-group">
          <Input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <Input type="password" name="password" placeholder="Senha" required />
        </div>
        <div className="form-group">
          <Button className='text-light' type="submit">Log In</Button>
        </div>
        <Footer className='text-light'>
          Direitos Reservados, <b>Colégio Vila</b>
        </Footer>
      </Form>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
      />
    </Container>
  );
}
