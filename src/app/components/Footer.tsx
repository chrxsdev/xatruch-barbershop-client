export const Footer = () => {
  return (
    <footer>
      <section className="footer-links">
        <div className="row">
          <div className="col-lg-6">
            <div className="foot-info">
              <img
                className="foot-logo"
                src="/assets/img/recursos/xatruch-footer.svg"
                alt="logo-footer"
              />
              <p>
                Nombres comerciales, logotipos e imágenes comerciales que aparecen en nuestro sitio
                web son propiedad de sus respectivos dueños.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6 info-contacto">
                <h3> Soporte </h3>
                <ul className="list-links">
                  <li className="syle-font">
                    <a href="#home">Home</a>
                  </li>
                  <li className="syle-font">
                    <a href="#us">Nosotros</a>
                  </li>
                  <li className="syle-font">
                    <a href="#stadistics">Stats</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 info-contacto">
                <h3> Contactanos </h3>
                <ul className="list-links">
                  <li className="syle-font">
                    <a href="mailto:contacto@xatruchbarbershopo.com">
                      <img
                        className="img-contacto"
                        src="/assets/img/recursos/email.png"
                        alt="email"
                      />
                      hola@xatruchbarber.com
                    </a>
                  </li>
                  <li className="syle-font">
                    <img
                      className="img-contacto"
                      src="/assets/img/recursos/cel.png"
                      alt="cel"
                    />
                    +504 9898 8967
                  </li>

                  <li className="syle-font">
                    <img
                      className="img-contacto"
                      src="/assets/img/recursos/location.png"
                      alt="location"
                    />
                    772 Lyonwood Ave Comayagua, Honduras
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-info">
        <p>© {new Date().getFullYear()} Xatruch Barbershop. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
};
