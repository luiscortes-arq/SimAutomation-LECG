import os
import sys
from backend.functions.fn_01_input.input import read_udatasmith
from backend.functions.fn_09_output.output import save_udatasmith
from backend.functions.fn_07_search_replace.search_replace import load_template_data, apply_replace
from backend.functions.fn_02_processor.processor import process_tree
from backend.functions.fn_08_prettier.prettier import load_formatting_rules, get_formatting_params

def run_replace_pipeline(target_path, template_path, output_path):
    # 1. Load & Process Template
    print(f"[INFO] Loading template: {template_path}")
    template_root = read_udatasmith(template_path)
    if template_root is None:
        return False
    
    print("[INFO] Processing Template Tree...")
    process_tree(template_root)
        
    template_data = load_template_data(template_root)
    print(f"[INFO] Loaded {len(template_data)} items from template.")
    
    # 2. Load & Process Target
    print(f"[INFO] Processing target: {target_path}")
    target_root = read_udatasmith(target_path)
    if target_root is None:
        return False
        
    print("[INFO] Processing Target Tree...")
    process_tree(target_root)
        
    # 3. Apply Replace
    counts = apply_replace(target_root, template_data)
    print(f"[REPLACE] Updated {counts[0]} ActorMesh, {counts[1]} StaticMesh, {counts[2]} MetaData references.")
    
    # 4. Save
    # Adjusted path: ../../fn_08_prettier/prettier.json
    prettier_config_path = os.path.join(os.path.dirname(__file__), "..", "fn_08_prettier", "prettier.json")
    formatting_config = load_formatting_rules(prettier_config_path)
    indent, compact, expanded = get_formatting_params(formatting_config)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    print(f"[INFO] Formatting output...")
    save_udatasmith(target_root, output_path, indent, compact, expanded)
    print(f"[SAVED] {output_path}")
    return True
