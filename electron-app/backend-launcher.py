"""
SimAutomation Backend Launcher
Starts Flask server for Electron app
"""
import os
import sys
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

# Add the project root directory to sys.path
if getattr(sys, 'frozen', False):
    # Running in a bundle
    bundle_dir = sys._MEIPASS
else:
    # Running in a normal Python environment
    project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    sys.path.insert(0, project_dir)

# Import pipeline functions
from backend.pipelines.purge_pipeline import run_purge_pipeline
from backend.pipelines.replace_pipeline import run_replace_pipeline

app = Flask(__name__)
CORS(app)

# Configure Flask for larger file uploads
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB limit for desktop

# Desktop app uses AppData for temp files
TEMP_DIR = os.path.join(os.environ.get('APPDATA', os.path.expanduser('~')), 'SimAutomation', 'temp')
os.makedirs(TEMP_DIR, exist_ok=True)

@app.route('/')
@app.route('/api')
def index():
    return jsonify({"message": "SimAutomation API", "version": "1.0", "mode": "desktop"})

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
        
        output_filename = f"purged_{file.filename}"
        output_path = os.path.join(TEMP_DIR, output_filename)

        success = run_purge_pipeline(input_path, output_path)
        
        if success and os.path.exists(output_path):
            return send_file(output_path, as_attachment=True, download_name=output_filename)
        
        return jsonify({"error": "Purge failed"}), 500
    except Exception as e:
        import traceback
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500
    finally:
        # Clean up temp files
        if os.path.exists(input_path):
            try:
                os.remove(input_path)
            except:
                pass

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
        import traceback
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500
    finally:
        # Clean up temp files
        for path in [target_path, template_path]:
            if os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[SimAutomation Backend] Starting on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=False)
