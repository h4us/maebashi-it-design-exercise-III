# Leaflet.js + Next.js PWA example

This example uses [`next-pwa`](https://github.com/shadowwalker/next-pwa) to create a progressive web app (PWA) powered by [Workbox](https://developers.google.com/web/tools/workbox/).

Install dependencies.

```bash
npm i
```

Run as dev mode

```bash
npm run dev
```

Run as dev mode, with custom server for https connection.

You need to put a certification file and a key file in _.certs_ directory.

```
.certs
├── fullchain.pem
└── key.pem
```

We recoomend to use [mkcert](https://github.com/FiloSottile/mkcert), for generating those files

```bash
npm run dev-https
```


Build & export for Static Site

```bash
npm run build && npm run export 
```