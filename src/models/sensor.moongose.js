import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const schema = new Schema(
    {
        id: {
            type: String,
            default: () => {
                return uuidv4();
            },
            unique: true,
        },
        name: { type: String, maxLength: 20, required: true, unique: true },
        serial_number: { type: Number, max: 50, required: true, unique: true },
    },
    { timestamps: true, versionKey: false }
);

schema.pre("save", function (next) {
    const sensor = this;
    if (sensor.name.length > 20) {
        throw new Error("El nombre debe tener 20 caracteres como maximo");
    }

    if (sensor.serial_number > 50) {
        throw new Error("El numero debe de tener 50 caracteres como maximo");
    }
    console.log("Sensor guardado");
    next();
});

schema.post("save", function (doc) {
    console.log("Sensor guardado", doc.name);
});

schema.pre("updateOne", function (next) {
    const { name, serial_number } = this._update;
    if (name.length > 20) {
        throw new Error("El nombre debe tener 20 caracteres como maximo");
    }

    if (typeof (parseInt(serial_number)) !== 'number') {
        throw new Error("Debe de ser un número");
    }

    if (serial_number > 50) {
        throw new Error("El numero debe de tener 50 caracteres como maximo");
    }
    console.log("Sensor actualizado");
    next();
});

schema.post("updateOne", function () {
    console.log('Sensor actualizado');
})

export const Sensor = mongoose.model("Sensor", schema);