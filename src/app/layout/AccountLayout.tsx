import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faList,
  faCalendarCheck,
  faKey,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

interface AccountLayoutProps {
  children: ReactNode;
}

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faGear} /> General
      </h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/account'}
                  end
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ml-2">Mi cuenta</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/account/change-password'}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <span className="ml-2">Cambiar Contraseña</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/account/reviews'}
                >
                  <FontAwesomeIcon icon={faList} />
                  <span className="ml-2">Mis Reviews</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/account/bookings'}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <span className="ml-2"> Bookings </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8 animate__animated animate__fadeIn">{children}</div>
      </div>
    </div>
  );
};
