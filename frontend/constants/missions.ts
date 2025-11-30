export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'FÁCIL' | 'MÉDIO' | 'DIFÍCIL';
  icon: string;
  color: string;
  duration?: string;
}

export const MISSIONS: Mission[] = [
  // FÁCIL
  {
    id: 'banho_flash',
    title: 'Banho Flash',
    description: 'Tome um banho de no máximo 5 minutos.',
    points: 80,
    difficulty: 'FÁCIL',
    icon: 'shower',
    color: 'green',
    duration: '5 min'
  },
  {
    id: 'luz_apagada',
    title: 'Luz Apagada',
    description: 'Passe a noite com as luzes apagadas e aproveite a luz natural/velas.',
    points: 50,
    difficulty: 'FÁCIL',
    icon: 'moon',
    color: 'green',
    duration: '1 noite'
  },
  {
    id: 'adeus_vampiros',
    title: 'Adeus, Vampiros',
    description: 'Tire da tomada todos os eletrônicos que não estão em uso.',
    points: 60,
    difficulty: 'FÁCIL',
    icon: 'plug',
    color: 'green'
  },
  {
    id: 'limpeza_digital',
    title: 'Limpeza Digital',
    description: 'Apague 50 e-mails antigos ou desnecessários.',
    points: 40,
    difficulty: 'FÁCIL',
    icon: 'trash',
    color: 'green'
  },

  // MÉDIO
  {
    id: 'zero_plastico',
    title: 'Zero Plástico',
    description: 'Passe o dia inteiro sem comprar ou usar garrafas/copos plásticos descartáveis.',
    points: 150,
    difficulty: 'MÉDIO',
    icon: 'recycle',
    color: 'orange',
    duration: '24h'
  },
  {
    id: 'compre_local',
    title: 'Compre Local',
    description: 'Compre frutas ou vegetais em uma feira de produtores locais.',
    points: 200,
    difficulty: 'MÉDIO',
    icon: 'shopping-basket',
    color: 'orange'
  },
  {
    id: 'sobra_zero',
    title: 'Sobra Zero',
    description: 'Cozinhe uma refeição utilizando sobras ou talos que iriam para o lixo.',
    points: 180,
    difficulty: 'MÉDIO',
    icon: 'utensils',
    color: 'orange'
  },
  {
    id: 'sacola_retornavel',
    title: 'Sacola Retornável',
    description: 'Vá ao mercado e recuse sacolas plásticas, usando sua própria ecobag.',
    points: 120,
    difficulty: 'MÉDIO',
    icon: 'shopping-bag',
    color: 'orange'
  },

  // DIFÍCIL
  {
    id: 'desafio_carona',
    title: 'Desafio da Carona',
    description: 'Organize uma carona solidária para o trabalho ou faculdade.',
    points: 300,
    difficulty: 'DIFÍCIL',
    icon: 'car-side',
    color: 'red'
  },
  {
    id: 'moda_circular',
    title: 'Moda Circular',
    description: 'Conserte uma roupa rasgada ou compre uma peça em brechó.',
    points: 350,
    difficulty: 'DIFÍCIL',
    icon: 'tshirt',
    color: 'red'
  },
  {
    id: 'dia_vegano',
    title: 'Dia Vegano Completo',
    description: 'Não consuma nenhum produto de origem animal por 24h.',
    points: 400,
    difficulty: 'DIFÍCIL',
    icon: 'carrot',
    color: 'red',
    duration: '24h'
  },
  {
    id: 'plantio_amigo',
    title: 'Plantio Amigo',
    description: 'Plante uma árvore ou comece uma pequena horta em casa.',
    points: 500,
    difficulty: 'DIFÍCIL',
    icon: 'seedling',
    color: 'red'
  }
];
