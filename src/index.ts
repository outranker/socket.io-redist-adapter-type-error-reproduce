import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import socketPlugin from "./socket-plugin";
import routePlugin from "./route-test";
const server: FastifyInstance = Fastify({});

// registering socketio plugin
server.register(socketPlugin);

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

server.register(routePlugin);
const start = async () => {
  try {
    await server.listen(3232);
    console.log("server started at 3232");
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
