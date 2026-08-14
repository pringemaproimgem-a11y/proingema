import { getFieldPhotosByPlacement } from "./gallery.ts";

export type Service = {
  slug: string;
  title: string;
  icon: "layers" | "flask" | "mountain" | "leaf" | "microscope" | "hard-hat";
  summary: string;
  description: string;
  benefits: string[];
  applications: string[];
  image: string;
};

const GEOTECHNICAL_PHOTO = getFieldPhotosByPlacement("service-geotechnical")[0];
const FIELD_TEST_PHOTO = getFieldPhotosByPlacement("service-field-tests")[0];

export const SERVICES: Service[] = [
  {
    slug: "estudios-geotecnicos",
    title: "Estudios geotécnicos",
    icon: "layers",
    summary: "Exploración, caracterización del subsuelo y recomendaciones para cimentaciones, vías y obras civiles.",
    description: "Integramos calicatas, perforaciones, ensayos in situ y resultados de laboratorio para interpretar el terreno y sustentar decisiones de diseño.",
    benefits: ["Reconocimiento directo del terreno", "Parámetros para diseño y construcción", "Recomendaciones técnicas integradas"],
    applications: ["Cimentaciones", "Pavimentos", "Taludes", "Redes de agua y riego"],
    image: GEOTECHNICAL_PHOTO.image,
  },
  {
    slug: "estudios-geofisicos",
    title: "Estudios geofísicos",
    icon: "mountain",
    summary: "Métodos no invasivos para conocer la respuesta del subsuelo y complementar la investigación directa.",
    description: "Ejecutamos refracción sísmica, MASW, MAM–ReMi, tomografía eléctrica, SEV y mediciones HVSR según las necesidades del proyecto.",
    benefits: ["Cobertura continua del subsuelo", "Menor intervención del terreno", "Integración con datos geotécnicos"],
    applications: ["Perfiles de velocidad", "Profundidad de basamento", "Estratigrafía", "Evaluación sísmica"],
    image: "/images/pro-ingema/geofisica-campo.jpg",
  },
  {
    slug: "laboratorio-de-materiales",
    title: "Laboratorio de materiales",
    icon: "flask",
    summary: "Ensayos de suelos, agregados, concreto y morteros para diseño y control de calidad.",
    description: "Realizamos ensayos estándar y especiales para caracterización, compactación, resistencia y desempeño de materiales de construcción.",
    benefits: ["Resultados trazables", "Soporte para control de obra", "Lectura técnica de resultados"],
    applications: ["Suelos", "Agregados", "Concreto fresco y endurecido", "Morteros"],
    image: "/images/pro-ingema/diseno-mezcla.jpg",
  },
  {
    slug: "ensayos-de-campo",
    title: "Ensayos de campo",
    icon: "hard-hat",
    summary: "Verificación in situ de compactación, resistencia y condiciones reales de los materiales.",
    description: "Nuestro equipo se desplaza a obra para ejecutar controles de densidad, SPT, DPL, humedad, esclerometría, extracción de testigos y carga de placa.",
    benefits: ["Resultados representativos de obra", "Respuesta técnica oportuna", "Registro fotográfico de ejecución"],
    applications: ["Control de rellenos", "Investigación SPT y DPL", "Evaluación de concreto", "Carga de placa"],
    image: FIELD_TEST_PHOTO.image,
  },
  {
    slug: "estudios-ambientales",
    title: "Estudios ambientales",
    icon: "leaf",
    summary: "Monitoreo, instrumentos de gestión y acompañamiento territorial para proyectos responsables.",
    description: "Desarrollamos evaluaciones ambientales, instrumentos preventivos y correctivos, biodiversidad, residuos, gestión social y soporte territorial.",
    benefits: ["Visión integral del entorno", "Gestión documentada de compromisos", "Acompañamiento multidisciplinario"],
    applications: ["Monitoreo ambiental", "Instrumentos de gestión", "Gestión social", "Saneamiento territorial"],
    image: "/images/pro-ingema/exploracion-roca.jpg",
  },
  {
    slug: "consultoria-tecnica",
    title: "Consultoría técnica",
    icon: "microscope",
    summary: "Revisión, actualización y asesoría especializada para estudios y expedientes de ingeniería.",
    description: "Acompañamos a entidades, proyectistas y contratistas en la planificación, revisión y actualización de estudios técnicos.",
    benefits: ["Criterio técnico especializado", "Documentación ordenada", "Decisiones sustentadas"],
    applications: ["Actualización de estudios", "Asesoría técnica", "Diseños de mezcla", "Evaluación de canteras"],
    image: "/images/pro-ingema/equipo-geofisica.jpg",
  },
];
