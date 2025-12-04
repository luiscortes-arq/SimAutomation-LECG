import os
import sys
from backend.input.input import read_udatasmith
from backend.output.output import save_udatasmith
from backend.processor.processor import process_tree
from backend.prettier.prettier import load_formatting_rules, get_formatting_params

def run_purge_pipeline(input_path, output_path):
    print(f"Processing: {input_path}")
    
    # 1. Parse XML
    root = read_udatasmith(input_path)
    if root is None:
        return False

    # 2. Process Tree (Purge -> Rename -> Sort -> Group)
    process_tree(root)

    # 3. Save
    # Adjusted path: ../../fn_08_prettier/prettier.json
    prettier_config_path = os.path.join(os.path.dirname(__file__), "..", "prettier", "prettier.json")
    formatting_config = load_formatting_rules(prettier_config_path)
    indent, compact, expanded = get_formatting_params(formatting_config)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    save_udatasmith(root, output_path, indent, compact, expanded)
    print(f"  [SAVED] {output_path}\n")
    return True
