// In Deno Deploy, the BroadcastChannel API provides a communication
// mechanism between the various instances; a simple message bus 
// that connects the various Deploy instances world wide.

addEventListener("fetch", (event) => {
  const response = new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
  console.log(crypto.randomUUID());
  event.respondWith(response);
});
