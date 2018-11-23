import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import render from 'koa-ejs';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import indexRouter from './api/index';

const params = process.argv;
const port = (!!params[2] && params[2] === 'development') ? 3000 : 80;
const staticPath = path.join(__dirname, 'static');

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(staticPath, 'view'),
  layout: 'index',
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

router.use('/', indexRouter.routes());

app.use(bodyParser());
app.use(serve(staticPath));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
