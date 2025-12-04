import json
import os
from backend.purge.purge import apply_purge, PurgeRule
from backend.rename.rename import apply_fixed_renaming, apply_contextual_renaming
from backend.sorting.sorting import apply_sorting
from backend.grouping.grouping import apply_grouping

def flatten_root_children(node):
    """
    Unwraps <children> tags left at the root level, inserting their children directly into the root.
    """
    found = True
    while found:
        found = False
        for child in list(node):
            if child.tag == 'children':
                index = list(node).index(child)
                for grandchild in list(child):
                    node.insert(index, grandchild)
                    index += 1
                node.remove(child)
                found = True
                break

def load_local_config(module_path, filename):
    """
    Loads a JSON config file from the same directory as the module.
    """
    config_path = os.path.join(os.path.dirname(module_path), filename)
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return json.load(f)
    return {}

def process_tree(root):
    """
    Applies the standard processing chain: Purge -> Rename -> Sort -> Group.
    """
    # 1. Load Rules & Configs
    
    # Purge Config
    purge_config = load_local_config(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "purge", "purge.py")), "purge.json")
    purge_rules = [PurgeRule(r["tag"], [], r["attributes"]) for r in purge_config.get("rules", [])]
    
    # Rename Config
    rename_config = load_local_config(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "rename", "rename.py")), "rename.json")
    
    # Sorting Config
    sorting_config = load_local_config(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sorting", "sorting.py")), "sorting.json")
    
    # Grouping Config
    grouping_config = load_local_config(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "grouping", "grouping.py")), "grouping.json")

    # 2. Purge
    removed = apply_purge(root, purge_rules)
    print(f"  [PURGE] Removed {removed} elements")
    
    # 3. Flatten Root Children
    flatten_root_children(root)

    # 4. Rename
    apply_contextual_renaming(root, rename_config)
    apply_fixed_renaming(root, rename_config)
    print("  [RENAME] Applied renaming rules")

    # 5. Sort
    apply_sorting(root, sorting_config)
    print("  [SORT] Applied sorting")

    # 6. Group
    apply_grouping(root, grouping_config)
    print("  [GROUP] Applied grouping")
    
    return True
