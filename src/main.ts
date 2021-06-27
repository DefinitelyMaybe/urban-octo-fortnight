import { Application, Router } from "./deps.ts";

const app = new Application()
const router = new Router()

router
  .get("/", (ctx) => {
    console.log("get the index html");
    try {
      ctx.response.body = fetch("./public/index.html") 
    } catch (error) {
      console.log(error);
      ctx.response.body = "hello world"
    }
  })
  .get("/style.css", (ctx) => {
    ctx.response.body = Deno.readTextFileSync("./public/style.css")
  })

app.use( async (ctx, next) => {
  // const perf = performance.now()
  const {method, headers, url } = ctx.request

  url.pathname = url.pathname.replace("//windy-goose-32.deno.dev", "")
  console.log(`${method} ${url}`);

  await next()
  // console.log(`request served in ${perf} ms`);
})

app.use(router.routes())
app.use(router.allowedMethods())

addEventListener("fetch", app.fetchEventHandler());
