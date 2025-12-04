class PurgeRule:
    def __init__(self, tag, path, attributes):
        self.tag = tag
        self.path = path
        self.attributes = attributes

    def matches(self, element, current_path):
        # 1. Tag match (Case insensitive)
        if element.tag.lower() != self.tag.lower():
            return False
        
        # 2. Path match (Case insensitive, filter children)
        if not self.path:
            # If no path is defined (e.g. regex mode), match anywhere
            pass
        else:
            filtered_path = [p.lower() for p in current_path if p.lower() != 'children']
            rule_path = [p.lower() for p in self.path]
            
            if len(filtered_path) < len(rule_path):
                return False
                
            if filtered_path[-len(rule_path):] != rule_path:
                return False
            
        # 3. Attribute match (Context Aware)
        if self.tag == 'KeyValueProperty':
            if 'name' in self.attributes:
                name = element.attrib.get('name')
                if name != self.attributes['name']:
                    return False
                if name in ['Element*Category', 'Element*Family']:
                    return True
            if 'val' in self.attributes:
                if element.attrib.get('val') != self.attributes['val']:
                    return False
            return True
            
        elif self.tag == 'tag':
            if 'value' in self.attributes:
                rule_val = self.attributes['value']
                target_val = element.attrib.get('value', '')
                if rule_val.startswith('Revit.'):
                    prefix = '.'.join(rule_val.split('.')[:3])
                    return target_val.startswith(prefix)
                return target_val == rule_val
            return True
            
        elif self.tag == 'Actor':
            # Priority to layer/label over name (UUID)
            if 'layer' in self.attributes:
                if element.attrib.get('layer') == self.attributes['layer']:
                    return True
            if 'label' in self.attributes:
                if element.attrib.get('label') == self.attributes['label']:
                    return True
            if 'name' in self.attributes:
                return element.attrib.get('name') == self.attributes['name']
            return True
            
        elif self.tag == 'MetaData':
             if 'name' in self.attributes:
                 return element.attrib.get('name') == self.attributes['name']
             return True
             
        elif self.tag == 'Export':
            return True
             
        else:
            for k, v in self.attributes.items():
                if element.attrib.get(k) != v:
                    return False
            return True

def apply_purge(root, rules):
    """
    Traverses the XML tree and removes elements matching the purge rules.
    Returns the count of removed elements.
    """
    removed_count = 0
    
    # 0. Pre-scan for Level UUIDs (Dynamic Purge)
    level_uuids = set()
    for actor in root.findall(".//Actor"):
        if actor.get('layer') == 'Levels':
            name = actor.get('name')
            if name:
                level_uuids.add(name)

    def traverse(element, path):
        nonlocal removed_count
        current_path = path + [element.tag]
        
        for child in list(element):
            traverse(child, current_path)
            
            should_remove = False
            for rule in rules:
                if rule.matches(child, current_path):
                    should_remove = True
                    break
            
            if not should_remove:
                if child.tag == 'Actor' and child.get('layer') == 'Levels':
                    should_remove = True
                elif child.tag == 'MetaData':
                    ref = child.get('reference', '')
                    if ref.startswith('Actor.'):
                        uuid_val = ref.split('.')[1]
                        if uuid_val in level_uuids:
                            should_remove = True

            if should_remove:
                if child.tag in ['Actor', 'children']:
                    try:
                        current_children = list(element)
                        if child in current_children:
                            index = current_children.index(child)
                            for i, grandchild in enumerate(list(child)):
                                element.insert(index + i, grandchild)
                            element.remove(child)
                            removed_count += 1
                    except ValueError:
                        pass
                else:
                    element.remove(child)
                    removed_count += 1

    traverse(root, [])
    return removed_count
