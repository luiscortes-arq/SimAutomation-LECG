import uuid
import xml.etree.ElementTree as ET

def apply_grouping(root, config):
    """
    Groups ActorMesh elements by layer into new Actor containers.
    """
    group_by_attr = config.get("group_by_attribute", "layer")
    default_group = config.get("default_group_name", "Uncategorized")
    
    layer_map = {}
    actor_meshes = []
    others = []
    
    for child in list(root):
        if child.tag == 'ActorMesh':
            layer = child.get(group_by_attr, default_group)
            if layer not in layer_map:
                layer_map[layer] = []
            layer_map[layer].append(child)
            actor_meshes.append(child)
        else:
            others.append(child)
            
    if not actor_meshes:
        return

    new_groups = []
    for layer_name, children_elements in layer_map.items():
        group_uuid = str(uuid.uuid4()).replace('-', '')
        group_actor = ET.Element('Actor')
        group_actor.set('name', group_uuid)
        group_actor.set('label', layer_name)
        group_actor.set('layer', layer_name)
        group_actor.set('mobility', 'Static')
        
        transform = ET.SubElement(group_actor, 'Transform')
        for k, v in {'tx':'0','ty':'0','tz':'0','sx':'1','sy':'1','sz':'1','qx':'0','qy':'0','qz':'0','qw':'1'}.items():
            transform.set(k, v)
            
        children_tag = ET.SubElement(group_actor, 'children')
        for child in children_elements:
            children_tag.append(child)
        new_groups.append(group_actor)

    grouped = {'header': [], 'static_mesh': [], 'middle': [], 'materials': [], 'metadata': [], 'footer': []}
    header_tags = ['Version', 'SDKVersion', 'Host', 'Application', 'ResourcePath', 'User', 'Geolocation']
    
    for elem in others:
        if elem.tag in header_tags:
            grouped['header'].append(elem)
        elif elem.tag == 'StaticMesh':
            grouped['static_mesh'].append(elem)
        elif elem.tag in ['Camera', 'Actor']:
            grouped['middle'].append(elem)
        elif elem.tag == 'MaterialInstance':
            grouped['materials'].append(elem)
        elif elem.tag == 'MetaData':
            grouped['metadata'].append(elem)
        else:
            if len(elem) == 0 and len(elem.attrib) < 2:
                grouped['header'].append(elem)
            else:
                grouped['middle'].append(elem)
                
    root.clear()
    for elem in grouped['header']: root.append(elem)
    for elem in grouped['static_mesh']: root.append(elem)
    for elem in grouped['middle']: root.append(elem)
    for group in new_groups: root.append(group)
    for elem in grouped['materials']: root.append(elem)
    for elem in grouped['metadata']: root.append(elem)
    for elem in grouped['footer']: root.append(elem)
