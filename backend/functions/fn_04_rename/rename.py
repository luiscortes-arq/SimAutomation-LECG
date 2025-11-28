def apply_fixed_renaming(root, config):
    """
    Applies fixed renaming rules (e.g. User ID/OS, MetaData names).
    """
    fixed_rules = config.get("fixed", {})
    
    # 1. Rename User
    user_rules = fixed_rules.get("User", {})
    user_elem = root.find("User")
    if user_elem is not None:
        for attr, val in user_rules.items():
            user_elem.set(attr, val)

    # 2. Rename MetaData (ActorMesh)
    metadata_rules = fixed_rules.get("MetaData", {})
    if not metadata_rules:
        return

    actor_mesh_uuids = set()
    for am in root.findall(".//ActorMesh"):
        uuid_val = am.get('name')
        if uuid_val:
            actor_mesh_uuids.add(uuid_val)
            
    for metadata in root.findall("MetaData"):
        ref = metadata.get('reference', '')
        if ref.startswith("Actor."):
            uuid_val = ref.split('.')[1]
            if uuid_val in actor_mesh_uuids:
                for attr, val in metadata_rules.items():
                    metadata.set(attr, val)

def apply_contextual_renaming(root, config):
    """
    Applies contextual renaming based on Element*Type properties.
    """
    contextual_config = config.get("contextual", {})
    key_name = contextual_config.get("key", "Element*Type")
    
    # Collect Actor UUID -> Element*Type mapping
    actor_type_map = {}
    
    for metadata in root.findall(".//MetaData"):
        ref = metadata.get('reference', '')
        if ref.startswith('Actor.'):
            actor_uuid = ref.split('.')[1]
            # Find Element*Type property
            for kv in metadata.findall("KeyValueProperty"):
                if kv.get('name') == key_name:
                    val = kv.get('val')
                    if val:
                        actor_type_map[actor_uuid] = val
                    break
    
    # Apply renaming
    for child in root.iter():
        if child.tag == 'ActorMesh':
            uuid_val = child.get('name')
            if uuid_val in actor_type_map:
                new_label = actor_type_map[uuid_val]
                child.set('label', new_label)
                
                # Propagate to StaticMesh
                mesh_ref = child.find('mesh')
                if mesh_ref is not None:
                    mesh_name = mesh_ref.get('name')
                    # Find StaticMesh with this name
                    for sm in root.findall(".//StaticMesh"):
                        if sm.get('name') == mesh_name:
                            sm.set('label', new_label)
                            break
