import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { useAuthStore, useCartStore } from '../../hooks';
import { authStatus } from '../../data/data';
import { alertInfo } from '../../helpers';

interface NavBarProps {
  isLanding?: boolean;
}

export const NavBar = ({ isLanding }: NavBarProps) => {
  const {
    user: { role },
    currentStatus,
    startLogout,
  } = useAuthStore();
  const navigate = useNavigate();

  const { cart } = useCartStore();

  const onLogout = () => {
    const logoutInfo = alertInfo('¿Seguro que desear cerrar sesión?', 'info', 'Salir');
    Swal.fire(logoutInfo).then((result) => {
      if (result.isConfirmed) {
        startLogout();
        navigate('/');
      }
    });
  };

  return (
    <div style={{ marginBottom: '90px' }}>
      <nav className="container-fluid navbar navbar-expand-lg nav-xatruch navbar-light bg-light pt-4 pb-4 fixed-top">
        <Link to="/" className="navbar-brand">
          <img src="/assets/img/icon.png" className="img-logo" alt="logo" />
          <span className="brand"> XATRUCH </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/** Show US & Stats Nav Items in Landing Only */}
            {isLanding && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#us">
                    Nosotros
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#stadistics">
                    Stats
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Servicios
              </Link>
            </li>
            {/** Options when User is Authenticated */}
            {currentStatus === authStatus[2] ? (
              <li className="nav-item">
                <NavLink className="nav-link" to={'/auth/signin'}>
                  Sign In
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Cuenta
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {role === 'ADMIN' && (
                      <Link className="dropdown-item" to="/settings">
                        Panel Admin
                      </Link>
                    )}
                    <Link className="dropdown-item" to="/account">
                      Mi Perfil
                    </Link>
                    <button
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={onLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </li>
                <li className={`nav-item ${cart.length === 0 ? 'd-none' : ''}`}>
                  <div className="cart">
                    <Link
                      className="nav-link"
                      to="/checkout/my-cart"
                      style={{ marginTop: '5px' }}
                    >
                      <div>
                        <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
                      </div>
                      <div className="badge cart-number-badge">{cart.length}</div>
                    </Link>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
