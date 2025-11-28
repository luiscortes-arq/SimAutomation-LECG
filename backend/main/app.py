from flask import Flask, jsonify, request
import os
import sys

# Add backend directory to sys.path to allow imports
# Adjusted path: ../..
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.functions.fn_00_pipelines.purge_pipeline import run_purge_pipeline
from backend.functions.fn_00_pipelines.replace_pipeline import run_replace_pipeline

app = Flask(__name__)

# Configuration
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/purge', methods=['POST'])
def purge():
    data = request.json or {}
    input_path = data.get('input_path')
    output_path = data.get('output_path')
    
    if not input_path or not output_path:
        return jsonify({"error": "Missing input_path or output_path"}), 400
        
    try:
        success = run_purge_pipeline(input_path, output_path)
        if success:
            return jsonify({"message": "Purge successful", "output": output_path})
        return jsonify({"error": "Purge failed"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/replace', methods=['POST'])
def replace():
    data = request.json or {}
    target_path = data.get('target_path')
    template_path = data.get('template_path')
    output_path = data.get('output_path')
    
    if not target_path or not template_path or not output_path:
        return jsonify({"error": "Missing arguments"}), 400
        
    try:
        success = run_replace_pipeline(target_path, template_path, output_path)
        if success:
            return jsonify({"message": "Replace successful", "output": output_path})
        return jsonify({"error": "Replace failed"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
