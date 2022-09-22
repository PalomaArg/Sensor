import { question } from "readline-sync";
import { SensorController } from "./src/controller/sensor.controller.js";
import { Sensor } from "./src/models/sensor.moongose.js";

const menu = "\n1.Registrar un sensor nuevo\n2.Actualizar un sensor según su código\n3.Eliminar un sensor según su código.\n4.Buscar un sensor por código o nombre y desplegar sus datos.\n5.Consultar la lista de sensors registrados.";
const sensorController = new SensorController();

(async function ingresaDatos() {
    let estado = "entry";
    while (estado != "exit") {
        console.log(menu);
        let operacion = question("\nEscriba el número de la operación que desea realizar o exit: ");
        switch (operacion) {
            case "1":
                try {
                    const name = question("Favor de ingresar el nombre del sensor:" );
                    const serial_number = question("Favor de ingresar el numero del sensor: ");
                    const sensor = new Sensor({
                        name: name,
                        serial_number: serial_number,
                    });
                    await sensorController.guardar(sensor);
                } catch (error) {
                    console.error("Error:", error.message);
                }
                break;
            case "2":
                try {
                    let sensor = campos();
                    let resultadoActualizar = await sensorController.actualizar(sensor);
                    console.log(resultadoActualizar);
                } catch (err) {
                    console.error(err.message);
                }
                break;
            case "3":
                try {
                    let codigo = question("Ingrese el número del sensor: ");
                    let resultadoEliminar = await sensorController.eliminar(codigo);
                    console.log(resultadoEliminar);
                } catch (err) {
                    console.error(err.message);
                }
                break;
            case "4":
                try {
                    let busqueda = question("Ingrese el número o nombre del sensor: ");
                    let resultadoBusqueda = await sensorController.consultarUno(busqueda);
                    console.log(resultadoBusqueda);
                } catch (err) {
                    console.error(err.message);
                }
                break;
            case "5":
                try {
                    let resultado = await sensorController.consultar();
                    console.log(resultado);
                } catch (err) {
                    console.error(err.message);
                }
                break;
            case "exit":
                estado = "exit";
                break;
        }
    }
})();

