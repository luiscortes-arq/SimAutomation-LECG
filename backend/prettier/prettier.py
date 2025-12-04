import json
import os

def load_formatting_rules(config_path):
    """
    Loads formatting rules from a JSON configuration file.
    """
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return json.load(f)
    return {}

def get_formatting_params(rules):
    """
    Extracts indentation, compact, and expanded sets from rules.
    """
    indent = rules.get("indentation", "    ")
    compact = set(rules.get("compact_elements", []))
    expanded = set(rules.get("expanded_elements", []))
    return indent, compact, expanded
