import { Metadata } from "../interfaces/metadata.interface"
import { PlanetResponse } from "./planets.interface"

export interface Film {
    id: number;
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
}

export interface FilmDetails {
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
};

export interface FilmResponse {
    id: number;
    title: string;
    episode_id: number;
    details: FilmDetails;
    planets?: (PlanetResponse | {})[];
    metadata: Metadata;
}
