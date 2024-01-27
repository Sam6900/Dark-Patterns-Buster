from flask import Flask, request, jsonify
import pandas as pd
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline

app = Flask(__name__)


@app.route('/', methods=['POST'])
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(threaded=True, debug=True)

