import { Metadata } from "../interfaces/metadata.interface"

export interface Film {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
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
    metadata: Metadata;
}
