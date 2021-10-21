import { createClient } from "redis";

const client = createClient({
  host: "localhost",
  port: 6379,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 6) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  },
});
const pubClient = client.duplicate();

const subClient = client.duplicate();

export default {
  pubClient,
  subClient,
};
