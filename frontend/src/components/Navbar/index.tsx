import React, { useCallback } from 'react';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../context/auth';
import Link from '../Link';
import { Container } from './styles';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Container>
      <img src={logo} alt="Medicar" />

      <section>
        <span>{user?.name}</span>
        <Link onClick={handleLogout}>Desconectar</Link>
      </section>
    </Container>
  );
};

export default Navbar;
