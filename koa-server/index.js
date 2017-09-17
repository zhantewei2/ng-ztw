const koa=require('koa');
const app=new koa();
const staticCache=require('koa-static-cache');
const mount=require('koa-mount');
const static=require('koa-static');
const staticGzip=require('./tool/ztw-static-gzip');
app.use(mount('/assets',staticCache('assets',{maxAge:60*60*24*7})));
app.use(staticGzip('public'));
app.use(async(ctx)=>{
   ctx.body='err';
});
app.listen(3000);
