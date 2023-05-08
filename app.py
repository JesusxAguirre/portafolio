from flask import Flask, render_template, url_for
from flask_mail import Mail
app = Flask(__name__)

app.config['MAIL_SERVER']= 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] ='quijess6@gmail.com'
app.config['MAIL_PASSWORD'] = 'onebzquvinbjzbat'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] =True

Mail(app)

@app.route("/")
def index():
    
    
    return render_template('index.html')