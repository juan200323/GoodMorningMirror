from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('time.html')

if __name__ == "__main__":
    app.run('localhost', 8080, debug=True)
