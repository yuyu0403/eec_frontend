from flask import Blueprint, render_template

app = Blueprint('generic_classifier', __name__, url_prefix="/generic_classifier")

@app.route("/policy", methods=['GET'])
def policy():
    content={
        "active_policy": "active",
    }
    return render_template('generic_classifier/policy/main.html', **content)

@app.route("/dashboard", methods=['GET'])
def dashborad():
    content={
        "active_dashboard": "active",
    }
    return render_template('generic_classifier/dashboard/main.html', **content)

@app.route("/proposal", methods=['GET'])
def proposal():
    content={
        "active_proposal": "active",
    }
    return render_template('generic_classifier/proposal/main.html', **content)
