import fp from "fastify-plugin";
import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import redis from "./redis-con";

async function second(fastify: FastifyInstance) {
  const io = new Server(fastify.server, {
    transports: ["websocket"],
    maxHttpBufferSize: 50e9,
    cors: {
      origin: "*",
    },
  });
  fastify.decorate("io", io);
  fastify.io.adapter(createAdapter(redis.pubClient, redis.subClient));
  fastify.addHook("onClose", (fastify, done: HookHandlerDoneFunction) => {
    fastify.io.close();
    done();
  });
}

export default fp(second);
