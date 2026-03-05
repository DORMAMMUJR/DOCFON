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
    id: string | number;
    name: string;
    category: string;
    price: number;
    image: string;
    images?: string[];
    description?: string;
    isBulk?: boolean;
    is_bulk?: boolean;
    badge?: 'Nuevo' | 'Más vendido' | 'Oferta';
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
