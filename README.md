# Portafolio de Lau

Sitio personal en Next.js, bilingüe (inglés por defecto y español), listo para Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz redirige a `/en`. El español vive en `/es`.

## Contenido

Los textos del sitio están en `src/data`. Los botones y títulos de sección están en `src/messages/en.json` y `src/messages/es.json`.

### Agregar un proyecto

1. Crea la carpeta `public/projects/<slug>/`.
2. Agrega `thumbnail.png` y las capturas (`screen-1.png`, `screen-2.png`, …).
3. Si hay video, agrega `demo.mp4` y `poster.png`.
4. Añade un objeto al arreglo `projects` en `src/data/projects.ts`.

No hace falta tocar componentes. Los campos son: `slug`, `title`, `tagline`, `categoryId`, `category`, `date`, `tech`, `thumbnail`, `thumbnailAlt`, `video` (opcional), `screenshots`, `demo` (opcional), `github` (opcional), `apk` (opcional), `about` y `features`. Donde el texto cambia por idioma, usa `{ en, es }`.

`demo`, `github` y `apk` solo se muestran si el valor empieza por `http://` o `https://`. El reproductor solo aparece si el proyecto tiene `video`. Los repos van bajo `https://github.com/laujml`: deja `github` vacío, con un comentario TODO, hasta confirmar el nombre del repositorio. `categoryId` elige el color de la categoría (`backend`, `frontend`, `fullstack`, `personal`, `academic`, `cybersecurity`, `unconfirmed`).

### Agregar un evento

1. Agrega la foto en `public/events/<slug>.png`.
2. Añade un objeto en el arreglo `events` de `src/data/events.ts` con `slug`, `name`, `format` (`inPerson` o `virtual`), `date`, `image` y `alt`. `place`, `organizer`, `note` y `thread` son opcionales: si faltan, esa línea o ese botón no se muestra.

Los cursos viven en el arreglo `courses` del mismo archivo (`slug`, `name`, `date`).

### Agregar un hilo

Añade un objeto en `src/data/writing.ts` con `slug`, `title` (`{ en, es }`) y `href`. Si omites `href`, la tarjeta se muestra atenuada y sin enlace.

### Reemplazar imágenes y el CV

| Archivo | Qué es |
| --- | --- |
| `public/images/avatar.png` | Ilustración del hero, cuadrada, con su propio fondo crema. |
| `public/cv/Laura-Angel-CV-en.pdf` | CV en inglés |
| `public/cv/Laura-Angel-CV-es.pdf` | CV en español |
| `public/projects/<slug>/` | Portada, capturas, póster y video |
| `public/events/<slug>.png` | Foto del evento |

El texto alternativo de la ilustración está en `src/data/profile.ts` (`portraitAlt`). Las frases de “Sobre mí” y el correo también viven ahí. Las URLs de LinkedIn, GitHub y X están solo en `src/data/socials.ts`.

Si una imagen no existe, la tarjeta muestra una flor y no se rompe el diseño.

## Deploy

1. Los cambios se trabajan en una rama aparte, nunca directo en `main`.
2. Se abre un pull request hacia `main`.
3. El CI de GitHub Actions (`.github/workflows/ci.yml`) corre `npm run lint` y `npm run build`.
4. Al hacer merge, Vercel despliega automáticamente a producción en [https://laubuilds.work](https://laubuilds.work).

En Vercel, la variable `NEXT_PUBLIC_SITE_URL` debe ser `https://laubuilds.work`. Alimenta el sitemap, `robots.txt` y Open Graph. Sin ella, el build usa `http://localhost:3000`.
