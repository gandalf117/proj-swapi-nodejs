import { Metadata } from "../interfaces/metadata.interface";
import { FilmResponse } from "../entities/films.interface"

export interface Planet {
    id: number;
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    films: string[];
    residents: string[];
    created: string;
    edited: string;
};

export interface PlanetResponse {
    id: number;
    name: string;
    population: number;
    characteristics: {
        rotationPeriod: number;
        orbitalPeriod: number;
        diameter: number;
        climate: string;
        gravity: string;
        terrain: string;
        surfaceWater: number;
    };
    films?: (FilmResponse | {})[];
    metadata: Metadata;
};
