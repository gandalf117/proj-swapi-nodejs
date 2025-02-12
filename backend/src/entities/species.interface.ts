import { Metadata } from "../interfaces/metadata.interface"
import { PeopleResponse } from "./people.interface"
import { FilmResponse } from "./films.interface"

export interface Species {
    id: number;
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    species: string[];
    created: string;
    edited: string;
}

export interface Demographics {
    designation: string;
    classification: string;
}

export interface Attributes {
    average_height: number;
    average_lifespan: number;
    hair_colors: string;
    skin_colors: string;
    eye_colors: string;
}

export interface SpeciesResponse {
    id: number;
    name: string;
    homeworld: string;
    language: string;
    demographics: Demographics;
    attributes: Attributes;
    people?: (PeopleResponse | {})[];
    films?: (FilmResponse | {})[];
    metadata: Metadata;
}
