#!/usr/bin/env python3

import connexion

from openapi_server import encoder

from flask import Flask, url_for, redirect, render_template
from flask_babel import Babel, gettext, ngettext
import os
import jinja2
   
def main():
    openapi_path = './openapi/'
    app = connexion.FlaskApp(__name__, specification_dir=openapi_path, options={"swagger_ui": True, "serve_spec": True})
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'GBFS Visualizer | This API allows consulting open data in a visual way from the different gbfs systems.'},
                pythonic_params=True)
    
    #babel = Babel(app)

    @app.route('/')
    def play_game():
        return redirect(url_for('map'))

    @app.route('/map')
    def map():
        print("CALL TO /MAP")
        return render_template('map.html')

    app.run(port=8080)

    
if __name__ == '__main__':
    main()
