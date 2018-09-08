/**
 * Get server config, http and functions
 */
const app = require("./src/config/server");
const http = require("http");
const { onError, normalizePort } = require("./src/config/functions");

/**
 * Get PORT from environment or set 8080
 */
const port = normalizePort(process.env.PORT || "8080");

/**
 * Create server
 */
const server = http.createServer(app);

/**
 * Listen app
 */
server.listen(port, () => console.log(`Server online on ${port}`));
server.on("error", onError);
