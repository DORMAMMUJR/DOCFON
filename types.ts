
export interface Course {
  id: string;
  title: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Certificación';
  duration: string;
  price: number;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isBulk?: boolean;
}

export enum BusinessModel {
  EXPRESS = 'Express',
  STANDARD = 'Standard',
  ACADEMY = 'Academy Hub'
}

export interface FranchiseModel {
  type: BusinessModel;
  investment: string;
  sqm: string;
  roi: string;
  features: string[];
}
