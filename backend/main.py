from flask import Flask, request, jsonify
from flask_cors import CORS
import calc as c

# Create a Flask application
app = Flask(__name__)

# Configure CORS to allow requests from https://metode-hungarian-client.netlify.app/
cors = CORS(app, resources={r"/data": {"origins": "https://metode-hungarian-client.netlify.app/"}})


# Create a post route
@app.route('/data', methods=['GET', 'POST'])
def get_data():
    res = request.get_json()
    data_to_send = c.calc(res["data"], res["type"])
    # Create a dictionary with the data you want to send as JSON
    data = {
        "data": data_to_send
    }
    # Return the data as JSON response
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
