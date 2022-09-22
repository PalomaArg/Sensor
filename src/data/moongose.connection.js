import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/Sensor").then(() => {
    console.log("Conexión exitosa");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });


