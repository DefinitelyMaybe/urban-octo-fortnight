import { Application, Router } from "./deps.ts";

const app = new Application()
const router = new Router()

router
  .get("/", async (ctx) => {
    console.log("get the index html");
    ctx.response.body = await fetch("./public/index.html")
  })
  .get("/style.css", (ctx) => {
    ctx.response.body = Deno.readTextFileSync("./public/style.css")
  })

app.use( async (ctx, next) => {
  // const perf = performance.now()
  const {method, headers, url } = ctx.request

  console.log(`${method} ${url}`);
  url.pathname = url.pathname.replace("//windy-goose-32.deno.dev", "")
  console.log(url.pathname);

  await next()
  // console.log(`request served in ${perf} ms`);
})

app.use(router.routes())
app.use(router.allowedMethods())

addEventListener("fetch", app.fetchEventHandler());
