## Challenge Backend

Backend construido con NestJS, Prisma y TypeScript para gestionar usuarios, cuestionarios y desafíos. Este README describe la arquitectura del proyecto, cómo ejecutarlo localmente, flujo de base de datos y pautas para extenderlo.

### Stack principal
- Node.js + TypeScript
- NestJS (arquitectura modular: `Controller` → `Service` → `Repository/Prisma`)
- Prisma ORM (`PostgreSQL` u otro motor compatible)
- Autenticación/Autorización con JWT y Guards

---

## Arquitectura del proyecto

El proyecto sigue la estructura estándar de NestJS por módulos de dominio. Cada módulo encapsula su propio `controller`, `service`, `dto` y `entities`. Prisma actúa como capa de acceso a datos y se expone vía `PrismaService`.

### Vista general por capas
- **Controllers**: reciben solicitudes HTTP, validan DTOs y delegan en servicios.
- **Services**: contienen la lógica de negocio; orquestan Prisma y otras dependencias.
- **PrismaModule/Service**: proveen acceso tipado a la base de datos.
- **Authorization**: guards y estrategias (`JWT`, `Local`, `Hybrid`) para proteger rutas y roles.
- **Filters**: manejo centralizado de excepciones de Prisma.

### Árbol de directorios relevante

```text
src/
  app.module.ts
  authorization/
    authorization.guard.ts
    authorization.module.ts
    hybrid-auth.guard.ts
    jwt.strategy.ts
    local-auth.guard.ts
    roles/
      roles.decorator.ts
      roles.guard.ts
  prisma/
    prisma.module.ts
    prisma.service.ts
  filters/
    prisma-exception.filter.ts
  user/
    user.controller.ts
    user.module.ts
    user.service.ts
    dto/
    entities/
  quiz/
    quiz.controller.ts
    quiz.module.ts
    quiz.service.ts
    quiz.validator.ts
    dto/
    entities/
  challenge/
    challenge.controller.ts
    challenge.module.ts
    challenge.service.ts
    dto/
    entities/
  module/               ← módulo de negocio "module" (no confundir con Nest Module)
    module.controller.ts
    module.module.ts
    module.service.ts
    dto/
    entities/
  cell/
    cell.controller.ts
    cell.module.ts
    cell.service.ts
    dto/
    entities/
  question/
    question.controller.ts
    question.module.ts
    question.service.ts
    dto/
    entities/
```

### Detalles clave de la arquitectura
- **Modularidad fuerte**: cada dominio (usuarios, quiz, challenge, question, cell, module) está aislado y expone su API vía su `controller`.
- **DTOs**: definen y validan la forma de entrada/salida. Aseguran contratos estables.
- **Entities**: modelan la capa de dominio. En combinación con `schema.prisma` describen el modelo persistente.
- **Prisma**: `PrismaService` centraliza el cliente; se inyecta en servicios. Los errores se canalizan por `PrismaExceptionFilter`.
- **Auth**:
  - `jwt.strategy.ts`: estrategia JWT.
  - `local-auth.guard.ts` y `hybrid-auth.guard.ts`: flujos de autenticación.
  - `roles.guard.ts` + `roles.decorator.ts`: autorización basada en roles.

---

## Configuración e instalación

1) Instalar dependencias
```bash
npm install
```

2) Variables de entorno (ejemplo `.env`)
Ver .env.template

3) Preparar base de datos con Prisma
```bash
npx prisma migrate dev
npx prisma generate
npm run seed           # si está disponible, usa prisma/seed.ts
```


---

## Scripts útiles
```bash
# Desarrollo con hot-reload
npm run start:dev

# Producción
npm run build && npm run start:prod

# Pruebas
npm run test           # unit
npm run test:e2e       # e2e
npm run test:cov       # cobertura
```

---

## Ejecución
```bash
# modo desarrollo
npm run start:dev

# http://localhost:3000
```



## Manejo de errores
- `filters/prisma-exception.filter.ts` captura y mapea errores de Prisma a respuestas HTTP consistentes.
- Usa DTOs para validación anticipada; evita exponer detalles internos.

---

## Autenticación y autorización
- Autenticación con JWT a través de `jwt.strategy.ts`.
- Guards `local`, `hybrid` y `authorization.guard.ts` para proteger endpoints.
- Roles con `@Roles()` y `RolesGuard`.

---

## Guía para extender el proyecto
1) Crear un nuevo dominio (ej. `lesson`):
   - `nest g module lesson`, `nest g controller lesson`, `nest g service lesson`.
   - Añadir `dto/` y `entities/` dentro del dominio.
2) Añadir modelos al `schema.prisma` y migrar.
3) Inyectar `PrismaService` en el `service` para acceso a datos.
4) Proteger rutas con guards/roles según sea necesario.

