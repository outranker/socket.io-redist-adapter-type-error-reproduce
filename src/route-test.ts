import { FastifyInstance, FastifyRequest } from "fastify";

export default async function test(fastify: FastifyInstance) {
  fastify.get("/test", async (req: FastifyRequest) => {
    fastify.io.of("/").adapter.remoteJoin("a", "b");
    fastify.io.adapter.remoteJoin("a", "b");
    return "hello world";
  });
}
