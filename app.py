from flask import Flask, render_template, url_for, request
from flask_mail import Mail, Message
app = Flask(__name__)

app.config['MAIL_SERVER']= 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] ='quijess6@gmail.com'
app.config['MAIL_PASSWORD'] = 'pqkvjrxfyrbbvaqs'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] =True
app.config['MAIL_DEFAULT_SENDER'] = 'quijess6@gmail.com'

mail = Mail(app)

@app.route("/")
def index():
    
    
    return render_template('index.html')


@app.route("/", methods=['POST'])
def envio_correo():
    
    
    
    asunto = request.form['asunto']
    mensaje = request.form['mensaje']
    name = request.form['name']
    correo = request.form['email']
    
    msg = Message(subject=asunto, recipients=["99jesus.aguirre@gmail.com"])
    msg.body = f"Nombre de quien envia: {name} \n correo de quien envia: {correo} \n Mensaje: {mensaje}"
    mail.send(msg)
    
    
    return {"msj": "Correo enviado con exito", "ok": 200},200