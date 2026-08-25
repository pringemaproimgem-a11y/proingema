export type EnvironmentalServiceGroup = {
  title: string;
  description: string;
  items: string[];
};

export const ENVIRONMENTAL_SERVICE_GROUPS: EnvironmentalServiceGroup[] = [
  {
    title: "Monitoreo ambiental",
    description: "Evaluación de componentes ambientales para conocer y controlar las condiciones del entorno.",
    items: [
      "Monitoreo de calidad de agua, aire, ruido y suelo",
      "Líneas base ambientales",
      "Seguimiento de compromisos y medidas de manejo",
    ],
  },
  {
    title: "Instrumentos de gestión ambiental",
    description: "Elaboración y actualización de instrumentos preventivos, correctivos y complementarios.",
    items: [
      "Instrumentos preventivos y correctivos",
      "Actualizaciones e instrumentos complementarios",
      "Planes de manejo de residuos y biodiversidad",
    ],
  },
  {
    title: "Gestión territorial y social",
    description: "Acompañamiento técnico para una relación responsable con el territorio y sus actores.",
    items: [
      "Gestión social y relacionamiento comunitario",
      "Asesoría legal y saneamiento físico legal",
      "Arqueología, CIRA y apoyo a la formalización minera",
    ],
  },
];
