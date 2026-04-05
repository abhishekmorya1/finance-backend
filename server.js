const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

dotenv.config();
connectDB();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ PORT from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});