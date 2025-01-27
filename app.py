from flask import Flask, request, jsonify, render_template
from PIL import Image
import pytesseract
import os

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == "POST" :
        file = request.files['file']
        try:
            image_path = os.path.join('uploads', file.filename)
            file.save(image_path)
            extracted_text = pytesseract.image_to_string(Image.open(image_path))
            os.remove(image_path)
            return jsonify({'text': extracted_text.strip()})

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return render_template("index.html")

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True, port=8000)