import os
from flask import Flask, request, send_file, jsonify
from backend.functions.fn_00_pipelines.replace_pipeline import run_replace_pipeline

app = Flask(__name__)

@app.route("/", methods=["POST"])
def replace():
    target = request.files.get("target")
    template = request.files.get("template")

    if not target or not template:
        return jsonify({"error": "Faltan archivos target o template"}), 400

    target_path = "/tmp/target.udatasmith"
    template_path = "/tmp/template.udatasmith"
    output_path = "/tmp/output.udatasmith"

    target.save(target_path)
    template.save(template_path)

    run_replace_pipeline(target_path, template_path, output_path)

    if not os.path.exists(output_path):
        return jsonify({"error": "No se generó archivo de salida"}), 500

    return send_file(
        output_path,
        as_attachment=True,
        download_name="reemplazado.udatasmith"
    )

if __name__ == "__main__":
    app.run(debug=True)
