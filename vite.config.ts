import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, stat } from 'node:fs/promises'
import { isAbsolute, relative, resolve } from 'node:path'

function staticPreview(): Plugin {
  return {
    name: 'static-site-preview',
    configurePreviewServer(server) {
      const root = resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use(async (request, response, next) => {
        try {
          const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
          if (pathname.startsWith('/api/')) {
            response.statusCode = 503
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify({ ok: false, error: 'Это локальная проверочная версия. Для заявки позвоните по номеру +7 906 079 91 44 или напишите на info@metrislab.ru.' }))
            return
          }
          const file = resolve(root, `.${pathname}`)
          const relativePath = relative(root, file)
          const insideRoot = !relativePath.startsWith('..') && !isAbsolute(relativePath)
          const info = insideRoot ? await stat(file).catch(() => null) : null
          const index = info?.isDirectory() ? await stat(resolve(file, 'index.html')).catch(() => null) : null
          if (info?.isFile() || index?.isFile()) return next()
          response.statusCode = 404
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(await readFile(resolve(root, '404.html'), 'utf8'))
        } catch (error) { next(error) }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), staticPreview()],
})
