import { serve } from "./deps.ts";

const port = 8080
const body = "Hello World\n";
const server = serve({ port: port });

for await (const req of server) {
  req.respond({ body });
}


