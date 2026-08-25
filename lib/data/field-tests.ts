export type FieldTest = {
  slug: string;
  name: string;
  norm: string;
  objective: string;
  application: string;
  importance: string;
};

export const FIELD_TESTS: FieldTest[] = [
  {
    slug: "cono-de-arena",
    name: "Cono de Arena",
    norm: "MTC E 117 / ASTM D1556",
    objective:
      "Determinar la densidad in situ del suelo compactado mediante el reemplazo de un volumen conocido con arena calibrada.",
    application:
      "Control de compactación de rellenos, terraplenes, sub rasantes y capas de pavimento.",
    importance:
      "Permite verificar que el grado de compactación alcanzado en campo cumple con lo especificado en el expediente técnico, asegurando la estabilidad del relleno.",
  },
  {
    slug: "dpl",
    name: "DPL (Ensayo de Penetración Dinámica Ligera)",
    norm: "DIN 4094",
    objective:
      "Estimar la resistencia a la penetración del suelo en profundidad mediante golpes de una maza estandarizada.",
    application:
      "Exploración rápida de suelos superficiales, cimentaciones ligeras y verificación de compactación.",
    importance:
      "Es un método económico y rápido para obtener un perfil continuo de resistencia del terreno sin necesidad de perforación pesada.",
  },
  {
    slug: "spt",
    name: "SPT (Ensayo de Penetración Estándar)",
    norm: "ASTM D1586 / NTP 339.133",
    objective:
      "Medir la resistencia a la penetración del suelo y obtener muestras alteradas representativas a distintas profundidades.",
    application:
      "Estudios de mecánica de suelos para cimentaciones, edificaciones, puentes y obras de infraestructura.",
    importance:
      "Es el ensayo de campo más utilizado a nivel mundial para estimar la capacidad portante y correlacionar parámetros geotécnicos del suelo.",
  },
  {
    slug: "cbr-campo",
    name: "CBR de Campo (In Situ)",
    norm: "ASTM D4429 / MTC E 132",
    objective:
      "Evaluar la capacidad de soporte del suelo en su condición natural de humedad y densidad.",
    application:
      "Diseño y evaluación de estructuras de pavimento en vías existentes o proyectadas.",
    importance:
      "Proporciona un valor de soporte representativo de las condiciones reales del terreno, complementando los ensayos de laboratorio.",
  },
  {
    slug: "perfil-estratigrafico",
    name: "Perfil Estratigráfico",
    norm: "ASTM D2488 / NTP 339.150",
    objective:
      "Registrar y describir la secuencia de estratos del subsuelo identificando espesores, tipo de suelo y nivel freático.",
    application:
      "Base fundamental de todo estudio geotécnico, estudio de suelos y estudio de cimentación.",
    importance:
      "Constituye el documento técnico esencial para interpretar el comportamiento del subsuelo y sustentar las recomendaciones de diseño.",
  },
  {
    slug: "humedad-speedy",
    name: "Humedad Speedy",
    norm: "MTC E 108 / AASHTO T217",
    objective:
      "Determinar el contenido de humedad del suelo de forma inmediata mediante reacción química con carburo de calcio.",
    application:
      "Control de compactación en campo en tiempo real durante la conformación de rellenos y sub rasantes.",
    importance:
      "Permite tomar decisiones inmediatas en obra sobre el contenido de humedad óptimo sin esperar resultados de laboratorio.",
  },
];
