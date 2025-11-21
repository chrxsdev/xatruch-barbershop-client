import type { AuthStatus } from '../types/entities';

export const authStatus: AuthStatus[] = ['checking', 'authenticated', 'not-authenticated'];

interface BarberInfo {
  icon: string;
  title: string;
  description: string;
}

export const barberInfo: BarberInfo[] = [
  {
    icon: 'icon_01',
    title: 'Creamos tendencias',
    description: 'Analizamos y estudiamos cada estilo de cabello y barba, con el fin de crear unos totalmente nuevos para dar mas alternativas a nuestros clientes.',
  },
  {
    icon: 'icon_02',
    title: 'Clase, nuestra prioridad',
    description: 'El pilar fundamental del negocio es el trato especial a nuestros clientes dandoles una experiencia totalmente completa, con clase, al mas puro estilo inglés.',
  },
  {
    icon: 'icon_03',
    title: 'Creamos tendencias',
    description: 'Tu cabello estará en las mejores manos, nunca mejor dicho. Contamos con los mejores estilistas de la zona, profesionales con años de experiencia.',
  },
];

interface ReviewData {
  id: number;
  icon: string;
  title: string;
  review: string;
  user: string;
}

export const reviews: ReviewData[] = [
  {
    id: 1,
    icon: 'Cliente1',
    title: 'Flexibilidad y adaptabilidad...',
    review:
      'La versatilidad en la que se ajustan a las necesidades y estilo personal, realmente hace que ofrezcan un servicio exclusivo acorde a lo que buscas. Sin olvidar las asesorias, una JOYA. Ellos tienen en cuenta tus gustos y las adaptan a las tendencias actuales. ¿El resultado? Una obra de arte en el hairstyle.',
    user: 'Rolando Mejia',
  },
  {
    id: 2,
    icon: 'Cliente2',
    title: 'Hacen del corte una experiencia...',
    review:
      'Nunca antes me habia sentido parte de una experiencia de estilo y clase en otra barberia. Sin duda "Xatruch Barbershop" marca la diferencia y se posiciona como la barberia lider de la zona. Soy cliente caballero, pero sin duda alguna voy a convertirme en Rey Arturo y vivir una experiencia aun mas poderosa.',
    user: 'Ángel Martínez',
  },
  {
    id: 3,
    icon: 'Cliente3',
    title: 'La barberia artistica...',
    review:
      'Llevo un par de años siendo cliente de "Xatruch", realmente en cada visita es como visitar un museo, un concierto... La clase con la que cortan el cabello y barba, la dedicacion que hay cuando le pides asesoramiento es sin dua alguna MARAVILLOSA.',
    user: 'Carlos Ríos',
  },
];
