export interface Tip {
  id: number;
  title: string;
  category: 'waste' | 'consumption' | 'mobility' | 'digital';
  color: string;
  description: string;
  icon: string;
  iconColor?: string;
  bgIcon?: string;
}

export const TIPS: Tip[] = [
  // Resíduos & Reciclagem (Verde)
  {
    id: 1,
    title: "Lave antes de Jogar",
    category: "waste",
    color: "bg-green-400",
    description: "Embalagens sujas de comida podem contaminar todo um lote de reciclagem. Dê uma enxaguada rápida antes do descarte.",
    icon: "faucet",
    iconColor: "#48bb78", // green-500
    bgIcon: "#2f855a" // green-700
  },
  {
    id: 2,
    title: "O Perigo das Pilhas",
    category: "waste",
    color: "bg-green-400",
    description: "Nunca jogue pilhas ou baterias no lixo comum. Elas liberam metais pesados no solo. Procure pontos de coleta específicos.",
    icon: "battery-full",
    iconColor: "#48bb78",
    bgIcon: "#2f855a"
  },
  {
    id: 3,
    title: "Compostagem Caseira",
    category: "waste",
    color: "bg-green-400",
    description: "Cascas de frutas e legumes podem virar adubo. Ter uma minhocaria em casa reduz seu lixo orgânico pela metade.",
    icon: "leaf",
    iconColor: "#48bb78",
    bgIcon: "#2f855a"
  },

  // Consumo Consciente (Roxo/Lilás)
  {
    id: 4,
    title: "Moda Circular",
    category: "consumption",
    color: "bg-purple-400",
    description: "A indústria da moda é uma das mais poluentes. Prefira peças duráveis, brechós ou troque roupas com amigos.",
    icon: "tshirt",
    iconColor: "#9f7aea", // purple-500
    bgIcon: "#6b46c1" // purple-700
  },
  {
    id: 5,
    title: "Sacos de Pano",
    category: "consumption",
    color: "bg-purple-400",
    description: "Uma sacola plástica leva 400 anos para se decompor. Tenha sempre uma ecobag dobrável na mochila.",
    icon: "shopping-bag",
    iconColor: "#9f7aea",
    bgIcon: "#6b46c1"
  },
  {
    id: 6,
    title: "Alimentação Local",
    category: "consumption",
    color: "bg-purple-400",
    description: "Alimentos importados geram muito CO2 no transporte. Compre de produtores locais da sua região.",
    icon: "apple-alt",
    iconColor: "#9f7aea",
    bgIcon: "#6b46c1"
  },

  // Mobilidade & Transporte (Laranja)
  {
    id: 7,
    title: "Pneus Calibrados",
    category: "mobility",
    color: "bg-orange-400",
    description: "Manter os pneus do carro calibrados economiza combustível, faz o pneu durar mais e reduz a emissão de gases.",
    icon: "car",
    iconColor: "#ed8936", // orange-500
    bgIcon: "#c05621" // orange-700
  },
  {
    id: 8,
    title: "Direção Suave",
    category: "mobility",
    color: "bg-orange-400",
    description: "Evite acelerações e freadas bruscas. Dirigir suavemente pode economizar até 20% de combustível.",
    icon: "tachometer-alt",
    iconColor: "#ed8936",
    bgIcon: "#c05621"
  },

  // Sustentabilidade Digital (Azul Escuro/Indigo)
  {
    id: 9,
    title: "Limpeza na Nuvem",
    category: "digital",
    color: "bg-indigo-500",
    description: "Armazenar dados na nuvem consome energia em servidores. Apague e-mails antigos e fotos duplicadas para reduzir sua pegada digital.",
    icon: "cloud",
    iconColor: "#667eea", // indigo-500
    bgIcon: "#4c51bf" // indigo-700
  },
  {
    id: 10,
    title: "Modo Escuro",
    category: "digital",
    color: "bg-indigo-500",
    description: "Em telas OLED (celulares modernos), usar o modo escuro economiza bateria e aumenta a vida útil do aparelho.",
    icon: "moon",
    iconColor: "#667eea",
    bgIcon: "#4c51bf"
  }
];
