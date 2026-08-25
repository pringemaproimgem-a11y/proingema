export type LabTest = {
  name: string;
  norm?: string;
};

export const SOIL_STANDARD_TESTS: LabTest[] = [
  { name: "Contenido de Humedad", norm: "ASTM D2216" },
  { name: "Análisis Granulométrico", norm: "ASTM D422" },
  { name: "Límites Líquido y Plástico", norm: "ASTM D4318" },
  { name: "Clasificación SUCS", norm: "ASTM D2487" },
  { name: "Peso Volumétrico", norm: "ASTM D7263" },
  { name: "Proctor Modificado", norm: "ASTM D1557" },
  { name: "CBR (California Bearing Ratio)", norm: "ASTM D1883" },
];

export const SOIL_SPECIAL_TESTS: LabTest[] = [
  { name: "Corte Directo", norm: "ASTM D3080" },
  { name: "Consolidación", norm: "ASTM D2435" },
  { name: "Triaxial", norm: "ASTM D4767" },
  { name: "Compresión No Confinada", norm: "ASTM D2166" },
  { name: "Densidad Máxima", norm: "ASTM D4253" },
  { name: "Densidad Mínima", norm: "ASTM D4254" },
  { name: "Expansión Controlada", norm: "ASTM D4546" },
];

export const CONCRETE_ASPHALT_TESTS: LabTest[] = [
  { name: "Diseño de Mezcla de Concreto" },
  { name: "Rotura de Briquetas (Testigos de Concreto)", norm: "ASTM C39" },
  { name: "Abrasión Los Ángeles", norm: "ASTM C131" },
  { name: "Viga Benkelman", norm: "MTC E 1003" },
  { name: "Ensayo de Placa (Plate Load Test)", norm: "ASTM D1194" },
  { name: "Sales Solubles", norm: "MTC E 219" },
  { name: "Perforación Diamantina", norm: "ASTM C42" },
];
