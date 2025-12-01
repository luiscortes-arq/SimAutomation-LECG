export async function uploadFileSingle(file, endpoint, downloadName = 'resultado.udatasmith') {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  if (!resp.ok) {
    const texto = await resp.text().catch(() => '');
    throw new Error(`Error backend: ${resp.status} ${texto}`);
  }

  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function uploadFileDouble(targetFile, templateFile, endpoint, downloadName = 'resultado.udatasmith') {
  const formData = new FormData();
  formData.append('target', targetFile);
  formData.append('template', templateFile);

  const resp = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  if (!resp.ok) {
    const texto = await resp.text().catch(() => '');
    throw new Error(`Error backend: ${resp.status} ${texto}`);
  }

  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
