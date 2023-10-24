# GET: https://raihanghanix.pythonanywhere.com/
# POST: https://raihanghanix.pythonanywhere.com/api

# Import modul yang dibutuhkan
from flask import Flask, request, jsonify
from flask_cors import CORS
import calc as c

# Membuat aplikasi flask
app = Flask(__name__)

# Mengatur CORS (Cross-Origin Resource Sharing) untuk mengizinkan request 
# dari mana saja dan mengatur header yang digunakan (Content-Type)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Membuat route homepage yang menapilkan pesan "Hello, World!"
@app.route('/')
def home():
    return "Hello, World!"

# Membuat API route dengan method POST
@app.route('/api', methods=['POST'])
def get_data():
    # Menerima data JSON dari request (client)    
    res = request.get_json()
    
    # Jika tidak ada data yang diterima, maka kirimkan JSON response
    # dengan pesan error
    if not res: return jsonify({'error': 'no data received'})
    
    # Menghitung data yang diterima dengan function calc() 
    # dari modul calc.py
    data_to_send = c.calc(res["data"], res["type"])
    
    # Membuat sebuah dictionary berisi data yang akan dikirim
    # dalam bentuk JSON
    data = {
        "data": data_to_send
    }
    
    # Return data sebagai JSON response
    return jsonify(data)

# Menjalankan aplikasi flask dalam mode debug (development)
# Hapus jika aplikasi akan di-deploy
if __name__ == '__main__':
    app.run(debug=True)
