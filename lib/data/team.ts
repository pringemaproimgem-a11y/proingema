export type TeamMember = {
  name: string;
  role: string;
  cip?: string;
  specialties: string[];
  image: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Ing. Alberth Edward Mallqui Ttupa",
    role: "Gerente General",
    cip: "CIP 206658",
    specialties: [
      "Mecánica de suelos",
      "Cimentaciones",
      "Carreteras",
      "Canteras",
    ],
    image: "/images/equipo/alberth-mallqui.jpg",
  },
];
