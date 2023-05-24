from flask import Flask, request, jsonify
from simple_ner import ner

app = Flask(__name__)


@app.route("/perform-ner", methods=["POST"])
def perform_ner():
    text = request.json.get("text", "")
    entities = ner(text)
    return jsonify({"entities": entities})


if __name__ == "__main__":
    app.run()
