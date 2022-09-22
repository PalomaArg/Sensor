import { SensorRepository } from "../data/repositories/sensor.repositories.js";
const sensorRepository = new SensorRepository();

export class SensorController {

    guardar = async (sensor) => {
        console.log(await sensorRepository.guardar(sensor));
    }

    consultar = async () => {
        console.log(await sensorRepository.consultar());
    }

    eliminar = async (codigo) => {
        console.log(await sensorRepository.eliminar(codigo));
    }

    actualizar = async (sensor) => {
        console.log(await sensorRepository.actualizar(sensor));
    }

    consultarUno = async (codigo) => {
        console.log(await sensorRepository.consultarUno(codigo));
    }
}
