import re

# Leer el SVG original
with open(r'c:\LECG\SimAutomation\frontend\app\src\assets\logo\logo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Reemplazar todos los posibles formatos de color blanco con negro
content = re.sub(r'#FFFFFF', '#000000', content, flags=re.IGNORECASE)
content = re.sub(r'#FFF\b', '#000', content, flags=re.IGNORECASE)
content = re.sub(r'rgb\s*\(\s*255\s*,\s*255\s*,\s*255\s*\)', 'rgb(0,0,0)', content, flags=re.IGNORECASE)
content = re.sub(r'\bwhite\b', 'black', content, flags=re.IGNORECASE)

# Guardar el nuevo SVG
with open(r'c:\LECG\SimAutomation\frontend\app\src\assets\logo\logo-light.svg', 'w', encoding='utf-8') as f:
    f.write(content)

print("Logo light created successfully")
print(f"Replacements made: {content.count('#000000')} black fills")
