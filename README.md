# 📚 MyBookHub

**Una plataforma moderna de venta y alquiler de libros**

---

## 📖 Descripción

MyBookHub es una aplicación full-stack que permite a los usuarios explorar, comprar y alquilar libros en línea. Ofrece una experiencia de usuario intuitiva con un catálogo extenso de títulos, carrito de compras, sistema de pedidos y procesamiento de pagos.

---

## 🎯 Características Principales

- ✅ **Catálogo de Libros**: Explorar libros por categoría y autor
- ✅ **Carrito de Compras**: Agregar libros al carrito con opción de compra o alquiler
- ✅ **Sistema de Autenticación**: Login/Registro seguro con JWT
- ✅ **Gestión de Pedidos**: Seguimiento de órdenes y estado de compras
- ✅ **Procesamiento de Pagos**: Integración con sistemas de pago
- ✅ **Panel de Administración**: Gestión de libros, autores y categorías
- ✅ **API RESTful**: Documentación con Swagger

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: .NET 10.0
- **Base de Datos**: PostgreSQL
- **ORM**: Entity Framework Core
- **Autenticación**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 16.0
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Query, Context API
- **UI Components**: Radix UI, Heroicons, Lucide React

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- **.NET SDK** 10.0 o superior
- **Node.js** 20.x o superior
- **PostgreSQL** 12 o superior
- **npm** o **yarn**

### Backend

1. **Navegar al directorio del backend**
```bash
cd backend/MyBookHub.API
```

2. **Restaurar dependencias**
```bash
dotnet restore
```

3. **Configurar la base de datos**
   - Editar `appsettings.Development.json` con tu conexión a PostgreSQL
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=mybookhub;Username=usuario;Password=contraseña"
     }
   }
   ```

4. **Ejecutar migraciones**
```bash
dotnet ef database update
```

5. **Iniciar la API**
```bash
dotnet run
```

La API estará disponible en `http://localhost:5140`
Swagger UI en `http://localhost:5140/swagger`

### Frontend

1. **Navegar al directorio del frontend**
```bash
cd frontend/my-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
   - Crear archivo `.env.local` en la raíz de `frontend/my-app`
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5140
   ```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📡 API Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/refresh` - Renovar token

### Libros
- `GET /api/books` - Obtener todos los libros
- `GET /api/books/{id}` - Obtener libro por ID
- `POST /api/books` - Crear libro (Admin)
- `PUT /api/books/{id}` - Actualizar libro (Admin)
- `DELETE /api/books/{id}` - Eliminar libro (Admin)

### Carrito
- `GET /api/cart` - Obtener carrito del usuario
- `POST /api/cart/items` - Agregar artículo al carrito
- `DELETE /api/cart/items/{id}` - Eliminar artículo

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders` - Obtener pedidos del usuario
- `GET /api/orders/{id}` - Obtener detalles del pedido

### Categorías
- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear categoría (Admin)

### Autores
- `GET /api/authors` - Obtener todos los autores
- `POST /api/authors` - Crear autor (Admin)

---

## 📝 Scripts Útiles

### Backend
```bash
# Desarrollo
dotnet run

# Build
dotnet build

# Ejecutar tests
dotnet test

# Crear migración
dotnet ef migrations add NombreMigracion

# Actualizar base de datos
dotnet ef database update
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm build

# Iniciar servidor de producción
npm start

# Lint
npm run lint
```

---


## 🔧 Configuración por Entorno

### Development
- CORS habilitado para `localhost:3000`, `localhost:3001`, `localhost:5140`
- Swagger UI disponible
- Logs en consola y debug

### Production
- CORS restringido a dominios autorizados
- Swagger deshabilitado (opcional)
- HTTPS obligatorio
- Logs a archivo o servicio externo

---

## 📧 Contacto

**MyBookHub**
- Email: contact@mybookhub.com
- Website: (próximamente)

---


## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📋 Estado del Proyecto

**Versión Actual**: v0.1  
**Estado**: En Desarrollo 🚧

### Próximas Características
- [ ] Sistema de comentarios y reseñas
- [ ] Recomendaciones personalizadas
- [ ] Wishlist
- [ ] Notificaciones por email
- [ ] Panel de análisis para administradores
- [ ] Internacionalización (i18n)

---

**Última actualización**: Enero 2026