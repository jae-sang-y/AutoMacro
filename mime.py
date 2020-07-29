import os
import threading

from flask import Flask, Blueprint, send_from_directory, render_template
from flask_react import React, babel

react = None


class JSXReloader:
    reload_thread = None

    @staticmethod
    def try_reload():
        if JSXReloader.reload_thread is None:
            JSXReloader.reload_thread = threading.Thread(target=JSXReloader.reload, args=[])
            JSXReloader.reload_thread.start()

    @staticmethod
    def reload():
        while True:
            babel.convert(react._jsx_folder, 'react/js/')
        JSXReloader.reload_thread = None


class MimeBlueprint(Blueprint):
    def send_static_file(self, filename):
        if not self.has_static_folder:
            raise RuntimeError("No static folder for this object")
        cache_timeout = self.get_send_file_max_age(filename)
        mime_type = 'text/html'
        if filename.endswith('.js'):
            mime_type = 'application/javascript'
            if filename.startswith('js/'):
                JSXReloader.try_reload()
        elif filename.endswith('.css'):
            mime_type = 'text/css'

        return send_from_directory(
            self.static_folder, filename, cache_timeout=cache_timeout, mimetype=mime_type
        )


class MimeReact(React):
    def init_app(self, app: Flask):
        self.app = app
        self.app.extensions["react"] = self

        self.blueprint = MimeBlueprint(
            name="react",
            import_name=__name__,
            static_folder="react",
            static_url_path='/react',
            template_folder="templates",
            url_prefix="/"
        )
        self.app.config.setdefault("REACT_INDEX_TEMPLATE", self.index_template)
        self.app.config.setdefault("REACT_EXTENSIONS", self.extensions)

        @app.route("/")
        def react_app():
            template = app.config.get("REACT_INDEX_TEMPLATE")
            return render_template(
                template,
                app_url=self.get_url("js/App.js"),
            )

        self.app.register_blueprint(self.blueprint)

        self.init_babel()
        self.init_socket()

    def init_babel(self):
        """Initialize Babel for JSX conversion."""
        if self._jsx_folder:
            babel_path = os.path.join("node_modules", ".bin", "babel")
            if not os.path.exists(babel_path):
                babel.install()

            babel.convert(self._jsx_folder, 'react/js/')
