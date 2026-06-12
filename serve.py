#!/usr/bin/env python3
"""Local preview server that mimics GitHub Pages URL routing.

GitHub Pages serves /research from research.html (extensionless URLs).
Plain local servers don't do this — use this script instead:

    python3 serve.py        # then open http://localhost:8000

For local development only; not needed on GitHub Pages itself.
"""
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000


class GitHubPagesHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = super().translate_path(path)
        # /foo -> foo.html, like GitHub Pages (unless foo/index.html exists)
        if not p.endswith('/') and os.path.exists(p + '.html'):
            if not os.path.exists(p) or (
                os.path.isdir(p) and not os.path.exists(os.path.join(p, 'index.html'))
            ):
                return p + '.html'
        return p


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f'Serving at http://localhost:{PORT} (Ctrl+C to stop)')
    HTTPServer(('localhost', PORT), GitHubPagesHandler).serve_forever()
