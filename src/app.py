# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, make_response, jsonify,send_from_directory,redirect, url_for
from flask_babel import Babel, gettext as _

from configs import *
from views.generic_classifier import app as generic_classifier_view
# init app
app = Flask(__name__, template_folder="templates", static_folder="static", static_url_path="/static")
app.config.from_pyfile('settings.cfg')
babel = Babel(app)


@babel.localeselector
def get_locale():
    cookie = request.cookies.get('locale')
    if cookie in ['zh_Hant_TW', 'en']:
        return cookie

    lang = app.config.get('BABEL_DEFAULT_LOCALE')
    response = make_response(jsonify(message=lang))
    response.set_cookie('locale', 'en')
    return request.accept_languages.best_match(app.config.get('BABEL_DEFAULT_LOCALE'))


# @app.route("/set_locale")
# def set_locale():
#     lang = request.args.get("language")
#     response = make_response(jsonify(message=lang))
#     response.set_cookie('locale', lang)
#     return response


@app.context_processor
def global_var():
    return {
        "API_BASE":API_BASE,
        "STATIC_BASE": STATIC_BASE,
        "ASSET_VERSION": ASSET_VERSION
    }

# @app.route("/home", methods=['GET'])
# def home():
#     return render_template('home.html')
@app.route("/")
def index():
    return redirect('/generic_classifier/policy')
@app.route('/json/test.json')
def dataclean_json():
    return send_from_directory('json', 'test.json')


# 註冊View
app.register_blueprint(generic_classifier_view)

if __name__ == '__main__':
    # 開發時才會Reload Templates
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(host="0.0.0.0", port=FLASK_PORT, debug=False, use_reloader=True, threaded=True)
