export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "importancia-estudio-suelos-antes-construir",
    title: "¿Por qué es indispensable un estudio de suelos antes de construir?",
    excerpt:
      "Un estudio de mecánica de suelos permite conocer la capacidad portante del terreno y prevenir fallas estructurales costosas. Te explicamos por qué es el primer paso en cualquier proyecto.",
    category: "Artículo Técnico",
    date: "2026-05-12",
    readTime: "6 min",
    image: "/images/blog/estudio-suelos.jpg",
  },
  {
    slug: "normativa-e050-suelos-cimentaciones",
    title: "Guía práctica de la Norma E.050 Suelos y Cimentaciones",
    excerpt:
      "Repasamos los requisitos clave que exige la normativa peruana vigente para estudios de suelos con fines de cimentación en proyectos de edificación e infraestructura.",
    category: "Normativa",
    date: "2026-04-03",
    readTime: "8 min",
    image: "/images/blog/normativa-e050.jpg",
  },
  {
    slug: "control-calidad-pavimentos-viga-benkelman",
    title: "Control de calidad de pavimentos con la Viga Benkelman",
    excerpt:
      "Explicamos cómo este ensayo permite evaluar la capacidad estructural de un pavimento en servicio y su relevancia en la gestión vial.",
    category: "Innovación",
    date: "2026-02-18",
    readTime: "5 min",
    image: "/images/blog/viga-benkelman.jpg",
  },
  {
    slug: "pro-ingema-nuevos-proyectos-2026",
    title: "PRO INGEMA amplía su cartera de proyectos geotécnicos en la región sur",
    excerpt:
      "Contamos los nuevos convenios y proyectos que PRO INGEMA S.A.C. viene desarrollando junto a entidades públicas y privadas durante este año.",
    category: "Noticias Empresariales",
    date: "2026-01-20",
    readTime: "4 min",
    image: "/images/blog/nuevos-proyectos.jpg",
  },
];
