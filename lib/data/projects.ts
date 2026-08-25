export type Project = {
  slug: string;
  name: string;
  location: string;
  category: "Obras Públicas" | "Obras Privadas" | "Estudios Geotécnicos" | "Laboratorio";
  description: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "estudio-geotecnico-via-cusco",
    name: "Estudio Geotécnico para Vía de Acceso",
    location: "Cusco",
    category: "Estudios Geotécnicos",
    description:
      "Exploración geotécnica y ensayos SPT para el mejoramiento de una vía de acceso interprovincial, incluyendo perfil estratigráfico y recomendaciones de diseño de pavimento.",
    image: "/images/proyectos/estudio-geotecnico-via-cusco.jpg",
  },
  {
    slug: "control-calidad-obra-publica-copesco",
    name: "Control de Calidad de Obra Vial",
    location: "Cusco",
    category: "Obras Públicas",
    description:
      "Servicios de laboratorio y control de calidad de materiales para obra vial ejecutada en convenio con Plan COPESCO Nacional.",
    image: "/images/proyectos/control-calidad-obra-publica-copesco.jpg",
  },
  {
    slug: "mecanica-suelos-edificacion-privada",
    name: "Estudio de Mecánica de Suelos para Edificación",
    location: "Cusco",
    category: "Obras Privadas",
    description:
      "Determinación de capacidad portante y recomendaciones de cimentación para proyecto de edificación multifamiliar en la ciudad de Cusco.",
    image: "/images/proyectos/mecanica-suelos-edificacion-privada.jpg",
  },
  {
    slug: "laboratorio-concreto-infraestructura",
    name: "Ensayos de Concreto para Infraestructura Pública",
    location: "Apurímac",
    category: "Laboratorio",
    description:
      "Diseño de mezcla y rotura de testigos de concreto para obra de infraestructura pública en convenio con el Gobierno Regional de Apurímac.",
    image: "/images/proyectos/laboratorio-concreto-infraestructura.jpg",
  },
  {
    slug: "estudio-geologico-canteras",
    name: "Estudio Geológico de Canteras",
    location: "Cusco",
    category: "Estudios Geotécnicos",
    description:
      "Evaluación geológica y caracterización de materiales de cantera para uso en obras viales y de edificación.",
    image: "/images/proyectos/estudio-geologico-canteras.jpg",
  },
  {
    slug: "supervision-obra-provias",
    name: "Supervisión de Obra Vial",
    location: "Madre de Dios",
    category: "Obras Públicas",
    description:
      "Acompañamiento técnico y control de calidad de materiales en el marco de proyectos viales supervisados junto a Provías Descentralizado.",
    image: "/images/proyectos/supervision-obra-provias.jpg",
  },
];

export const PROJECT_CATEGORIES = [
  "Todos",
  "Obras Públicas",
  "Obras Privadas",
  "Estudios Geotécnicos",
  "Laboratorio",
] as const;
