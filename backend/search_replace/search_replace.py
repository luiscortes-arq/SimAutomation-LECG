import xml.etree.ElementTree as ET

def load_template_data(root):
    """
    Extracts data from the template XML root.
    Returns a dictionary mapping label -> {actor_uuid, mesh_hash, static_mesh_hash}
    """
    data = {} 
    
    # 1. StaticMesh Map
    static_mesh_map = {} # label -> name (hash)
    for sm in root.findall("StaticMesh"):
        label = sm.get('label')
        name = sm.get('name')
        if label and name:
            static_mesh_map[label] = name
            
    # 2. ActorMesh Map
    for am in root.findall(".//ActorMesh"):
        label = am.get('label')
        uuid_val = am.get('name')
        if label and uuid_val:
            mesh_elem = am.find("mesh")
            mesh_hash = mesh_elem.get('name') if mesh_elem is not None else None
            
            data[label] = {
                "actor_uuid": uuid_val,
                "mesh_hash": mesh_hash,
                "static_mesh_hash": static_mesh_map.get(label)
            }
    return data

def apply_replace(target_root, template_data):
    """
    Injects values from template_data into target_root.
    Returns a tuple of counts (actors, static_meshes, metadata).
    """
    uuid_map = {} # old_uuid -> new_uuid
    
    # 1. Update ActorMesh
    count_actors = 0
    for am in target_root.findall(".//ActorMesh"):
        label = am.get('label')
        if label and label in template_data:
            t_data = template_data[label]
            
            old_uuid = am.get('name')
            new_uuid = t_data['actor_uuid']
            
            if old_uuid != new_uuid:
                am.set('name', new_uuid)
                uuid_map[old_uuid] = new_uuid
                
            # Update mesh reference
            if t_data['mesh_hash']:
                mesh_elem = am.find("mesh")
                if mesh_elem is not None:
                    mesh_elem.set('name', t_data['mesh_hash'])
                else:
                    ET.SubElement(am, "mesh", attrib={"name": t_data['mesh_hash']})
            
            count_actors += 1

    # 2. Update StaticMesh
    count_static = 0
    for sm in target_root.findall("StaticMesh"):
        label = sm.get('label')
        if label and label in template_data:
            t_data = template_data[label]
            if t_data['static_mesh_hash']:
                sm.set('name', t_data['static_mesh_hash'])
                count_static += 1
                
    # 3. Update MetaData references
    count_metadata = 0
    for metadata in target_root.findall("MetaData"):
        ref = metadata.get('reference', '')
        if ref.startswith("Actor."):
            old_uuid = ref.split('.')[1]
            if old_uuid in uuid_map:
                new_uuid = uuid_map[old_uuid]
                metadata.set('reference', f"Actor.{new_uuid}")
                count_metadata += 1
                
    return count_actors, count_static, count_metadata
