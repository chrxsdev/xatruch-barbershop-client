import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header id="home">
      <div className="container-fluid">
        <div className="row header-container">
          <div className="col-md-6 head-text-section">
            <h1>Barbería como forma de arte.</h1>
            <p className="header-text">
              {' '}
              Cada dia muchas personas confían en nosotros, <br />
              saben que nos tomamos el corte de cabello muy en serio.{' '}
            </p>
            <Link to={'/services'} className="btn btn-dark contact-us">
              Ver Servicios
            </Link>
          </div>
          <div className="col-md-6 images-home">
            <img className="men" src="/assets/img/home.png" alt="hombre" />
          </div>
        </div>
      </div>
    </header>
  );
};
