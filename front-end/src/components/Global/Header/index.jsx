import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo } from './styles';
import { Container } from '../Container';
import { Cart } from '../../Buttons/CartIconButton';
import logo from '../../../assets/logo.svg';
import { IoLogOut } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <HeaderContainer>
      <Container>
        <nav>
          <Logo>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </Logo>

          <ul>
            {user ? (
              <>
                {user.type === 'cliente' ? (
                  <>
                    <li><Link to="/"><AiFillHome/></Link></li>
                    <li><Link to="/profile"><FaUser /></Link></li>
                    <li><Cart onClick={handleCartClick} /></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/backoffice">Backoffice</Link></li>
                  </>
                )}
                <li><button onClick={handleLogout}><IoLogOut /></button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Entrar</Link></li>
                <li><Link to="/register">Cadastrar</Link></li>
                <li><Cart onClick={handleCartClick} /></li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </HeaderContainer>
  );
}