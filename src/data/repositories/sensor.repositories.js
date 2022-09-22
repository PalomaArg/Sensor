import { Sensor } from "../../models/sensor.moongose.js";
import "../moongose.connection.js";

export class SensorRepository {
    guardar = async (sensor) => {
        try {
            await sensor.save();
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    consultar = async () => {
        try {
            return await Sensor.find().select("-_id");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    actualizar = async (id, data) => {
        try {
            const { name, serial_number } = data;
            await Sensor.updateOne(
                { id },
                { name, serial_number }
            );
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    consultarUno = async (sensor) => {
        try {
            return await Sensor.findOne({
                $or: [{ id: sensor }, { name: sensor }, { serial_number: parseInt(sensor) }],
            }).select("-_id");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    eliminar = async (id) => {
        try {
            let { borrar } = await Sensor.deleteOne({ id });
            if (borrar != 0) {
                console.log('Borrado exitosamente.');
            } else {
                console.log('El sensor no pudo ser borrado.');
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

}
