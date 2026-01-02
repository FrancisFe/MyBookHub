# 🔐 Guía de Seguridad - Información Sensible

## ⚠️ INFORMACIÓN CONFIDENCIAL

Este archivo explica cómo gestionar credenciales y datos sensibles en el proyecto.

---

## 📋 Archivos Protegidos (NO subir a GitHub)

Los siguientes archivos contienen información sensible y **NO deben** subirse al repositorio:

### Backend
- `appsettings.json` - Connection strings y JWT secrets
- `appsettings.Development.json` - Configuración de desarrollo
- `.env` - Variables de entorno locales

### Frontend
- `.env.local` - Variables de entorno locales
- `.env.production.local` - Configuración de producción

---

## ✅ Qué Hacer

### 1. **Usar Archivos de Ejemplo**
Se proporcionan archivos `.example` como plantilla:
- `appsettings.example.json`
- `.env.example`

Copia estos archivos y reemplaza con tus valores reales:

```bash
# Backend
cp appsettings.example.json appsettings.json

# Frontend
cp .env.example .env.local
```

### 2. **Variables de Entorno (Recomendado)**

En lugar de hardcodear credenciales, usa variables de entorno:

#### Backend (.NET)
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtToken = builder.Configuration["AppSettings:Token"];
```

#### Frontend (Next.js)
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### 3. **Configuración en Production**

Para desplegar en producción, establece las variables de entorno en:

**Azure/AWS/Heroku:**
```
Variables de entorno en el panel de control
Settings → Config Vars
```

**Docker:**
```dockerfile
ENV DB_PASSWORD=${DB_PASSWORD}
ENV JWT_TOKEN=${JWT_TOKEN}
```

---

## 🚫 Información Sensible a Proteger

- ✗ Connection strings de bases de datos
- ✗ Contraseñas de usuarios
- ✗ API Keys y Tokens (JWT, Stripe, etc.)
- ✗ Claves privadas
- ✗ Información personal (emails, teléfonos)
- ✗ Claves de encriptación

---

## 🔍 Verificar si Hay Información Expuesta

Si accidentalmente subiste información sensible a GitHub:

1. **Cambiar todas las credenciales inmediatamente**
2. **Limpiar el historio de Git:**
   ```bash
   # Opción 1: Usar BFG Repo-Cleaner
   bfg --delete-files appsettings.json
   
   # Opción 2: Usar git filter-branch
   git filter-branch --tree-filter 'rm -f appsettings.json' HEAD
   ```
3. **Force push:**
   ```bash
   git push --force-with-lease origin main
   ```

---

## 📚 Referencias Útiles

- [GitHub - Removing Sensitive Data](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [OWASP - Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
- [Microsoft - Secure Configuration](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration)

---

**Última actualización**: Enero 2026
