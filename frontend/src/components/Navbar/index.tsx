import React from 'react';
import logo from '../../assets/logo.svg';
import Link from '../Link';
import { Container } from './styles';

const Navbar: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="Medicar" />

      <section>
        <span>Lucas Freitas</span>
        <Link href="/">Desconectar</Link>
      </section>
    </Container>
  );
};

export default Navbar;
