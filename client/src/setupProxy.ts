import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = (app: any) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:4000",
      changeOrigin: true,
      ws: true,
    })
  );
};

export default proxy;
