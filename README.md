# FrontEnd — cfp7 · Mapa interactivo · Innovalab

Proyecto Angular 22. **El gestor de paquetes oficial de este repo es [pnpm](https://pnpm.io/) — no uses `npm` ni `yarn`.** Usar otro gestor genera lockfiles distintos y conflictos en el equipo.

---

## 1. Requisitos (instalar una sola vez en tu máquina)

### Node.js

Necesitás **Node.js 22.22.3 o superior** (o cualquier 24.x / 26.x). Verificá tu versión:

```bash
node -v
```

Si es menor, actualizá desde [nodejs.org](https://nodejs.org/) o, si usás [nvm-windows](https://github.com/coreybutler/nvm-windows/releases):

```bash
nvm install 24
nvm use 24
```

### pnpm

pnpm se gestiona con **corepack** (viene incluido con Node). Habilitalo y fijá la versión del proyecto:

```bash
corepack enable
corepack use pnpm@11.5.3
```

Verificá:

```bash
pnpm -v   # debería mostrar 11.5.3
```

> La versión de pnpm está fijada en el `package.json` (campo `packageManager`), así que todos usamos la misma.

### Angular CLI (opcional)

No es obligatorio instalarlo global, podés usar los comandos vía `pnpm`. Si lo querés global:

```bash
pnpm install -g @angular/cli@22
```

---

## 2. Levantar el proyecto (ya clonado)

```bash
git clone <url-del-repo>
cd FrontEnd
pnpm install
pnpm start
```

`pnpm start` corre `ng serve` y levanta el server de desarrollo en **http://localhost:4200/**. Recarga automáticamente al guardar cambios.

---

## 3. Notas importantes sobre pnpm 11

pnpm 11 trae dos protecciones de seguridad activadas por defecto que pueden frenar la instalación. **Ya están resueltas en el archivo `pnpm-workspace.yaml` del repo**, así que normalmente no tenés que hacer nada. Las documentamos por si aparecen.

### `minimumReleaseAge` (cuarentena de paquetes nuevos)

pnpm 11 bloquea por defecto los paquetes publicados hace menos de 1 día (protección contra ataques de cadena de suministro). Si instalás una versión de Angular recién salida, puede dar:

```
ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION
```

En este repo está desactivado con `minimumReleaseAge: 0` en `pnpm-workspace.yaml`.

### `allowBuilds` (scripts de instalación)

pnpm 11 no ejecuta los scripts de build de las dependencias salvo que estén aprobados explícitamente. Si falta alguno, da:

```
ERR_PNPM_IGNORED_BUILDS
```

Los paquetes del toolchain de Angular (`esbuild`, `@parcel/watcher`, `lmdb`, `msgpackr-extract`) ya están aprobados en `pnpm-workspace.yaml`. Si después de instalar algo te aparece este error con un paquete nuevo:

1. Revisá cuáles están bloqueados: `pnpm ignored-builds`
2. Agregá el paquete bajo `allowBuilds` en `pnpm-workspace.yaml`
3. Reconstruí: `pnpm rebuild <nombre-del-paquete>`

---

## 4. Comandos útiles

| Comando | Descripción |
|---|---|
| `pnpm start` | Levanta el server de desarrollo (`ng serve`) en localhost:4200 |
| `pnpm build` | Compila el proyecto para producción |
| `pnpm test` | Corre los tests |
| `ng generate component <nombre>` | Genera un componente |
| `ng version` | Muestra las versiones instaladas de Angular |
| `pnpm install <paquete>` | Agrega una dependencia |
| `pnpm install -D <paquete>` | Agrega una dependencia de desarrollo |

---

## 5. Stack del proyecto

- **Angular 22** — framework principal
- **pnpm 11.5.3** — gestor de paquetes
- **TypeScript** — lenguaje

> Mantené las dependencias instaladas siempre con `pnpm`. Si ves un `package-lock.json` o `yarn.lock` aparecer, borralo: significa que alguien usó el gestor equivocado.

---

## Arquitectura de carpetas

Organizamos por **features** (secciones de la app). Regla mental para saber dónde va un archivo: *¿lo usa una sola parte de la app, o varias?* Una sola → va dentro de esa feature. Varias → va en `shared`.

```
src/
├── app/
│   ├── core/                     # Existe UNA vez en toda la app
│   │   ├── services/             # Servicios globales (auth, api)
│   │   ├── guards/               # Protección de rutas (ej: requiere login)
│   │   └── models/               # Interfaces y tipos compartidos
│   │
│   ├── features/                 # Cada sección grande = una carpeta
│   │   ├── auth/                 # Login con Google
│   │   │   └── login/
│   │   └── visor/                # Visor 360° con Marzipano
│   │       └── visor-panorama/
│   │
│   ├── shared/                   # Se REUSA en varias features
│   │   └── components/           # Botones, spinners, headers reutilizables
│   │
│   ├── app.ts                    # Componente raíz
│   ├── app.config.ts             # Providers y configuración
│   └── app.routes.ts             # Rutas
│
└── environments/                 # Config por entorno (URL de API, cloud name)
    ├── environment.ts
    └── environment.development.ts
```

(`public/panoramas/` queda en la raíz del proyecto, fuera de `src/`.)

### Convenciones

- **Nombres de archivos:** kebab-case (`visor-panorama.component.ts`).
- **Idioma:** español para nombres propios del dominio (`usuario`, `escena`). Elegir uno y respetarlo, no mezclar.
- **Generar componentes en su feature:** `ng generate component features/visor/nombre`.

### Estado e imágenes

- **Estado compartido:** por ahora con servicios + signals (el patrón nativo de Angular). Si el estado se vuelve complejo, recién ahí evaluamos una librería.
- **Imágenes (Cloudinary):** en producción las panorámicas se sirven desde Cloudinary (CDN). La API devuelve las URLs y el front se las pasa al visor. En el prototipo se usan imágenes locales en `public/panoramas/`. **Las credenciales de subida de Cloudinary (API key/secret) van solo en el backend, nunca en el frontend ni en el repo.**

---

## Finales de línea (.gitattributes)

El repo incluye un archivo `.gitattributes` que normaliza los finales de línea a LF para todo el equipo, sin importar el sistema operativo. Esto evita que aparezcan cambios falsos en los diffs por diferencias entre Windows (CRLF) y Mac/Linux (LF). No hay que hacer nada: Git lo aplica solo. Las imágenes y fuentes están marcadas como binarias para que Git no las altere.