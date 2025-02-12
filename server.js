const express = require("express");
const path = require("path");

const app = express();

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, "dist/mi-proyecto-angular")));

// Manejar rutas de Angular
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/mi-proyecto-angular/index.html"));
});

// Configurar el puerto de Heroku
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
