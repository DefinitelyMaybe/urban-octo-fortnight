import { Application, Router } from "./deps.ts";

const app = new Application()
const router = new Router()

router
  .get("/", (ctx) => {
    ctx.response.body = Deno.readTextFileSync("./public/index.html")
  })
  .get("/style.css", (ctx) => {
    ctx.response.body = Deno.readTextFileSync("./public/style.css")
  })

app.use( async (ctx, next) => {
  const {method, headers, url} = ctx.request
  const perf = performance.now()
  await next()
  console.log(`request served in ${perf} ms`);
})

app.use(router.routes())
app.use(router.allowedMethods())

addEventListener("fetch", app.fetchEventHandler());
