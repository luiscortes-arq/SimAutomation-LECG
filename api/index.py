from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import os
import sys
import tempfile

# Add the root directory to sys.path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import pipeline functions
from backend.functions.fn_00_pipelines.purge_pipeline import run_purge_pipeline
from backend.functions.fn_00_pipelines.replace_pipeline import run_replace_pipeline

app = Flask(__name__)
CORS(app)

# Vercel only allows writing to /tmp
TEMP_DIR = "/tmp"

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/purge', methods=['POST'])
def purge():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save uploaded file to temp
        input_path = os.path.join(TEMP_DIR, file.filename)
        file.save(input_path)
        
        output_filename = f"purged_{file.filename}"
        output_path = os.path.join(TEMP_DIR, output_filename)

        success = run_purge_pipeline(input_path, output_path)
        
        if success and os.path.exists(output_path):
            return send_file(output_path, as_attachment=True, download_name=output_filename)
        
        return jsonify({"error": "Purge failed"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/replace', methods=['POST'])
def replace():
    if 'target' not in request.files or 'template' not in request.files:
        return jsonify({"error": "Missing target or template file"}), 400
    
    target_file = request.files['target']
    template_file = request.files['template']
    
    try:
        target_path = os.path.join(TEMP_DIR, target_file.filename)
        template_path = os.path.join(TEMP_DIR, template_file.filename)
        
        target_file.save(target_path)
        template_file.save(template_path)
        
        output_filename = f"replaced_{target_file.filename}"
        output_path = os.path.join(TEMP_DIR, output_filename)

        success = run_replace_pipeline(target_path, template_path, output_path)
        
        if success and os.path.exists(output_path):
            return send_file(output_path, as_attachment=True, download_name=output_filename)
            
        return jsonify({"error": "Replace failed"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Vercel serverless function handler
def handler(request):
    with app.request_context(request.environ):
        return app.full_dispatch_request()
