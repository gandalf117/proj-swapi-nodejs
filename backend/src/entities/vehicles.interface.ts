import { Metadata } from "../interfaces/metadata.interface"
import { PeopleResponse } from "./people.interface"
import { FilmResponse } from "./films.interface"

export interface Vehicle {
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
    vehicle_class: string;
    pilots: string[];
    films: string[];
    species: string[];
    created: string;
    edited: string;
}

export interface VehicleParameters {
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
}

export interface VehicleResponse {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    consumables: string;
    vehicle_class: string;
    parameters: VehicleParameters;
    pilots?: (PeopleResponse | {})[];
    films?: (FilmResponse | {})[];
    metadata: Metadata;
}
