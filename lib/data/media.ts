export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  category: "Marca" | "Campo" | "Geofísica" | "Laboratorio" | "Equipo";
};

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "logo",
    src: "/images/pro-ingema/logo-pro-ingema.png",
    alt: "Logotipo oficial de PRO INGEMA S.A.C.",
    category: "Marca",
  },
  {
    id: "hero-calicates",
    src: "/images/pro-ingema/hero-calicates.jpg",
    alt: "Equipo técnico realizando exploración mediante calicatas en un valle andino",
    category: "Campo",
  },
  {
    id: "equipo-geofisica",
    src: "/images/pro-ingema/equipo-geofisica.jpg",
    alt: "Equipo de PRO INGEMA junto a instrumentos para estudios geofísicos",
    category: "Equipo",
  },
  {
    id: "geofisica-campo",
    src: "/images/pro-ingema/geofisica-campo.jpg",
    alt: "Especialista ejecutando una línea de adquisición geofísica en campo",
    category: "Geofísica",
  },
  {
    id: "ensayo-spt",
    src: "/images/pro-ingema/ensayo-spt.jpg",
    alt: "Personal técnico ejecutando un ensayo de penetración estándar SPT",
    category: "Campo",
  },
  {
    id: "diseno-mezcla",
    src: "/images/pro-ingema/diseno-mezcla.jpg",
    alt: "Técnico verificando la consistencia de una mezcla de concreto",
    category: "Laboratorio",
  },
  {
    id: "densidad-campo",
    src: "/images/pro-ingema/densidad-campo.jpg",
    alt: "Ensayo de densidad de campo sobre una vía en construcción",
    category: "Campo",
  },
  {
    id: "esclerometria",
    src: "/images/pro-ingema/esclerometria.jpg",
    alt: "Evaluación de concreto mediante esclerometría en una zona altoandina",
    category: "Campo",
  },
  {
    id: "exploracion-roca",
    src: "/images/pro-ingema/exploracion-roca.jpg",
    alt: "Exploración geotécnica frente a una formación rocosa natural",
    category: "Campo",
  },
  {
    id: "control-vias",
    src: "/images/pro-ingema/control-vias.jpg",
    alt: "Control de densidad de campo durante la ejecución de una vía",
    category: "Campo",
  },
  {
    id: "concreto-consistencia",
    src: "/images/pro-ingema/concreto-consistencia.jpg",
    alt: "Medición del asentamiento para control de consistencia del concreto",
    category: "Laboratorio",
  },
];

export function getMedia(id: string) {
  return MEDIA_ASSETS.find((asset) => asset.id === id);
}
