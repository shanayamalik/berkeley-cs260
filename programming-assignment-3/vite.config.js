import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import sirv from "sirv";

// https://vite.dev/config/
export default defineConfig({
  root: "./code",
  base: "/code",
  build: {
    outDir: "../code-dist",
    emptyOutDir: true,
  },
  server: {
    port: 6160,
  },
  plugins: [
    react(),
    {
      name: "serve-specification-static",
      configureServer(server) {
        const serve = sirv("specification", {
          dev: true,
          etag: true,
          maxAge: 0,
        });

        server.middlewares.use("/", (req, res, next) => {
          if (req.originalUrl === "/") {
            res.statusCode = 301;
            res.setHeader("Location", "/specification/");
            res.end();
            return;
          }
          next();
        });

        server.middlewares.use("/specification", (req, res, next) => {
          if (req.originalUrl === "/specification") {
            res.statusCode = 301;
            res.setHeader("Location", "/specification/");
            res.end();
            return;
          }

          if (req.url === "/" || req.url === "") {
            req.url = "/index.html";
          }

          serve(req, res, next);
        });
      },
    },
  ],
  customLogger: (() => {
    const logger = createLogger("info");
    return {
      ...logger,
      info(msg, opts) {
        // startup message with url
        if (msg.includes("Local") && msg.includes("http://")) {
          const patched = msg.replace(/\/code/, "/specification/");
          logger.info(patched, opts);
          return;
        }
        logger.info(msg, opts);
      },
    };
  })(),
});
