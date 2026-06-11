# Guía de contribución

Cómo trabajamos en este repo. Leelo una vez antes de tu primer commit.

> Gestor de paquetes: **pnpm** (no `npm` ni `yarn`). Ver el [README](./README.md) para el setup del entorno.

---

## Modelo de ramas (Git Flow)

Tenemos dos ramas **permanentes**:

| Rama | Para qué |
|---|---|
| `main` | Refleja producción. Solo recibe merges de `release/*` o `hotfix/*`. Cada release lleva un tag de versión. |
| `develop` | Rama de integración. Acá se juntan las features terminadas. Es el próximo release en construcción. |

Y tres tipos de ramas **temporales** (se crean, se mergean y se borran):

| Prefijo | Nace de | Vuelve a | Para qué |
|---|---|---|---|
| `feature/*` | `develop` | `develop` | Una funcionalidad nueva |
| `release/*` | `develop` | `main` + `develop` | Preparar una versión para publicar |
| `hotfix/*` | `main` | `main` + `develop` | Arreglo urgente en producción |

**Nunca se pushea directo a `main` ni a `develop`.** Todo entra por Pull Request.

---

## Flujo de una feature (el caso del día a día)

```bash
# 1. Partí siempre de develop actualizado
git switch develop
git pull origin develop

# 2. Creá tu rama de feature
git switch -c feature/visor-360

# 3. Trabajá y commiteá (ver convención de commits abajo)
git add .
git commit -m "feat(visor): integrar Marzipano en el panorama"

# 4. Subí la rama
git push -u origin feature/visor-360
```

Cuando esté lista, abrí un **Pull Request hacia `develop`**. Tras la aprobación y el merge, borrá la rama:

```bash
git switch develop
git pull origin develop
git branch -d feature/visor-360
```

---

## Flujo de un release

```bash
git switch develop
git pull origin develop
git switch -c release/1.0.0
# ajustes finales y bump de versión en package.json

git switch main
git merge release/1.0.0
git tag v1.0.0

git switch develop
git merge release/1.0.0

git push origin main develop --tags
git branch -d release/1.0.0
```

---

## Flujo de un hotfix

```bash
git switch main
git pull origin main
git switch -c hotfix/login-roto
# arreglo + bump de versión de parche (ej: 1.0.1)

git switch main
git merge hotfix/login-roto
git tag v1.0.1

git switch develop
git merge hotfix/login-roto

git push origin main develop --tags
git branch -d hotfix/login-roto
```

---

## Convención de nombres de ramas

- Siempre en **kebab-case** y descriptivo.
- `feature/login-google`, `feature/visor-panorama`
- `release/1.2.0`
- `hotfix/cors-cloudinary`

---

## Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance opcional>): <descripción en minúscula y en presente>
```

Tipos más usados:

| Tipo | Cuándo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `style` | Formato, sin cambios de lógica |
| `refactor` | Cambio interno sin alterar comportamiento |
| `test` | Tests |
| `chore` | Mantenimiento, dependencias, config |

Ejemplos:

```
feat(auth): agregar login con Google
fix(visor): corregir carga de escenas en mobile
docs: actualizar árbol de carpetas en el README
chore(deps): subir Angular a 22.1
```

---

## Pull Requests

Antes de abrir un PR:

1. Tu rama está actualizada con `develop` (hacé `git pull origin develop` y resolvé conflictos localmente).
2. El proyecto compila: `pnpm build`.
3. Los tests pasan: `pnpm test`.
4. No quedaron `package-lock.json` ni `yarn.lock` en el diff (si aparecen, alguien usó el gestor equivocado: borralos).

En el PR:

- Título claro siguiendo la convención de commits.
- Descripción breve de qué cambia y por qué.
- Apuntá a la rama correcta: features y fixes → `develop`.
- Al menos una aprobación antes del merge.

---

## Convenciones de código

(Resumen; el detalle está en el README.)

- **Archivos:** kebab-case (`visor-panorama.component.ts`).
- **Estructura:** organizamos por *features*. Lo que usa una sola parte de la app va en su feature; lo que se reúsa, en `shared`.
- **Generar componentes en su feature:** `ng generate component features/visor/nombre`.
- **Idioma del dominio:** español (`usuario`, `escena`). Elegir uno y respetarlo, no mezclar.
- **Secretos:** las credenciales de Cloudinary (API key/secret) van **solo en el backend**, nunca en el frontend ni en el repo.

---

## Recomendación de protección de ramas

Quien administre el repo debería configurar en GitHub (Settings → Branches):

- `develop` como rama por defecto.
- Reglas de protección sobre `main` y `develop`: prohibir push directo y exigir PR aprobado antes del merge.