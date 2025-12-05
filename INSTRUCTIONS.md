# SimAutomation - Guía Maestra

Este documento contiene todas las instrucciones necesarias para desarrollar, construir y desplegar la aplicación SimAutomation.

## 1. Git Workflow (Control de Versiones)

### Guardar cambios (Commit)

```bash
git add .
git commit -m "Descripción breve de los cambios"
```

### Subir cambios (Push)

```bash
git push origin main
```

### Traer cambios (Pull)

```bash
git pull origin main
```

---

## 2. Desarrollo Local (Live Server)

Para probar la aplicación web localmente con recarga automática:

```bash
cd frontend/app
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 3. Construcción (Build)

### Aplicación de Escritorio (Portable)

Este comando genera el archivo ZIP portable que incluye Backend y Frontend.

```powershell
cd electron-app
.\build-all.ps1
```

El archivo final estará en: `electron-app/build/SimAutomation-Portable.zip`

### Aplicación Web (Vercel)

Vercel construye automáticamente la aplicación cuando haces un `git push`.
Si necesitas construir localmente para probar:

```bash
cd frontend/app
npm run build
```

---

## 4. Despliegue (Deployment)

### Vercel (Web)

El despliegue es automático al hacer push a la rama `main`.
Para verificar el estado o desplegar manualmente:

```bash
vercel
```

(Requiere tener Vercel CLI instalado: `npm i -g vercel`)

---

## 5. Estructura del Proyecto

- **`frontend/app/src/config/`**: Configuración centralizada.
  - `theme.ts`: Colores y tipografía.
  - `icons.tsx`: Íconos de la aplicación.
  - `texts.ts`: Textos y etiquetas.
- **`backend/`**: Lógica de procesamiento Python.
- **`electron-app/`**: Empaquetado para escritorio.
- **`scripts/`**: Herramientas de utilidad.

---

## 6. Notas Importantes

- **Límite de Archivos**: Vercel tiene un límite de 4.5MB para uploads en la versión gratuita. La versión de escritorio no tiene este límite.
- **IPv6**: El backend local usa `127.0.0.1` para evitar problemas con IPv6 en Windows.
