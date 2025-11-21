import { ReactNode } from 'react';
import {
  faCalendarCheck,
  faList,
  faTableColumns,
  faTag,
  faUserGear,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faTableColumns} /> Panel
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
                  to={'/settings'}
                  end
                >
                  <FontAwesomeIcon icon={faWrench} />
                  <span className="ml-2">Settings</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/settings/barbers'}
                >
                  <FontAwesomeIcon icon={faUserGear} />
                  <span className="ml-2">Barberos</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/settings/services'}
                >
                  <FontAwesomeIcon icon={faTag} />
                  <span className="ml-2">Servicios</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/settings/reviews'}
                >
                  <FontAwesomeIcon icon={faList} />
                  <span className="ml-2">Reviews</span>
                </NavLink>
              </li>
              <li className="list-group-item p-0">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-sidebar btn-block rounded-0 shadow-none ${isActive ? 'side-active' : ''}`
                  }
                  to={'/settings/bookings'}
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
