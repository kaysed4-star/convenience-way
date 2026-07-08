const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "FRONTEND_URL",
  "API_URL"
];

function validateEnv() {
  const missing = requiredEnvVars.filter(
    (name) => !process.env[name]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

module.exports = validateEnv;