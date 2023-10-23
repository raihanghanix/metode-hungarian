from flask import Flask, request, jsonify
from flask_cors import CORS
import calc as c

# Create a Flask application
app = Flask(__name__)

# Configure CORS to allow requests from https://metode-hungarian-client.netlify.app/
CORS(app)

@app.route('/')
def home():
    return "Hello, World!"

# Create a post route
@app.route('/api', methods=['GET', 'POST'])
def get_data():
    res = request.get_json()
    if not res: return jsonify({'error': 'no data received'})
    data_to_send = c.calc(res["data"], res["type"])
    # Create a dictionary with the data you want to send as JSON
    data = {
        "data": data_to_send
    }
    # Return the data as JSON response
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
