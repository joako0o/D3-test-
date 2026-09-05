#!/usr/bin/env python3
"""Servidor estático de desarrollo SIN caché.

`python3 -m http.server` no manda Cache-Control, así que el navegador cachea
index.html por heurística y, tras un cambio, sigue pidiendo el main.js?v=viejo
aunque el servidor ya sirva el nuevo. Aquí cada respuesta lleva
`Cache-Control: no-store`: lo que se ve en el preview es siempre lo que hay en
disco. Mismo uso que antes: `npm start` → http://localhost:8000.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):  # menos ruido: solo errores
        if args and str(args[1]).startswith(('4', '5')):
            super().log_message(fmt, *args)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with ThreadingHTTPServer(('0.0.0.0', port), NoCacheHandler) as httpd:
        print(f'Sirviendo sin caché en http://0.0.0.0:{port}', flush=True)
        httpd.serve_forever()
