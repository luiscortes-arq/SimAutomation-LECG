import xml.etree.ElementTree as ET
import os

def parse_xml(file_path):
    """
    Parses an XML file and returns the root element.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"XML file not found: {file_path}")
    
    try:
        tree = ET.parse(file_path)
        return tree.getroot()
    except ET.ParseError as e:
        print(f"[ERROR] Failed to parse XML {file_path}: {e}")
        return None

def read_udatasmith(file_path):
    """
    Reads a udatasmith file and returns the root element.
    """
    return parse_xml(file_path)
