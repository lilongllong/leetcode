const app = new Koa();

app.use(async (ctx, next) => {
    await next();

});


app.use = (fn) => {
    // 假设最终执行的方法是handler
    const wrapHandler = (handler) => (ctx, value) => {
        const next = (value) => {
            return new Promise((resolve, reject) => {
                handler(ctx, value);
                resolve(value);
            }).then((value) => {
                fn(ctx)
            });
        }
        fn(ctx, next);
    }
    app.handler = wrapHandler(app.handler);
     
}