import { Vehicle, VehicleResponse } from "../entities/vehicles.interface";

export const getVehiclePayload = (id: number, vehicle: Vehicle): VehicleResponse => {
    return {
        id,
        name: vehicle.name,
        model: vehicle.model,
        manufacturer: vehicle.manufacturer,
        cost_in_credits: parseInt(vehicle.cost_in_credits),
        consumables: vehicle.consumables,
        vehicle_class: vehicle.vehicle_class,
        parameters: {
            length: parseInt(vehicle.length),
            crew: parseInt(vehicle.crew),
            passengers: parseInt(vehicle.passengers),
            max_atmosphering_speed: parseInt(vehicle.max_atmosphering_speed),
            cargo_capacity: parseInt(vehicle.cargo_capacity),
        },
        metadata: {
            created: vehicle.created,
            edited: vehicle.edited,
        },
    }
}
