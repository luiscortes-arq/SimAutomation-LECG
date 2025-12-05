from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import os
import sys

# Add the root directory to sys.path for imports
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, root_dir)

# Import pipeline functions
try:
    from backend.pipelines.purge_pipeline import run_purge_pipeline
    from backend.pipelines.replace_pipeline import run_replace_pipeline
except ImportError as e:
    print(f"Import error: {e}")
    print(f"sys.path: {sys.path}")
    # Create dummy functions if imports fail
    def run_purge_pipeline(input_path, output_path):
        return False
    def run_replace_pipeline(target_path, template_path, output_path):
        return False

app = Flask(__name__)
CORS(app)

# Configure Flask for larger file uploads
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB limit

# Vercel only allows writing to /tmp
TEMP_DIR = "/tmp"

@app.route('/')
@app.route('/api')
def index():
    return jsonify({"message": "SIM Automation API", "version": "1.0"})

@app.route('/api/health')
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
        
        # Check file size
        file_size = os.path.getsize(input_path)
        if file_size > 4.5 * 1024 * 1024:  # 4.5MB Vercel limit
            os.remove(input_path)
            return jsonify({
                "error": "File too large", 
                "message": "Vercel has a 4.5MB limit for file uploads. Please upgrade to Vercel Pro for larger files or use a different deployment method.",
                "file_size": file_size,
                "limit": 4.5 * 1024 * 1024
            }), 413
        
        output_filename = f"purged_{file.filename}"
        output_path = os.path.join(TEMP_DIR, output_filename)

        success = run_purge_pipeline(input_path, output_path)
        
        if success and os.path.exists(output_path):
            return send_file(output_path, as_attachment=True, download_name=output_filename)
        
        return jsonify({"error": "Purge failed"}), 500
    except Exception as e:
        import traceback
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

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
        
        # Check combined file size
        target_size = os.path.getsize(target_path)
        template_size = os.path.getsize(template_path)
        total_size = target_size + template_size
        
        if total_size > 4.5 * 1024 * 1024:  # 4.5MB Vercel limit
            os.remove(target_path)
            os.remove(template_path)
            return jsonify({
                "error": "Files too large", 
                "message": "Vercel has a 4.5MB limit for total file uploads. Please upgrade to Vercel Pro for larger files or use a different deployment method.",
                "total_size": total_size,
                "limit": 4.5 * 1024 * 1024
            }), 413
        
        output_filename = f"replaced_{target_file.filename}"
        output_path = os.path.join(TEMP_DIR, output_filename)

        success = run_replace_pipeline(target_path, template_path, output_path)
        
        if success and os.path.exists(output_path):
            return send_file(output_path, as_attachment=True, download_name=output_filename)
            
        return jsonify({"error": "Replace failed"}), 500
    except Exception as e:
        import traceback
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500


