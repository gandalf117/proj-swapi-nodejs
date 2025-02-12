import { Metadata } from "../interfaces/metadata.interface"
import { VehicleResponse } from "./vehicles.interface"
import { StarshipResponse } from "./starships.interface"

export interface People {
    id: number;
    name: string, 
    height: string, 
    mass: string, 
    hair_color: string, 
    skin_color: string, 
    eye_color: string, 
    birth_year: string, 
    gender: string, 
    homeworld: string;
    films: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
}

export interface PeopleResponse {
    id: number;
    name: string;
    homeworld: string;
    demographics: Demographics;
    attributes: Attributes;
    vehicles?: VehicleResponse[];
    starships?: StarshipResponse[];
    metadata: Metadata;
}

export interface Demographics {
    birth_year: string;
    gender: string;
}

export interface Attributes {
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
}
