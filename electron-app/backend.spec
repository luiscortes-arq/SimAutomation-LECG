# -*- mode: python ; coding: utf-8 -*-

import os
import sys

# Get absolute paths
backend_root = os.path.abspath(os.path.join(SPECPATH, '..', 'backend'))
project_root = os.path.abspath(os.path.join(SPECPATH, '..'))
config_root = os.path.abspath(os.path.join(SPECPATH, '..', 'config'))

# Collect all backend modules
backend_modules = []
for root, dirs, files in os.walk(backend_root):
    for file in files:
        if file.endswith('.py'):
            backend_modules.append(os.path.join(root, file))

# Collect data files (JSON configs, etc.)
datas = [
    (os.path.join(backend_root, 'prettier', 'prettier.json'), 'backend/prettier'),
]

# Add config files if they exist
if os.path.exists(config_root):
    for root, dirs, files in os.walk(config_root):
        for file in files:
            if file.endswith('.json'):
                rel_path = os.path.relpath(root, os.path.join(SPECPATH, '..'))
                datas.append((os.path.join(root, file), rel_path))

a = Analysis(
    ['backend-launcher.py'],
    pathex=[SPECPATH, project_root],
    binaries=[],
    datas=datas,
    hiddenimports=[
        'flask',
        'flask_cors',
        'backend.pipelines.purge_pipeline',
        'backend.pipelines.replace_pipeline',
        'backend.input.input',
        'backend.output.output',
        'backend.processor.processor',
        'backend.search_replace.search_replace',
        'backend.prettier.prettier',
        'backend.purge.purge',
        'backend.grouping.grouping',
        'backend.sorting.sorting',
        'backend.rename.rename',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['matplotlib', 'numpy', 'pandas', 'scipy'],
    noarchive=False,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='simautomation-backend',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
