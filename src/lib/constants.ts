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
    name: 'Carlos M.',
    duration: '6 meses',
    description:
      'Perdió 18 kg de grasa corporal y aumentó notablemente su masa muscular siguiendo un plan de fuerza estructurado y déficit calórico flexible.',
    imageBefore: '/images/transformations/before-1.jpg',
    imageAfter: '/images/transformations/after-1.jpg',
  },
  {
    name: 'Ana R.',
    duration: '4 meses',
    description:
      'Consiguió una definición muscular visible y mejoró su rendimiento cardiovascular, reduciendo un 8% de grasa corporal de forma sostenible.',
    imageBefore: '/images/transformations/before-2.jpg',
    imageAfter: '/images/transformations/after-2.jpg',
  },
  {
    name: 'Miguel L.',
    duration: '4 meses',
    description:
      'Aumentó 6 kg de masa muscular limpia, optimizó su postura corporal y eliminó dolores lumbares crónicos gracias al trabajo de movilidad y fuerza.',
    imageBefore: '/images/transformations/before-3.JPG',
    imageAfter: '/images/transformations/after-3.JPEG',
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
    price: '$XX/mes',
    duration: '1 mes renovable',
    description: 'Ideal para quienes desean iniciar con guía profesional y probar la metodología de entrenamiento.',
    features: [
      'Rutina de entrenamiento personalizada',
      'Guía de pautas nutricionales y objetivos calóricos',
      'Acceso a biblioteca de ejercicios en video',
      'Revisión y ajuste quincenal de avances',
      'Soporte y resolución de dudas por chat',
    ],
    highlighted: false,
  },
  {
    id: 'completo',
    name: 'Completo',
    price: '$XXX',
    duration: '4-6 meses',
    description: 'Un proceso integral de transformación corporal diseñado para consolidar hábitos duraderos y resultados visibles.',
    features: [
      'Planificación de entrenamiento progresiva fase por fase',
      'Plan nutricional flexible adaptado a tu estilo de vida',
      'Evaluación semanal de peso, medidas y progreso',
      'Corrección biomecánica de técnica mediante video',
      'Soporte prioritario 24/7 vía WhatsApp',
      'Guía de suplementación deportiva basada en evidencia',
    ],
    highlighted: true,
    badge: '🔥',
  },
  {
    id: 'personalizado',
    name: 'Personalizado',
    price: 'A consultar',
    duration: 'Duración variable',
    description: 'Para objetivos muy específicos, preparaciones o requerimientos especiales adaptados a tus necesidades únicas.',
    features: [
      'Entrevista inicial profunda y valoración completa',
      'Planificación macrociclo a medida de tus objetivos',
      'Ajustes nutricionales de alta precisión y suplementación',
      'Monitoreo diario y feedback constante',
      'Llamadas de revisión 1 a 1 para seguimiento detallado',
    ],
    highlighted: false,
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2016',
    title: 'Grado en Ciencias de la Actividad Física y del Deporte',
    description: 'Graduación con mención especial en biomecánica aplicada y entrenamiento de fuerza para la salud.',
  },
  {
    year: '2018',
    title: 'Certificación Internacional NSCA-CPT',
    description: 'Acreditación por la National Strength and Conditioning Association como Entrenador Personal Certificado.',
  },
  {
    year: '2020',
    title: 'Especialización en Nutrición Deportiva y Composición Corporal',
    description: 'Formación de postgrado enfocada en manipulación de macronutrientes, déficit estratégico e hipertrofia.',
  },
  {
    year: '2022',
    title: 'Lanzamiento de Plataforma de Asesoramiento Online',
    description: 'Creación de un sistema integral de entrenamiento y nutrición que ha guiado a más de 200 clientes a sus metas.',
  },
  {
    year: '2024',
    title: 'Certificación Avanzada en Movilidad y Prevención de Lesiones',
    description: 'Especialización en optimización de patrones de movimiento articular y readaptación funcional.',
  },
];

export const STATS: Stat[] = [
  { value: 8, label: 'Años de Experiencia', suffix: '+' },
  { value: 200, label: 'Clientes Transformados', suffix: '+' },
  { value: 15, label: 'Certificaciones' },
  { value: 98, label: 'Tasa de Satisfacción', suffix: '%' },
];

export const TRAINER: Trainer = {
  name: 'Tu Nombre Aquí',
  title: 'Entrenador Personal Certificado',
  heroTagline: 'Transforma tu cuerpo, potencia tu salud y supera tus límites.',
  heroSubtitle: 'Programas de entrenamiento y nutrición basados en ciencia, diseñados a medida para resultados sostenibles y reales.',
  aboutIntro: 'Soy entrenador personal apasionado por guiar a las personas a alcanzar su versión más fuerte, saludable y segura. Con más de 8 años de experiencia, diseño programas adaptados al estilo de vida de cada cliente, sin dietas extremas ni rutinas imposibles.',
  aboutPhilosophy: 'Mi filosofía se basa en la consistencia por encima de la perfección. Entrenar de forma inteligente con una técnica impecable y una nutrición flexible es el único camino hacia una transformación que dura para siempre.',
  avatar: '/images/transformations/Foto de Angel_Entrenador.jpeg',
};
