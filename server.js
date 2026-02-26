require('dotenv').config();
const app = require('./src/app');
require('./src/config/db'); // Importamos la conexión

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});