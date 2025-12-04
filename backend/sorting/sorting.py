def get_sort_key(element, priority_map, default_priority=99):
    label = element.get('label', '')
    prefix = "OET"
    number = 999999
    
    if label:
        parts = label.split('-')
        if len(parts) > 0:
            p = parts[0].upper()
            if p in priority_map:
                prefix = p
        if len(parts) > 1:
            try:
                num_str = ''.join(filter(str.isdigit, parts[1]))
                if num_str:
                    number = int(num_str)
            except ValueError:
                pass
                
    priority = priority_map.get(prefix, default_priority)
    return (priority, number, label)

def apply_sorting(root, config):
    """
    Sorts elements in the XML tree based on priority rules.
    """
    priority_map = config.get("priority_map", {})
    default_priority = config.get("default_priority", 99)
    
    actor_sort_map = {} 
    static_mesh_sort_map = {}
    
    actor_meshes = []
    static_meshes = []
    metadatas = []
    others = []
    
    for child in list(root):
        if child.tag == 'ActorMesh':
            actor_meshes.append(child)
            key = get_sort_key(child, priority_map, default_priority)
            uuid_val = child.get('name')
            if uuid_val:
                actor_sort_map[uuid_val] = key
            
            mesh_ref = child.find('mesh')
            if mesh_ref is not None:
                sm_uuid = mesh_ref.get('name')
                if sm_uuid and sm_uuid not in static_mesh_sort_map:
                    static_mesh_sort_map[sm_uuid] = key
                    
        elif child.tag == 'StaticMesh':
            static_meshes.append(child)
        elif child.tag == 'MetaData':
            metadatas.append(child)
        else:
            others.append(child)
            
    actor_meshes.sort(key=lambda x: get_sort_key(x, priority_map, default_priority))
    static_meshes.sort(key=lambda x: static_mesh_sort_map.get(x.get('name'), (default_priority, 999999, '')))
    
    def get_metadata_key(md):
        ref = md.get('reference', '')
        if ref.startswith('Actor.'):
            uuid_val = ref.split('.')[1]
            return actor_sort_map.get(uuid_val, (default_priority, 999999, ''))
        return (default_priority, 999999, '')
        
    metadatas.sort(key=get_metadata_key)
    
    grouped = {'header': [], 'static_mesh': static_meshes, 'middle': [], 
               'actor_mesh': actor_meshes, 'materials': [], 'metadata': metadatas, 'footer': []}
    
    header_tags = ['Version', 'SDKVersion', 'Host', 'Application', 'ResourcePath', 'User', 'Geolocation']
    
    for elem in others:
        if elem.tag in header_tags:
            grouped['header'].append(elem)
        elif elem.tag in ['Camera', 'Actor']:
            grouped['middle'].append(elem)
        elif elem.tag == 'MaterialInstance':
            grouped['materials'].append(elem)
        else:
            if len(elem) == 0 and len(elem.attrib) < 2:
                grouped['header'].append(elem)
            else:
                grouped['middle'].append(elem)

    root.clear()
    for k in ['header', 'static_mesh', 'middle', 'actor_mesh', 'materials', 'metadata', 'footer']:
        for elem in grouped[k]:
            root.append(elem)
