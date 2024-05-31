import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", function (err) {
  throw err;
});

if (!client.isOpen) {
  client.connect();
}

export default client;
