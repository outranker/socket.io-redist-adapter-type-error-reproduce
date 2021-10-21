import { FastifyInstance } from "fastify";
import { Server, ServerOptions } from "socket.io";

declare module "fastify" {
  export interface FastifyInstance {
    io: Server;
  }
}

declare module "socket.io" {
  interface Socket {
    username: string;
    customId: string;
  }
}
