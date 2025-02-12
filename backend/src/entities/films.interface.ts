import { Metadata } from "../interfaces/metadata.interface"
import { PlanetResponse } from "../entities/planets.interface"

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

export interface FilmResponse {
    id: number;
    title: string;
    episodeId: number;
    details: {
        openingCrawl: string;
        director: string;
        producer: string;
        releaseDate: string;
    };
    planets?: (PlanetResponse | {})[];
    metadata: Metadata;
}
