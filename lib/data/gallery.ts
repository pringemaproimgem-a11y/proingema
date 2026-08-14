export type GalleryCategory = "Calicatas" | "Densidad de campo" | "Obras viales";

export type FieldPhotoPlacement =
  | "home-hero"
  | "home-about"
  | "service-geotechnical"
  | "service-field-tests"
  | "geotechnics"
  | "projects";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  image: string;
  orientation: "landscape" | "portrait";
  placements?: FieldPhotoPlacement[];
};

export const GALLERY_CATEGORIES = [
  "Todos",
  "Calicatas",
  "Densidad de campo",
  "Obras viales",
] as const;

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "calicata-interior-01",
    category: "Calicatas",
    caption: "Exploración del subsuelo en una edificación",
    alt: "Especialista registrando una calicata abierta dentro de una edificación",
    image: "/images/field-work/calicata-interior-01.jpg",
    orientation: "portrait",
  },
  {
    id: "calicata-via-urbana-01",
    category: "Calicatas",
    caption: "Preparación de una calicata en vía urbana",
    alt: "Área señalizada para la ejecución de una calicata en una vía urbana",
    image: "/images/field-work/calicata-via-urbana-01.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-via-urbana-02",
    category: "Calicatas",
    caption: "Medición de calicata en vía urbana",
    alt: "Especialista de PRO INGEMA midiendo una calicata abierta en una vía urbana",
    image: "/images/field-work/calicata-via-urbana-02.jpg",
    orientation: "landscape",
    placements: ["service-geotechnical", "geotechnics"],
  },
  {
    id: "calicata-via-urbana-03",
    category: "Calicatas",
    caption: "Registro técnico de excavación urbana",
    alt: "Técnico registrando las dimensiones de una excavación geotécnica urbana",
    image: "/images/field-work/calicata-via-urbana-03.jpg",
    orientation: "landscape",
    placements: ["projects"],
  },
  {
    id: "calicata-via-urbana-04",
    category: "Calicatas",
    caption: "Inspección de calicata profunda",
    alt: "Especialista inspeccionando una calicata profunda junto a una vía local",
    image: "/images/field-work/calicata-via-urbana-04.jpg",
    orientation: "landscape",
    placements: ["geotechnics"],
  },
  {
    id: "calicata-via-urbana-05",
    category: "Calicatas",
    caption: "Verificación de profundidad en vía local",
    alt: "Medición de profundidad en una calicata señalizada sobre una vía local",
    image: "/images/field-work/calicata-via-urbana-05.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-local-comercial-01",
    category: "Calicatas",
    caption: "Estudio de suelos para infraestructura comercial",
    alt: "Técnico midiendo una excavación para un estudio de mecánica de suelos",
    image: "/images/field-work/calicata-local-comercial-01.jpg",
    orientation: "landscape",
    placements: ["geotechnics"],
  },
  {
    id: "calicata-vivienda-rural-01",
    category: "Calicatas",
    caption: "Exploración geotécnica en entorno rural",
    alt: "Equipo técnico ejecutando varias calicatas en un valle andino",
    image: "/images/field-work/calicata-vivienda-rural-01.jpg",
    orientation: "landscape",
    placements: ["home-hero", "geotechnics"],
  },
  {
    id: "calicata-local-comercial-02",
    category: "Calicatas",
    caption: "Medición vertical de excavación",
    alt: "Especialista midiendo verticalmente una excavación para estudio de suelos",
    image: "/images/field-work/calicata-local-comercial-02.jpg",
    orientation: "portrait",
  },
  {
    id: "calicata-institucion-01",
    category: "Calicatas",
    caption: "Reconocimiento de terreno para infraestructura pública",
    alt: "Especialista registrando una calicata para una obra de infraestructura pública",
    image: "/images/field-work/calicata-institucion-01.jpg",
    orientation: "landscape",
    placements: ["geotechnics"],
  },
  {
    id: "calicata-infraestructura-deportiva-01",
    category: "Calicatas",
    caption: "Calicata en área de infraestructura deportiva",
    alt: "Técnico midiendo una excavación geotécnica en un área deportiva",
    image: "/images/field-work/calicata-infraestructura-deportiva-01.jpg",
    orientation: "portrait",
    placements: ["projects"],
  },
  {
    id: "calicata-vivienda-rural-02",
    category: "Calicatas",
    caption: "Registro de excavación para vivienda",
    alt: "Especialista documentando una calicata para un proyecto de vivienda rural",
    image: "/images/field-work/calicata-vivienda-rural-02.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-vivienda-rural-03",
    category: "Calicatas",
    caption: "Trabajo simultáneo de exploración del terreno",
    alt: "Equipo de campo ejecutando calicatas simultáneas en un terreno rural",
    image: "/images/field-work/calicata-vivienda-rural-03.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-via-urbana-06",
    category: "Calicatas",
    caption: "Señalización previa a exploración urbana",
    alt: "Zona de trabajo delimitada antes de ejecutar una calicata en vía urbana",
    image: "/images/field-work/calicata-via-urbana-06.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-via-urbana-07",
    category: "Calicatas",
    caption: "Registro de calicata junto a una vía",
    alt: "Especialista tomando medidas de una calicata profunda junto a una vía urbana",
    image: "/images/field-work/calicata-via-urbana-07.jpg",
    orientation: "portrait",
    placements: ["geotechnics"],
  },
  {
    id: "calicata-planta-concreto-01",
    category: "Calicatas",
    caption: "Exploración para infraestructura de concreto",
    alt: "Técnico midiendo una calicata en un terreno destinado a infraestructura",
    image: "/images/field-work/calicata-planta-concreto-01.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-institucion-02",
    category: "Calicatas",
    caption: "Control dimensional de excavación institucional",
    alt: "Especialista verificando el ancho de una excavación geotécnica institucional",
    image: "/images/field-work/calicata-institucion-02.jpg",
    orientation: "landscape",
  },
  {
    id: "calicata-planta-concreto-02",
    category: "Calicatas",
    caption: "Medición de calicata en terreno abierto",
    alt: "Técnico verificando la profundidad de una calicata en un terreno abierto",
    image: "/images/field-work/calicata-planta-concreto-02.jpg",
    orientation: "landscape",
    placements: ["projects"],
  },
  {
    id: "calicata-planta-concreto-03",
    category: "Calicatas",
    caption: "Inspección de estratos en excavación",
    alt: "Especialista inspeccionando los estratos visibles en una calicata de terreno rural",
    image: "/images/field-work/calicata-planta-concreto-03.jpg",
    orientation: "landscape",
  },
  {
    id: "densidad-via-vimpampa-01",
    category: "Densidad de campo",
    caption: "Ensayo de densidad con cono de arena",
    alt: "Técnico junto al cono de arena y balanza durante un ensayo de densidad de campo",
    image: "/images/field-work/densidad-via-vimpampa-01.jpg",
    orientation: "landscape",
  },
  {
    id: "densidad-via-vimpampa-02",
    category: "Densidad de campo",
    caption: "Control de densidad sobre superficie vial",
    alt: "Especialista registrando un control de densidad sobre una superficie vial compactada",
    image: "/images/field-work/densidad-via-vimpampa-02.jpg",
    orientation: "landscape",
  },
  {
    id: "densidad-via-vimpampa-03",
    category: "Densidad de campo",
    caption: "Verificación de compactación en campo",
    alt: "Equipos y técnico preparados para verificar la compactación de una vía",
    image: "/images/field-work/densidad-via-vimpampa-03.jpg",
    orientation: "landscape",
  },
  {
    id: "densidad-obra-vial-01",
    category: "Obras viales",
    caption: "Control técnico durante la ejecución de una vía",
    alt: "Especialista ejecutando control de densidad en una vía en proceso de construcción",
    image: "/images/field-work/densidad-obra-vial-01.jpg",
    orientation: "landscape",
    placements: ["service-field-tests"],
  },
  {
    id: "densidad-obra-vial-02",
    category: "Obras viales",
    caption: "Equipo de campo verificando una capa vial",
    alt: "Dos especialistas realizando mediciones y control de densidad sobre una capa vial",
    image: "/images/field-work/densidad-obra-vial-02.jpg",
    orientation: "landscape",
    placements: ["home-about"],
  },
  {
    id: "densidad-obra-vial-03",
    category: "Obras viales",
    caption: "Ensayo de campo en tramo vial preparado",
    alt: "Especialista realizando un ensayo de densidad sobre un tramo vial preparado",
    image: "/images/field-work/densidad-obra-vial-03.jpg",
    orientation: "landscape",
    placements: ["projects"],
  },
];

export function getFieldPhoto(id: string): GalleryImage {
  const photo = GALLERY_IMAGES.find((item) => item.id === id);
  if (!photo) throw new Error(`Fotografía de campo desconocida: ${id}`);
  return photo;
}

export function getFieldPhotosByPlacement(placement: FieldPhotoPlacement) {
  return GALLERY_IMAGES.filter((photo) => photo.placements?.includes(placement));
}
