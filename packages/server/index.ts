import dotenv from 'dotenv'
// import cors from 'cors'
// import { createClientAndConnect } from './db'
import path from 'path'
import fsp from 'fs/promises'
import express from 'express'
import type { ViteDevServer } from 'vite'
// const app = express()
dotenv.config()
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
console.log(render)

function resolve(p: any) {
  return path.resolve(__dirname, p)
}
const port = Number(process.env.SERVER_PORT) || 3001
async function createServer(
  root = process.cwd(),
  isProduction = process.env.NODE_ENV === 'production'
) {
  const app = express()
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer
  if (!isProduction) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(express.static(resolve('dist/client')))
  }
  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.get('/ssr-example', (_, res) => {
    const result = render()
    res.send(result)
  })
  app.use('*', async (req: any, res: any) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isProduction) {
        template = await fsp.readFile(resolve('index.html'), 'utf8')
        template = await vite.transformIndexHtml(url, template)
        render = await vite
          .ssrLoadModule('../packages/client/src/entry-server.tsx')
          .then((m: Record<string, any>) => m.render)
      } else {
        template = await fsp.readFile(
          resolve('../packages/client/dist/client/index.html'),
          'utf8'
        )
        render = (
          // @ts-ignore
          await import('../client/dist/ssr/entry-server.js')).render
      }

      const html = template.replace('<!--root-html-->', render(url))
      res.setHeader('Content-Type', 'text/html')
      return res.status(200).end(html)
    } catch (error: any) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error)
      }
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  return app
}

createServer().then(app => {
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
})

// app.use(cors())
// const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()

// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })

// app.listen(port, () => {
//   console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
// })
