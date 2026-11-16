import type { Locale, Project, ProjectCategoryId } from "./types";

const emptyDate = { en: "", es: "" };
const noFeatures = { en: [] as string[], es: [] as string[] };

function shots(slug: string, items: [string, string, string][]) {
  return items.map(([file, en, es]) => ({
    src: `/projects/${slug}/${file}`,
    alt: { en, es },
  }));
}

function labeled(id: ProjectCategoryId, en: string, es: string) {
  return { categoryId: id, category: { en, es } };
}

export function projectTitle(project: Project, locale: Locale) {
  return project.heading?.[locale] || project.title;
}

export const projects: Project[] = [
  {
    slug: "how-far-is-up",
    title: "How far is up?",
    year: 2026,
    ...labeled("hackathon", "Hackathon", "Hackathon"),
    tagline: {
      en: "An educational web game built for the NASA Space Apps Challenge, where you design a crewed mission to the Moon using NASA data.",
      es: "Juego web educativo hecho para el NASA Space Apps Challenge, donde diseñas una misión tripulada a la Luna con datos de la NASA.",
    },
    date: emptyDate,
    tech: ["React", "Vite", "JavaScript", "GitHub Actions"],
    frame: "browser",
    thumbnail: "/projects/how-far-is-up/inicio.png",
    thumbnailAlt: {
      en: "How far is up? start screen",
      es: "Pantalla de inicio de How far is up?",
    },
    screenshots: shots("how-far-is-up", [
      ["inicio.png", "How far is up? start screen", "Pantalla de inicio de How far is up?"],
    ]),
    demo: "https://spacesyntax.laubuilds.work/inicio",
    github: "https://github.com/Jechev1/Space_Syntax",
    about: {
      en: [
        "Built with team Space Syntax for the NASA Space Apps Challenge 2026 in San Salvador, for the Space Mission Design Game challenge. Players pick a rocket and spacecraft, choose the crew and life support, plan maneuvers with a delta-v budget and bring the crew home. Every choice has a tradeoff: more mass means more fuel. A Show the math button explains each calculation, and there are three difficulty levels.",
        "I worked on the frontend and built several phases: rocket and spacecraft, crew and life support, navigation and delta-v, and the mission complete screen. I also unified the UI across screens and added help for each phase.",
      ],
      es: [
        "Lo construimos con el equipo Space Syntax para el NASA Space Apps Challenge 2026 en San Salvador, en el reto Space Mission Design Game. El jugador elige cohete y nave, define la tripulación y el soporte vital, planifica maniobras con un presupuesto de delta-v y trae a la tripulación de regreso. Cada decisión tiene un costo: más masa exige más combustible. El botón Show the math explica cada cálculo y hay tres niveles de dificultad.",
        "Trabajé en el frontend y construí varias fases: cohete y nave, tripulación y soporte vital, navegación y delta-v, y la pantalla de misión cumplida. También unifiqué la interfaz entre pantallas y agregué la ayuda por fase.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "ciberseguridad",
    title: "Security baseline for GestioPyme Cloud",
    heading: {
      en: "Security baseline for GestioPyme Cloud",
      es: "Línea base de seguridad para GestioPyme Cloud",
    },
    year: 2026,
    ...labeled("cybersecurity", "Cybersecurity", "Ciberseguridad"),
    tagline: {
      en: "A CIS Controls security baseline for a fictional SaaS ERP that serves 14,000 small businesses on AWS.",
      es: "Línea base de seguridad con CIS Controls para un ERP SaaS ficticio que atiende a 14,000 PYMES en AWS.",
    },
    date: emptyDate,
    tech: ["CIS Controls v8.1", "NIST SP 800-30", "ISO 27001", "AWS"],
    frame: "portrait",
    thumbnail: "/projects/ciberseguridad/01_Nexus_GestioPyme.png",
    thumbnailAlt: {
      en: "Cover slide: taking a SaaS ERP from 0 to 153 CIS safeguards",
      es: "Portada: cómo llevar un ERP SaaS de 0 a 153 salvaguardas CIS",
    },
    carousel: true,
    screenshots: [
      [
        "01_Nexus_GestioPyme.png",
        "Cover slide: taking a SaaS ERP from 0 to 153 CIS safeguards",
        "Portada: cómo llevar un ERP SaaS de 0 a 153 salvaguardas CIS",
      ],
      [
        "02_Nexus_GestioPyme.png",
        "The case: GestioPyme Cloud architecture on AWS and its single points of failure",
        "El caso: arquitectura de GestioPyme Cloud en AWS y sus puntos únicos de falla",
      ],
      [
        "03_Nexus_GestioPyme.png",
        "Business impact analysis: recovery takes 12 hours against a 4-hour tolerance",
        "Análisis de impacto al negocio: restaurar toma 12 horas frente a una tolerancia de 4",
      ],
      [
        "04_Nexus_GestioPyme.png",
        "Inherent and residual risk matrix with 18 risks",
        "Matriz de riesgo inherente y residual con 18 riesgos",
      ],
      [
        "05_Nexus_GestioPyme.png",
        "Six CIS v8.1 controls covering 5 critical and 8 high risks",
        "Seis controles CIS v8.1 que cubren 5 riesgos críticos y 8 altos",
      ],
      [
        "06_Nexus_GestioPyme.png",
        "Economic justification: isolated backups return a 5,804% ROSI",
        "Justificación económica: la copia aislada de respaldos rinde un ROSI de 5,804 %",
      ],
      [
        "07_Nexus_GestioPyme.png",
        "IG3 baseline: 0 of 153 safeguards complete today",
        "Línea base IG3: hoy 0 de 153 salvaguardas completas",
      ],
      [
        "08_Nexus_GestioPyme.png",
        "18 internal audit metrics, 7 with a 100% target",
        "18 indicadores de auditoría interna, 7 con meta del 100 %",
      ],
      [
        "09_Nexus_GestioPyme.png",
        "2027 to 2029 roadmap with 40 initiatives",
        "Roadmap 2027 a 2029 con 40 iniciativas",
      ],
      [
        "10_Nexus_GestioPyme.png",
        "The three decisions proposed first and the Nexus team",
        "Las tres decisiones que propusimos primero y el equipo Nexus",
      ],
    ].map(([file, en, es]) => ({
      src: `/projects/ciberseguridad/${file}`,
      alt: { en, es },
    })),
    about: {
      en: [
        "Final project for my Cybersecurity course at ESEN, done with team Nexus. The case was GestioPyme Cloud, a fictional company whose client was played by our professor. We built an IG3 baseline with 153 safeguards, a business impact analysis, an asset inventory, a risk matrix with 18 risks, a RACI chart, metrics for internal audit and a 2027 to 2029 roadmap, and we defended it in front of the client.",
        "I was the team's lead consultant.",
      ],
      es: [
        "Proyecto final del curso de Ciberseguridad en la ESEN, hecho con el equipo Nexus. El caso fue GestioPyme Cloud, una empresa ficticia cuyo cliente simuló nuestro profesor. Armamos una línea base IG3 con 153 salvaguardas, un análisis de impacto al negocio, inventario de activos, una matriz de 18 riesgos, una matriz RACI, indicadores para auditoría interna y un roadmap 2027 a 2029, y lo defendimos frente al cliente.",
        "Fui la consultora líder del equipo.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "solvo",
    title: "Solvo",
    year: 2026,
    ...labeled("fullstack", "Full Stack", "Full Stack"),
    tagline: {
      en: "A platform that helps small businesses organize accounts receivable and follow up on collections.",
      es: "Plataforma para ayudar a pequeñas empresas a organizar sus cuentas por cobrar y dar seguimiento a sus cobros.",
    },
    date: emptyDate,
    tech: ["Go", "HTML", "CSS", "JavaScript", "PostgreSQL"],
    frame: "browser",
    thumbnail: "/projects/solvo/02-resumen-claro-escritorio.png",
    thumbnailAlt: {
      en: "Solvo summary screen",
      es: "Pantalla de resumen de Solvo",
    },
    video: {
      src: "/projects/solvo/solvo_demo_v3_ligero.mp4",
      poster: "/projects/solvo/poster.png",
    },
    screenshots: [
      ["02-resumen-claro-escritorio.png", "Solvo summary screen", "Pantalla de resumen de Solvo"],
      ["04-cuentas-claro-escritorio.png", "Solvo accounts screen", "Pantalla de cuentas de Solvo"],
      ["05-detalle-claro-escritorio.png", "Solvo account detail screen", "Pantalla de detalle de cuenta de Solvo"],
    ].map(([file, en, es]) => ({
      src: `/projects/solvo/${file}`,
      alt: { en, es },
    })),
    about: {
      en: [
        "Solvo is a team project developed for a business incubation course. The platform helps small businesses organize accounts receivable and follow up on collections.",
      ],
      es: [
        "Solvo es un proyecto desarrollado en equipo para Incubación de Negocios. La plataforma ayuda a pequeñas empresas a organizar sus cuentas por cobrar y dar seguimiento a sus cobros.",
      ],
    },
    github: "https://github.com/Jechev1/CxC_Saas",
    features: { en: [], es: [] },
  },
  {
    slug: "kaval",
    title: "Kaval",
    year: 2026,
    ...labeled("mobile", "Mobile Development", "Desarrollo móvil"),
    tagline: {
      en: "A mobile app for organizing shared expenses on group trips and outings.",
      es: "App móvil para organizar gastos compartidos en viajes y salidas en grupo.",
    },
    date: emptyDate,
    tech: ["Flutter", "Dart", "Firebase"],
    frame: "phone",
    galleryIncludesHero: true,
    thumbnail: "/projects/kaval/03_inicio.png",
    thumbnailAlt: {
      en: "Kaval home screen",
      es: "Pantalla de inicio de Kaval",
    },
    screenshots: [
      {
        src: "/projects/kaval/03_inicio.png",
        alt: { en: "Kaval home screen", es: "Pantalla de inicio de Kaval" },
      },
      {
        src: "/projects/kaval/05_detalle_evento.png",
        alt: { en: "Kaval event screen", es: "Pantalla de evento de Kaval" },
      },
      {
        src: "/projects/kaval/09_liquidacion.png",
        alt: { en: "Kaval settlement screen", es: "Pantalla de liquidación de Kaval" },
      },
    ],
    github: "https://github.com/laujml/Kaval",
    about: {
      en: [
        "Kaval is a mobile app I built for a university course. It helps groups keep track of shared expenses during trips and outings, so nobody has to do the math at the end.",
        "You create an event, add the people and log each expense as it happens. The app keeps a running balance of who owes what, and at the end it calculates the settlement so everyone knows who pays whom. It's built with Flutter and uses Firebase for accounts and data.",
      ],
      es: [
        "Kaval es una app móvil que hice para un curso de la universidad. Ayuda a los grupos a llevar el control de los gastos compartidos en viajes y salidas, para que nadie tenga que hacer cuentas al final.",
        "Creas un evento, agregas a las personas y registras cada gasto en el momento. La app mantiene un balance de quién debe qué y al final calcula la liquidación para que cada quien sepa a quién pagarle. Está hecha con Flutter y usa Firebase para las cuentas y los datos.",
      ],
    },
    features: { en: [], es: [] },
  },
  {
    slug: "flora",
    title: "Flora",
    year: 2026,
    status: "inProgress",
    ...labeled("fullstack", "Full Stack", "Full Stack"),
    tagline: {
      en: "A web app for students to organize courses, tasks, calendar, grades and files.",
      es: "App web para que estudiantes organicen sus cursos, tareas, calendario, notas y archivos.",
    },
    date: emptyDate,
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL", "Cloudinary"],
    frame: "browser",
    thumbnail: "/projects/flora/thumbnail.png",
    thumbnailAlt: {
      en: "Flora dashboard with today's plan, upcoming events, and active courses.",
      es: "Panel de Flora con el plan de hoy, próximos eventos y cursos activos.",
    },
    screenshots: shots("flora", [
      [
        "screen-1.png",
        "Flora dashboard with today's plan, upcoming events, and active courses.",
        "Panel de Flora con el plan de hoy, próximos eventos y cursos activos.",
      ],
    ]),
    github: "https://github.com/laujml/flora",
    about: {
      en: [
        "A personal project I'm still building. It has a dashboard that puts the day's plan first, plus sections for courses, tasks and a calendar. Users sign in with an account, and files are stored in the cloud.",
      ],
      es: [
        "Un proyecto personal que todavía estoy construyendo. Tiene un dashboard que pone primero el plan del día y secciones para cursos, tareas y calendario. Cada usuario entra con su cuenta y los archivos se guardan en la nube.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "certificacion-fullstack",
    title: "Certificación Full Stack",
    year: 2026,
    ...labeled("fullstack", "Full Stack", "Full Stack"),
    tagline: {
      en: "The dashboard from the official Next.js Learn course, built with App Router.",
      es: "El dashboard del curso oficial Next.js Learn, hecho con App Router.",
    },
    date: emptyDate,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth", "PostgreSQL"],
    frame: "browser",
    thumbnail: "/projects/certificacion-fullstack/thumbnail.png",
    thumbnailAlt: {
      en: "Acme dashboard mockup showing home, invoices, and customers.",
      es: "Mockup del dashboard de Acme con inicio, facturas y clientes.",
    },
    screenshots: shots("certificacion-fullstack", [
      ["screen-1.png", "Acme Dashboard landing page with a Log in button.", "Página de inicio de Acme Dashboard con el botón de iniciar sesión."],
      ["screen-2.png", "Acme login form with email and password fields.", "Formulario de inicio de sesión de Acme con correo y contraseña."],
      ["screen-3.png", "Desktop and mobile preview of the Acme dashboard and invoices.", "Vista de escritorio y móvil del dashboard y las facturas de Acme."],
    ]),
    demo: "https://proyecto-next-beta.vercel.app/",
    github: "https://github.com/laujml/proyecto-next",
    about: {
      en: [
        "This is the final project of the official Next.js Learn course by Vercel, which I took to learn the App Router properly.",
        "I built a financial dashboard with login, invoices and customers. It has search, pagination and forms validated with Zod, uses Server Actions to create and edit invoices, and stores everything in a PostgreSQL database. Authentication is handled with NextAuth, and the app is deployed on Vercel.",
      ],
      es: [
        "Es el proyecto final del curso oficial Next.js Learn de Vercel, que tomé para aprender bien el App Router.",
        "Construí un dashboard financiero con login, facturas y clientes. Tiene búsqueda, paginación y formularios validados con Zod, usa Server Actions para crear y editar facturas y guarda todo en PostgreSQL. La autenticación funciona con NextAuth y la app está desplegada en Vercel.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "sistema-biblioteca",
    title: "Sistema de Biblioteca",
    year: 2026,
    ...labeled("backend", "Backend", "Backend"),
    tagline: {
      en: "A library API to manage books and loans, with roles and tests.",
      es: "API de biblioteca para gestionar libros y préstamos, con roles y pruebas.",
    },
    date: emptyDate,
    tech: ["PHP", "Laravel", "Sanctum", "Pest"],
    frame: "browser",
    thumbnail: "/projects/sistema-biblioteca/thumbnail.png",
    thumbnailAlt: {
      en: "Endpoints of the library API",
      es: "Endpoints de la API de biblioteca",
    },
    screenshots: shots("sistema-biblioteca", [
      ["thumbnail.png", "Endpoints of the library API", "Endpoints de la API de biblioteca"],
    ]),
    github: "https://github.com/laujml/BibliotecaEjercicioPruebas",
    about: {
      en: [
        "Team project for a software testing course. The API handles sign in, books and loans, including returns and loan history, with role-based permissions and automated tests. I set up the base of the project and the authentication.",
      ],
      es: [
        "Proyecto en equipo para un curso de pruebas de software. La API maneja inicio de sesión, libros y préstamos, incluyendo devoluciones e historial, con permisos por rol y pruebas automatizadas. Yo armé la base del proyecto y la autenticación.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "planificador-gastos",
    title: "Planificador de Gastos",
    year: 2026,
    ...labeled("frontend", "Frontend", "Frontend"),
    tagline: {
      en: "An expense planner where you set a budget and track spending by category.",
      es: "Planificador de gastos donde defines un presupuesto y controlas lo que gastas por categoría.",
    },
    date: emptyDate,
    tech: ["React", "Vite", "Tailwind CSS"],
    frame: "browser",
    thumbnail: "/projects/planificador-gastos/thumbnail.png",
    thumbnailAlt: {
      en: "Budget tracker showing spent percentage and a list of expenses.",
      es: "Seguimiento del presupuesto con el porcentaje gastado y el listado de gastos.",
    },
    screenshots: shots("planificador-gastos", [
      ["screen-1.png", "Form to set a budget in the expense planner.", "Formulario para definir el presupuesto en el planificador de gastos."],
      ["screen-2.png", "Expense list with supermarket and subscription items under the budget summary.", "Listado de gastos de supermercado y suscripción bajo el resumen del presupuesto."],
      ["screen-3.png", "New expense modal with name, amount, category, and date fields.", "Modal de nuevo gasto con nombre, cantidad, categoría y fecha."],
    ]),
    demo: "https://lighthearted-sunshine-dedd3f.netlify.app/",
    github: "https://github.com/laujml/practica4web2",
    about: {
      en: [
        "A personal finance app I built to practice React. You start by setting a budget, then add your expenses with a name, amount, category and date.",
        "A circular chart shows how much of the budget you've spent, you can filter expenses by category, and swipe an expense to edit or delete it. If a new expense goes over what's left, the app warns you. Everything is saved in the browser, so your data is still there when you come back.",
      ],
      es: [
        "Una app de finanzas personales que hice para practicar React. Primero defines un presupuesto y luego agregas tus gastos con nombre, cantidad, categoría y fecha.",
        "Una gráfica circular muestra cuánto del presupuesto llevas gastado, puedes filtrar los gastos por categoría y deslizar un gasto para editarlo o borrarlo. Si un gasto nuevo supera lo disponible, la app te avisa. Todo se guarda en el navegador, así que tus datos siguen ahí cuando vuelves.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "ecommerce-guitarras",
    title: "Ecommerce de Guitarras",
    year: 2026,
    ...labeled("frontend", "Frontend", "Frontend"),
    tagline: {
      en: "A guitar store with a product catalog and a shopping cart.",
      es: "Tienda de guitarras con catálogo de productos y carrito de compras.",
    },
    date: emptyDate,
    tech: ["React", "Vite", "CSS"],
    frame: "browser",
    thumbnail: "/projects/ecommerce-guitarras/thumbnail.png",
    thumbnailAlt: {
      en: "GuitarLA store home with the guitar catalog and Add to cart buttons.",
      es: "Inicio de la tienda GuitarLA con el catálogo de guitarras y botones de agregar al carrito.",
    },
    screenshots: shots("ecommerce-guitarras", [
      ["screen-1.png", "GuitarLA store home with the guitar catalog and Add to cart buttons.", "Inicio de la tienda GuitarLA con el catálogo de guitarras y botones de agregar al carrito."],
      ["screen-2.png", "Shopping cart open over the catalog, with two guitars and the total.", "Carrito abierto sobre el catálogo, con dos guitarras y el total."],
      ["screen-3.png", "Lower part of the guitar catalog and the site footer.", "Parte baja del catálogo de guitarras y el pie de página."],
    ]),
    demo: "https://guitarsecommerce.netlify.app/",
    github: "https://github.com/laujml/guitarsG2",
    about: {
      en: [
        "An online guitar store I built with React to practice components, props and state.",
        "The catalog shows twelve guitars with their photo, description and price. From the header you open the cart, where you can add guitars, change quantities, remove items or empty it, and the total updates as you go.",
      ],
      es: [
        "Una tienda de guitarras en línea que hice con React para practicar componentes, props y estado.",
        "El catálogo muestra doce guitarras con foto, descripción y precio. Desde el encabezado abres el carrito, donde puedes agregar guitarras, cambiar cantidades, quitar productos o vaciarlo, y el total se actualiza al momento.",
      ],
    },
    features: noFeatures,
  },
  {
    slug: "naturally-stunning",
    title: "Naturally Stunning",
    year: 2025,
    ...labeled("frontend", "Frontend", "Frontend"),
    tagline: {
      en: "An online store for vegan, cruelty-free beauty products.",
      es: "Tienda en línea de productos de belleza veganos y cruelty-free.",
    },
    date: emptyDate,
    tech: ["HTML", "CSS", "JavaScript"],
    frame: "browser",
    thumbnail: "/projects/naturally-stunning/thumbnail.png",
    thumbnailAlt: {
      en: "Naturally Stunning landing page with the welcome hero and Shop button.",
      es: "Página de inicio de Naturally Stunning con el hero de bienvenida y el botón Comprar.",
    },
    screenshots: shots("naturally-stunning", [
      ["screen-1.png", "Naturally Stunning landing page with the welcome hero and Shop button.", "Página de inicio de Naturally Stunning con el hero de bienvenida y el botón Comprar."],
      ["screen-2.png", "Product catalog with skin care items and category filters.", "Catálogo de productos de cuidado de la piel con filtros por categoría."],
      ["screen-3.png", "Promotions page with a Black Friday banner and a featured product offer.", "Página de promociones con un banner de Black Friday y una oferta destacada."],
    ]),
    demo: "https://laujml.github.io/NaturallyStunning/",
    github: "https://github.com/laujml/NaturallyStunning",
    about: {
      en: [
        "A store for vegan, cruelty-free beauty products that I built with a classmate. It was one of my first web projects, made with HTML, CSS and plain JavaScript.",
        "The site has a product catalog with category filters, a cart, sign up and login, a user profile and a promotions page. We organized the JavaScript in models and controllers, and saved users and the cart in the browser. I built the landing page, the about, contact and promotions pages, the navigation and the styles.",
      ],
      es: [
        "Una tienda de productos de belleza veganos y cruelty-free que hice con un compañero. Fue uno de mis primeros proyectos web, hecho con HTML, CSS y JavaScript puro.",
        "El sitio tiene catálogo con filtros por categoría, carrito, registro e inicio de sesión, perfil de usuario y una página de promociones. Organizamos el JavaScript en modelos y controladores y guardamos los usuarios y el carrito en el navegador. Yo hice la página de inicio, las páginas de acerca de, contacto y promociones, la navegación y los estilos.",
      ],
    },
    features: noFeatures,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
