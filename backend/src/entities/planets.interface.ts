import { Metadata } from "../interfaces/metadata.interface";
import { FilmResponse } from "./films.interface"

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

interface PlanetCharacteristics {
    rotation_period: number;
    orbital_period: number;
    diameter: number;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: number;
}

export interface PlanetResponse {
    id: number;
    name: string;
    population: number;
    characteristics: PlanetCharacteristics;
    films?: (FilmResponse | {})[];
    metadata: Metadata;
};
