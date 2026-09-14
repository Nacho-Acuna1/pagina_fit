export interface NavLink {
  label: string;
  href: string;
}

export interface Transformation {
  name: string;
  duration: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  detailedFeatures?: { title: string; text: string }[];
  highlighted: boolean;
  badge?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface Trainer {
  name: string;
  title: string;
  heroTagline: string;
  heroSubtitle: string;
  aboutIntro: string;
  aboutPhilosophy: string;
  avatar: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sobre Mí', href: '/sobre-mi' },
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    name: 'Joshef',
    duration: '1 meses',
    description:
      'Perdió 18 kg de grasa corporal y aumentó notablemente su masa muscular siguiendo un plan de fuerza estructurado y déficit calórico flexible.',
    imageBefore: '/images/transformations/before-1.jpg',
    imageAfter: '/images/transformations/after-1.jpg',
  },
  {
    name: 'Veronica',
    duration: '2 meses',
    description:
      'Consiguió una definición muscular visible y mejoró su rendimiento cardiovascular, reduciendo un 8% de grasa corporal de forma sostenible.',
    imageBefore: '/images/transformations/before-2.jpg',
    imageAfter: '/images/transformations/after-2.jpg',
  },
  {
    name: 'William',
    duration: '3 meses',
    description:
      'Expaciente bariátrico, bajo 8 kg de grasa, Sorprendiendo a sus medicos y familiares con sus resultados, mejorando su resistencia, aprendiendo a manejar su cuerpo con entrenamientos de fuerza en casa',
    imageBefore: '/images/transformations/before-3.JPG',
    imageAfter: '/images/transformations/after-3.JPEG',
  },
  {
    name: 'Alexis',
    duration: '4 meses',
    description:
      'Logró recomposición corporal, aumentando su fuerza en todos los ejercicios compuestos y perdiendo 5 kg de grasa, sin dejar de disfrutar sus comidas favoritas.',
    imageBefore: '/images/transformations/before-4.JPG',
    imageAfter: '/images/transformations/after-4.JPEG',
  },
  {
    name: 'Lucas',
    duration: '2 meses',
    description:
      'Transformación total de estilo de vida. Ganó 10 kg de masa muscular magra y cambió radicalmente su mentalidad hacia el entrenamiento a largo plazo.',
    imageBefore: '/images/transformations/before-5.PNG',
    imageAfter: '/images/transformations/after-5.PNG',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carlos Martínez',
    text: 'Entrenar con este programa cambió totalmente mi relación con el ejercicio y la comida. No solo alcancé mi mejor forma física en años, sino que aprendí a mantenerla para siempre.',
    rating: 5,
    avatar: '',
  },
  {
    name: 'Ana Rodríguez',
    text: 'El acompañamiento diario y la adaptación de las rutinas a mis horarios de trabajo marcaron la diferencia. Por primera vez logré resultados reales sin pasar hambre.',
    rating: 5,
    avatar: '',
  },
  {
    name: 'Roberto Gómez',
    text: 'Increíble profesionalismo. Los planes son 100% personalizados y basados en ciencia. Superé mis molestias de espalda y alcancé niveles de fuerza que nunca creí posibles.',
    rating: 5,
    avatar: '',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'mensual',
    name: 'Mensual',
    price: '$120/mes',
    duration: '1 mes renovable',
    description: 'Ideal para quienes requieren atencion 24hs y facilidad de pago',
    features: [
      'Atencion y seguimiento via Whatsapp las 24hs',
      'Rutina adaptativas en casa o gimnasio',
      'Videos para pulir tecnica en cada ejercicio',
      'Chequeo y ajuste semanal para resolver dudas y medir progreso',
      'Guia nutricional en base a tus gustos y facilidades',
    ],
    highlighted: false,
  },
  {
    id: 'completo',
    name: 'Completo',
    price: '$550',
    duration: '4-6 meses',
    description: 'Prioridad absoluta, Garantia de resultados.',
    features: [
      'Atencion y seguimiento via Whatsapp las 24hs',
      'Rutina adaptativas en casa o gimnasio',
      'Videos para pulir tecnica en cada ejercicio',
      'Chequeo y ajuste semanal para resolver dudas y medir progreso',
      'Guia nutricional en base a tus gustos y facilidades',
    ],
    highlighted: true,
    badge: '🔥',
  },
  {
    id: 'rutina-medida',
    name: 'Rutina Personalizada - Producto Digital',
    price: '$20',
    duration: 'Pago Único',
    description: 'La opción más accesible. Una rutina 100% individualizada y adaptada a tu cuerpo, herramientas y disponibilidad de tiempo.',
    features: [],
    detailedFeatures: [
      {
        title: 'Compras',
        text: 'Adqueris la rutina y guia nutricional por un pago unico'
      },
      {
        title: 'Me contas sobre vos',
        text: 'Despues de la compra, completas tus datos como objetivo, nivel, disponibilidad de tiempo y todo lo necesario para diseñar tu entrenamiento'
      },
      {
        title: 'Recibis tu rutina',
        text: 'Te llega la rutina a tu correo electronico en un plazo de 1-3 dias.'
      },
      {
        title: 'Empezas a entrenar',
        text: 'Segui la rutina y disfruta de tus resultados.'
      }
    ],
    highlighted: false,
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2019',
    title: 'Grado en Ciencias de la Actividad Física y del Deporte',
    description: 'Graduación con mención especial en biomecánica aplicada y entrenamiento de fuerza para la salud.',
  },
  {
    year: '2021',
    title: 'Certificación Internacional NSCA-CPT',
    description: 'Acreditación por la National Strength and Conditioning Association como Entrenador Personal Certificado.',
  },
  {
    year: '2024',
    title: 'Especialización en Nutrición Deportiva y Composición Corporal',
    description: 'Formación de postgrado enfocada en manipulación de macronutrientes, déficit estratégico e hipertrofia.',
  },
  {
    year: '2025',
    title: 'Lanzamiento de Plataforma de Asesoramiento Online',
    description: 'Creación de un sistema integral de entrenamiento y nutrición que ha guiado a más de 200 clientes a sus metas.',
  },
  {
    year: '2025',
    title: 'Certificación Avanzada en Movilidad y Prevención de Lesiones',
    description: 'Especialización en optimización de patrones de movimiento articular y readaptación funcional.',
  },
];

export const STATS: Stat[] = [
  { value: 6, label: 'Años de Experiencia', suffix: '+' },
  { value: 100, label: 'Clientes Transformados', suffix: '+' },
  { value: 5, label: 'Certificaciones' },
  { value: 98, label: 'Tasa de Satisfacción', suffix: '%' },
];

export const TRAINER: Trainer = {
  name: 'Angel Castillo',
  title: 'Entrenador Personal Certificado',
  heroTagline: 'Tu me traes la voluntad, yo te traigo el camino.',
  heroSubtitle: 'Mi objetivo no es simplemente darte un atajo para cambiar tu físico. Quiero enseñarte a entender tu entrenamiento y tu alimentación para que puedas mantener ese cambio durante toda tu vida',
  aboutIntro: 'Mi objetivo no es simplemente darte un atajo para cambiar tu físico. Quiero enseñarte a entender tu entrenamiento y tu alimentación para que puedas mantener ese cambio durante toda tu vida',
  aboutPhilosophy: 'Mi filosofía se basa en la consistencia por encima de la perfección. Entrenar de forma inteligente con una técnica impecable y una nutrición flexible es el único camino hacia una transformación que dura para siempre.',
  avatar: '/images/transformations/Foto de Angel_Entrenador.jpeg',
};

export interface TargetAudience {
  title: string;
  description: string;
}

export const TARGET_AUDIENCE: TargetAudience[] = [
  {
    title: 'Personas Comprometidas',
    description: 'Personas que entrenan y están listas para crear masa muscular magra aprendiendo a alimentar y trabajar su cuerpo al 100%'
  },
  {
    title: 'De todos los niveles',
    description: 'Personas de nivel intermedio en el gym o en casa que necesitan estructura y planificación, sin complicaciones.'
  },
  {
    title: 'Listos para avanzar sin improvisar',
    description: 'Cualquiera que esté estancado en sus progresos o cansado de hacer entrenamientos al azar y sin una dirección clara.'
  }
];
