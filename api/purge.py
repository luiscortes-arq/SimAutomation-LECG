import os
from flask import Flask, request, send_file, jsonify
from backend.functions.fn_00_pipelines.purge_pipeline import run_purge_pipeline

app = Flask(__name__)

@app.route("/", methods=["POST"])
def purge():
    archivo = request.files.get("file")
    if not archivo:
        return jsonify({"error": "No se envió archivo"}), 400

    input_path = "/tmp/input.udatasmith"
    output_path = "/tmp/output.udatasmith"

    archivo.save(input_path)

    # Tu pipeline actual, solo cambiando rutas a /tmp
    run_purge_pipeline(input_path, output_path)

    if not os.path.exists(output_path):
        return jsonify({"error": "No se generó archivo de salida"}), 500

    return send_file(
        output_path,
        as_attachment=True,
        download_name="purgado.udatasmith"
    )

# Para pruebas locales (opcional)
if __name__ == "__main__":
    app.run(debug=True)
