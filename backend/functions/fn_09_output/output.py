import xml.etree.ElementTree as ET

def format_element(elem, indent="    ", compact_elements=None, expanded_elements=None, level=0):
    """
    Formats an XML element with custom indentation and attribute placement.
    Mimics the 'Prettier' style logic from the original script.
    """
    if compact_elements is None:
        compact_elements = set()
    if expanded_elements is None:
        expanded_elements = set()

    tag = elem.tag
    attribs = elem.attrib
    children = list(elem)
    text = elem.text.strip() if elem.text else ""
    
    is_expanded = tag in expanded_elements or (tag not in compact_elements and len(attribs) > 0)
    indent_str = indent * level
    lines = []
    
    if is_expanded and attribs:
        lines.append(f"{indent_str}<{tag}")
        for key, value in attribs.items():
            lines.append(f"{indent_str}{indent}{key}=\"{value}\"")
        if not children and not text:
            lines.append(f"{indent_str}/>")
            return "\n".join(lines)
        else:
            lines.append(f"{indent_str}>")
    else:
        attr_str = " ".join([f'{k}="{v}"' for k, v in attribs.items()])
        start_tag = f"{indent_str}<{tag} {attr_str}" if attr_str else f"{indent_str}<{tag}"
        if not children and not text:
            return f"{start_tag}/>"
        if not children and text:
            return f"{start_tag}>{text}</{tag}>"
        lines.append(f"{start_tag}>")

    if text:
        lines.append(f"{indent_str}{indent}{text}")
    for child in children:
        lines.append(format_element(child, indent, compact_elements, expanded_elements, level + 1))
    lines.append(f"{indent_str}</{tag}>")
    return "\n".join(lines)

def save_xml(root, output_path, indent="    ", compact_elements=None, expanded_elements=None):
    """
    Formats and saves the XML tree to a file.
    """
    formatted_xml = format_element(root, indent, compact_elements, expanded_elements)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(formatted_xml)

def save_udatasmith(root, file_path, indent="    ", compact=None, expanded=None):
    """
    Saves the root element to a udatasmith file with custom formatting.
    """
    save_xml(root, file_path, indent, compact, expanded)
