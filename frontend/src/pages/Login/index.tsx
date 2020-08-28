import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/auth';
import { Alert, Container, Form, FormActions } from './styles';

const Login: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const isValidLoginForm = useMemo(() => {
    return email && password;
  }, [email, password]);

  useEffect(() => {
    setLoginError('');
  }, [email, password]);

  function handleSignUp() {
    history.push('/signup');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      setLoginError('');
      setLoading(true);

      await login({ email, password });
      history.push('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError('E-mail e/ou senha incorretos.');
      } else {
        setLoginError('Não foi possível realizar o login.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <img src={logo} alt="Medicar" />

      {loginError && <Alert>{loginError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          label="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          type="password"
          name="password"
          label="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <FormActions>
          <Button variant="secondary" onClick={handleSignUp}>
            Criar Conta
          </Button>
          <Button type="submit" loading={loading} disabled={!isValidLoginForm}>
            Acessar
          </Button>
        </FormActions>
      </Form>
    </Container>
  );
};

export default Login;
