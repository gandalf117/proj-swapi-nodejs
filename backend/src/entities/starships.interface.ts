import { Metadata } from "../interfaces/metadata.interface"
import { PeopleResponse } from "./people.interface"
import { FilmResponse } from "./films.interface"

export interface Starship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    species: string[];
    created: string;
    edited: string;
}

export interface StarshipParameters {
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
}

export interface StarshipResponse {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    consumables: string;
    hyperdrive_rating: number;
    MGLT: number;
    parameters: StarshipParameters;
    starship_class: string;
    pilots?: (PeopleResponse | {})[];
    films?: (FilmResponse | {})[];
    metadata: Metadata;
}
