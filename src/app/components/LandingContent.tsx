import { Link } from 'react-router-dom';
import { Features, Stadistics, Testimonials } from '.';

interface BarberInfo {
  icon: string;
  title: string;
  description: string;
}

interface LandingContentProps {
  barberInfo: BarberInfo[];
}

export const LandingContent = ({ barberInfo }: LandingContentProps) => {
  return (
    <main>
      <Features features={barberInfo} />

      <section className="info">
        <h2> Elegancia y Clase </h2>
        <Link to={'/services'} className="btn btn-outline-light">
          Agenda una Cita
        </Link>
        <div className="wave-info">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,256L80,261.3C160,267,320,277,480,282.7C640,288,800,288,960,245.3C1120,203,1280,117,1360,74.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <Testimonials />

      <Stadistics />
    </main>
  );
};
