# Backend R.E.C

Backend para la aplicación R.E.C (Registro Estudiantil Centralizado), un sistema de gestión educativa.

## Requisitos previos

- Node.js (v14 o superior)
- XAMPP (para MySQL y phpMyAdmin)
- npm o yarn

## Configuración de la base de datos

1. Inicia XAMPP y asegúrate de que los servicios de Apache y MySQL están en ejecución
2. Abre phpMyAdmin en tu navegador (http://localhost/phpmyadmin)
3. Crea una nueva base de datos llamada `rec_db` (o importa el archivo SQL)
4. Para importar la estructura de la base de datos, sigue estos pasos:
   - En phpMyAdmin, selecciona la base de datos `rec_db`
   - Ve a la pestaña "Importar"
   - Selecciona el archivo `src/database/db.sql` de este proyecto
   - Haz clic en "Continuar" para importar la estructura

## Instalación

1. Clona este repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Configura la conexión a la base de datos:
   - Revisa y modifica si es necesario el archivo `src/config/dbConfig.js`

## Ejecución

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

Para iniciar el servidor en modo producción:
```
npm start
```

El servidor estará disponible en: http://localhost:3000

## Estructura del proyecto

- `src/`: Código fuente del proyecto
  - `config/`: Configuraciones del sistema
  - `controller/`: Controladores de la aplicación
  - `database/`: Configuración y utilidades de la base de datos
  - `routes/`: Definición de rutas API
  - `index.js`: Punto de entrada principal

## Acceso al sistema

- Usuario administrador por defecto:
  - Email: admin@rec.com
  - Contraseña: admin123 