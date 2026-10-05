import type en from './en';

/**
 * Copia en español de México. Misma forma que en.ts (lo verifica TypeScript).
 * Espacio de no separación ( ) antes de % y unidades.
 */
const es: typeof en = {
  nav: {
    work: 'Proyectos',
    about: 'Sobre mí',
    resume: 'Currículum',
    contact: 'Contacto',
    cta: 'Escríbeme',
    menu: 'Menú',
    close: 'Cerrar',
    skip: 'Saltar al contenido',
    langSwitch: 'Idioma',
  },
  footer: {
    tagline: 'Ingeniero de IA/ML: sistemas que leen mapas, documentos y conversaciones.',
    builtWith: 'Hecho con Astro, WebGL y Motion.',
    rights: 'Todos los derechos reservados.',
    backToTop: 'Volver arriba',
    pages: 'Páginas',
    connect: 'Contacto',
    elsewhere: 'En otros sitios',
    privacy: 'Privacidad',
    terms: 'Términos',
  },
  home: {
    metaTitle: 'Gairo Peralta · Ingeniero de IA/ML, sistemas LLM y GeoAI',
    metaDescription:
      'Ingeniero de IA/ML: agentes de LLM, GeoAI y ML en producción. Estudios de mercado en 11 zonas metropolitanas, datos de pagos de ~5.5 millones de comercios y redacción legal ~8 veces más rápida.',
    status: 'Ahora: ingeniero líder de IA en BlackPrint Technologies',
    headline: 'Construyo IA que lee el *territorio* y el *lenguaje*.',
    sub: 'Agentes de LLM, plataformas GeoAI y pipelines de ML en producción que convierten mapas, documentos y conversaciones en respuestas que tu equipo puede comprobar.',
    roles: ['Sistemas LLM y agentes', 'Plataformas GeoAI', 'ML en producción', 'Pipelines geoespaciales'],
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Descargar CV (PDF)',
    scroll: 'Desliza',
    hudPointer: 'Inspeccionando',
    hudAuto: 'Piloto automático',
    affiliationsLabel: 'Donde he trabajado y estudiado',
    impact: {
      eyebrow: 'Resultados medidos',
      title: 'Cada cifra, con su *proyecto*.',
      items: [
        { value: '2.5 M+', label: 'manzanas con inferencia en tiempo real', context: 'Plataforma GeoAI con LLM · BlackPrint Technologies' },
        { value: '~5.5 M', label: 'comercios calificados por su propensión a aceptar pagos', context: 'Acceptance Radar · BlackPrint Technologies' },
        { value: '~8×', label: 'redacción legal más rápida: ~2 h → ~15 min', context: 'Agentes de LLM · Law Offices of Manuel Solis' },
        { value: '+24.2 pp', label: 'de precisión en QA médico, hasta 54.69 %', context: 'QA multiagente sobre PrimeKG · UT San Antonio' },
      ],
    },
    capabilities: {
      eyebrow: 'Lo que construyo',
      title: 'Del almacén de datos al *mapa* en pantalla.',
      intro:
        'Casi todos mis proyectos cruzan las cuatro áreas: mireporte.ai convierte un punto en el mapa en un estudio de mercado congelado de 25 secciones construido sobre diez capas de datos.',
      cards: [
        {
          title: 'GeoAI e inteligencia espacial',
          body: 'Modelos y mapas para preguntas de ubicación: dónde abrir, atracción competitiva, cruce de POI e índices de riesgo, de celdas H3 a manzanas censales.',
          tags: ['MapLibre GL', 'H3', 'GeoPandas', 'Turf.js'],
        },
        {
          title: 'Sistemas LLM y agentes',
          body: 'Orquestación multiagente, RAG y pipelines de documentos: SQL verificado, bitácoras de auditoría, acceso por roles y relevo a operadores humanos.',
          tags: ['LangGraph', 'RAG', 'Pinecone', 'Neo4j'],
        },
        {
          title: 'ML en producción y pronósticos',
          body: 'Modelos que corren detrás de una API, no en un notebook: pronósticos de demanda con +42 % de precisión y 30 % menos costo de inventario, y un modelo de ventas por sitio cuyo error de validación cruzada bajó de 106 % a 22 %.',
          tags: ['PyTorch', 'XGBoost', 'FastAPI', 'MLflow'],
        },
        {
          title: 'Plataformas y pipelines de datos',
          body: 'Almacenes y ETL a escala: BigQuery con control de costos previo, Redshift con respaldo en CSV y exportaciones anonimizadas bajo la LFPDPPP.',
          tags: ['BigQuery', 'Redshift', 'Terraform', 'pandas'],
        },
      ],
    },
    work: {
      eyebrow: 'Proyectos destacados',
      title: 'De *manzanas* urbanas a *expedientes* legales.',
      intro:
        'Cinco proyectos de 2025 y 2026: inteligencia territorial, ruteo de ventas en campo, datos de pagos a escala nacional, IA legal e investigación médica.',
      viewAll: 'Ver los {count} proyectos',
      readCase: 'Ver el caso',
      featured: [
        {
          slug: 'mireporte-ai',
          outcome: 'Convierte un punto en el mapa en un estudio de mercado congelado de 25 secciones en 11 zonas metropolitanas, respaldado por 5,043 pruebas aprobadas.',
        },
        {
          slug: 'pharma-field-sales',
          outcome: 'Rutas diarias con tiempos de manejo reales, visitas a farmacias verificadas por GPS con evidencia fotográfica y revisión de supervisores para un equipo de ventas con cinco roles.',
        },
        {
          slug: 'acceptance-radar',
          outcome: 'Calcula la propensión a aceptar pagos de ~5.5 millones de comercios; un extracto de 45 GB ahora se sirve como un Parquet de 70 MB.',
        },
        {
          slug: 'declarationletteronline',
          outcome: 'Convierte cuestionarios en cartas de declaración con formato judicial en menos de 60 s, con bitácora local.',
        },
        {
          slug: 'medical-qa-multi-agent-system',
          outcome: 'Cuatro agentes razonan sobre PrimeKG (más de 4 M de nodos) en Neo4j y suben la precisión en QA médico 24.24 puntos, a 54.69 %.',
        },
      ],
    },
    path: {
      eyebrow: 'Trayectoria',
      title: 'De la ciencia de datos en Berkeley a la IA en *producción*.',
      milestones: [
        { year: '2022', text: 'Licenciatura en Ciencia de Datos, UC Berkeley' },
        { year: '2023', text: 'Ingeniero de IA/ML en STRTGY: GeoAI y RAG' },
        { year: '2024', text: 'Extracción con OCR y Llama 3.3 para PRODENSA' },
        { year: '2025', text: 'Regreso a BlackPrint, IA legal y UTSA' },
        { year: '2026', text: 'mireporte.ai y productos GeoAI en BlackPrint' },
      ],
      cta: 'Ver trayectoria completa',
    },
    closing: {
      eyebrow: 'Contacto',
      title: '¿Trabajas con mapas, documentos o *ambos*?',
      sub: 'Cuéntame qué necesitas decidir y con qué datos cuentas. Respondo en 24 a 48 horas.',
      email: 'Escríbeme',
      copy: 'Copiar correo',
      copied: 'Correo copiado',
      linkedin: 'LinkedIn',
    },
  },
  about: {
    metaTitle: 'Sobre mí · Gairo Peralta, ingeniero de IA/ML',
    metaDescription:
      'Gairo Peralta (Gairo Yostin Peralta Alvarez) desarrolla agentes de LLM y plataformas GeoAI. Ciencia de Datos (Berkeley); maestría en IA Aplicada (Tec).',
    eyebrow: 'Sobre mí',
    title: 'Ingeniero para problemas que viven en un *mapa* o en un *documento*.',
    intro:
      'Soy Gairo Peralta, ingeniero de IA/ML. Construyo sistemas que convierten manzanas, expedientes legales y preguntas médicas en respuestas que se pueden comprobar, y luego mido si funcionan.',
    bio: [
      'Como ingeniero líder de IA en BlackPrint Technologies, diseño productos de inteligencia territorial sobre datos censales y comerciales de México. Dirigí mireporte.ai, que convierte un punto en el mapa en un estudio de mercado de 25 secciones en once zonas metropolitanas, y construí el ruteo de ventas en campo, la calificación de ~5.5 millones de comercios por su propensión a aceptar pagos y un pipeline que concilia más de 230 mil puntos de interés.',
      'De 2025 a julio de 2026 también dirigí como consultor el trabajo de IA de Law Offices of Manuel Solis, al frente de un equipo de becarios. Nuestros agentes de LLM redujeron la preparación de declaraciones para visa T y cartas de presentación de unas dos horas a unos quince minutos por documento. También construimos una plataforma de inteligencia de reuniones con acceso por roles y un pipeline de traducción certificada con Gemini Vision.',
      'De 2025 a enero de 2026, como estudiante investigador visitante en IA médica en UT San Antonio (voluntario), construí un sistema de cuatro agentes que razona sobre PrimeKG y alcanzó 54.69 % de precisión en QA médico, una mejora de 24.24 puntos. Soy licenciado en Ciencia de Datos por UC Berkeley (2022) y curso la maestría en Inteligencia Artificial Aplicada del Tecnológico de Monterrey (fin previsto en 2027, promedio 98/100).',
      'Trabajo en español y en inglés, algo útil cuando los datos vienen del INEGI y el cliente prepara trámites migratorios en Estados Unidos. Profesionalmente me conocen como Gairo Peralta; mi nombre legal completo es Gairo Yostin Peralta Alvarez en México y Gairo Yostin Peralta en Estados Unidos.',
    ],
    facts: [
      { label: 'Enfoque', value: 'Agentes de LLM, GeoAI y ML en producción' },
      { label: 'Formación', value: 'Ciencia de Datos, UC Berkeley · Maestría en IA Aplicada, Tec' },
      { label: 'Actualmente', value: 'Ingeniero líder de IA, BlackPrint Technologies' },
      { label: 'Idiomas', value: 'Español e inglés' },
    ],
    timelineTitle: 'La trayectoria hasta hoy',
    timelineIntro: 'Puestos, investigación y estudios desde 2022, del más reciente al más antiguo.',
    principles: {
      title: 'Principios de trabajo',
      items: [
        {
          title: 'Evaluar antes de mostrar',
          body: 'Una demo prueba una respuesta; una evaluación prueba la tasa de acierto. Por eso el trabajo de QA médico reporta 54.69 % de precisión y una mejora de 24.24 puntos.',
        },
        {
          title: 'El costo, antes de la consulta',
          body: 'En un lago de datos de ~79 GB en BigQuery, una pregunta vaga puede salir cara. En Meridian, un validador de SQL y compuertas de costo en cuatro niveles revisan cada consulta generada antes de ejecutarla.',
        },
        {
          title: 'La privacidad va en el pipeline',
          body: 'NetAiCore analiza conversaciones de chatbot bajo la LFPDPPP: la anonimización ocurre dentro del pipeline y el tablero que se comparte no muestra datos personales.',
        },
        {
          title: 'Una persona puede intervenir',
          body: 'El agente de BrokerAI califica prospectos, pero los operadores ven los chats en vivo y pueden intervenir, con alertas en Telegram cuando un chat necesita a una persona.',
        },
      ],
    },
    approach: {
      title: 'Cómo avanza un proyecto',
      steps: [
        { title: 'Definir la decisión', body: 'Empezamos por la decisión que el sistema debe apoyar y los datos que ya existen, no por un modelo.' },
        {
          title: 'Probar con tus datos',
          body: 'Un prototipo pequeño con tus datos, medido contra un conjunto de evaluación, muestra qué funciona antes de escalar.',
        },
        {
          title: 'Pensar en producción',
          body: 'API, infraestructura como código, control de costos y permisos entran desde el inicio: el prototipo crece, no se reescribe.',
        },
        {
          title: 'Entregar y medir',
          body: 'Documentación y capacitación para el equipo que lo hereda, y la métrica acordada, con seguimiento tras el lanzamiento.',
        },
      ],
    },
    interests: {
      title: 'Lo que estoy explorando',
      items: [
        {
          title: 'Texto a SQL que conoce sus límites',
          body: 'Agentes que revisan su propio SQL, explican sus joins y lo dicen cuando los datos no alcanzan para responder.',
        },
        {
          title: 'Lugares como embeddings',
          body: 'Representar manzanas, POI y colonias como vectores, para que un modelo compare lugares como compara textos.',
        },
        {
          title: 'Grafos que anclan respuestas de LLM',
          body: 'Razonamiento multisalto sobre grafos de conocimiento como PrimeKG, para que cada respuesta apunte a su evidencia.',
        },
        {
          title: 'Analítica que protege a las personas',
          body: 'Obtener cohortes, temas y sentimiento de conversaciones sin exponer a quienes las escribieron.',
        },
      ],
    },
    cta: {
      title: 'Trae el problema; yo pongo las *preguntas*.',
      sub: 'Mándame una nota breve sobre el problema y los datos con los que cuentas. Respondo en 24 a 48 horas.',
      primary: 'Escríbeme',
      secondary: 'Ver proyectos',
    },
  },
  work: {
    metaTitle: 'Proyectos · Gairo Peralta, ingeniero de IA/ML',
    metaDescription:
      'Cada proyecto con sus tecnologías y resultados: agentes de LLM, plataformas GeoAI, ML en producción y pipelines de datos.',
    eyebrow: 'Proyectos',
    title: 'El trabajo, *proyecto* por proyecto.',
    intro:
      '{count} proyectos desde 2021, cada uno con lo que hace, sus tecnologías y sus resultados. Filtra por área u organización, o busca por herramienta.',
    searchPlaceholder: 'Herramienta, proyecto u organización',
    filterLabel: 'Filtrar por área',
    domains: {
      all: 'Todos',
      llm: 'LLM y agentes',
      geo: 'GeoAI y mapas',
      ml: 'ML y pronósticos',
      data: 'Datos y pipelines',
      web: 'Aplicaciones web',
    },
    companyLabel: 'Organización',
    allCompanies: 'Todas',
    viewList: 'Lista',
    viewGrid: 'Cuadrícula',
    results: '{count} proyectos',
    resultsOne: '1 proyecto',
    emptyTitle: 'Nada en esta zona del mapa',
    emptyBody: 'Ningún proyecto coincide con esos filtros. Prueba un término más amplio o quita los filtros.',
    reset: 'Quitar filtros',
    dialog: {
      overview: 'Resumen',
      results: 'Resultados',
      highlights: 'Puntos clave',
      stack: 'Tecnologías',
      close: 'Cerrar',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente',
      openCase: 'Ver caso completo',
    },
    case: {
      breadcrumb: 'Proyectos',
      back: 'Todos los proyectos',
      organization: 'Organización',
      date: 'Fecha',
      domain: 'Área',
      more: 'Más proyectos',
      ctaTitle: '¿Trabajas en algo *parecido*?',
      ctaBody: 'Cuéntame el problema y los datos con los que cuentas. Respondo en 24 a 48 horas.',
      ctaButton: 'Hablemos del proyecto',
    },
  },
  resume: {
    metaTitle: 'Currículum · Gairo Peralta, ingeniero de IA/ML',
    metaDescription:
      'Currículum de Gairo Peralta, ingeniero líder de IA en BlackPrint Technologies: agentes de LLM, GeoAI y ML en producción; antes, IA legal para Manuel Solis e investigación en IA médica en UTSA. Consulta o descarga el PDF.',
    eyebrow: 'Currículum',
    title: 'La versión corta',
    intro:
      'Puestos, resultados y habilidades en una sola vista. La versión en PDF tiene formato compatible con sistemas de selección (ATS).',
    download: 'Descargar PDF',
    openPdf: 'Abrir en otra pestaña',
    updated: 'Actualizado: {date}',
    sections: {
      summary: 'Resumen',
      experience: 'Experiencia',
      projects: 'Proyectos destacados',
      skills: 'Habilidades',
      education: 'Formación',
      certifications: 'Certificaciones',
      languages: 'Idiomas',
    },
    summary:
      'Ingeniero líder de IA en BlackPrint Technologies: agentes de LLM, plataformas GeoAI y ML en producción. En BlackPrint: estudios de mercado de mireporte.ai en 11 zonas metropolitanas, GeoAI sobre más de 2.5 millones de manzanas y calificación de ~5.5 millones de comercios por propensión a aceptar pagos. Para Law Offices of Manuel Solis: agentes de LLM que aceleraron ~8 veces la preparación de cada documento legal. IA médica en UTSA. Ciencia de Datos, Berkeley; maestría en IA Aplicada, Tec.',
    verify: 'Verificar',
    current: 'Actual',
    preview: 'Vista previa del PDF',
  },
  contact: {
    metaTitle: 'Contacto · Gairo Peralta, ingeniero de IA/ML',
    metaDescription:
      'Escríbele a Gairo Peralta sobre agentes de LLM, GeoAI, ML en producción o colaboración en investigación. Respuesta en 24 a 48 horas, en español o inglés.',
    eyebrow: 'Contacto',
    title: 'Cuéntame qué necesitas *decidir*.',
    intro:
      'Basta una nota breve: el problema, los datos que tienes y tus plazos. Respondo en 24 a 48 horas, en español o en inglés.',
    form: {
      name: 'Nombre',
      namePh: 'Tu nombre',
      email: 'Correo electrónico',
      emailPh: 'tu@empresa.com',
      company: 'Empresa o institución (opcional)',
      companyPh: 'Empresa, despacho o laboratorio',
      topic: 'Tema (opcional)',
      topicPh: 'Elige un tema',
      topics: [
        'Un puesto en tu equipo',
        'Un proyecto con alcance definido',
        'Asesoría o revisión técnica',
        'Colaboración en investigación',
        'Otro tema',
      ],
      message: 'Mensaje',
      messagePh: '¿En qué estás trabajando y con qué datos cuentas?',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      successTitle: 'Mensaje enviado',
      successBody: 'Gracias. Te responderé en 24 a 48 horas al correo que indicaste.',
      errorTitle: 'El mensaje no se envió',
      errorBody: 'Algo falló al enviarlo. Inténtalo de nuevo o escríbeme directamente a gairo@berkeley.edu.',
      required: 'Campo obligatorio',
      invalidEmail: 'Escribe un correo válido',
      tooShort: 'Muy corto: mínimo {min} caracteres',
    },
    direct: {
      title: '¿Prefieres el correo?',
      emailLabel: 'Correo',
      copy: 'Copiar correo',
      copied: 'Correo copiado',
      responseTime: 'Tiempo habitual de respuesta: 24 a 48 horas',
    },
    next: {
      title: 'Lo que sigue',
      steps: [
        { title: 'Leo y respondo', body: 'En 24 a 48 horas, con preguntas si necesito más contexto.' },
        { title: 'Una llamada breve', body: 'Si el proyecto encaja, agendamos una llamada para revisar el problema y tus datos.' },
        { title: 'Propuesta por escrito', body: 'Alcance, enfoque y calendario por escrito antes de empezar cualquier trabajo.' },
      ],
    },
    services: {
      title: 'En qué puedo ayudarte',
      items: [
        {
          title: 'Sistemas LLM y agentes',
          body: 'Agentes, RAG y pipelines de documentos para trabajo con mucho texto: redacción legal, minutas, extracción con OCR y texto a SQL.',
        },
        {
          title: 'GeoAI e inteligencia territorial',
          body: 'Selección de sitios, potencial de mercado, cruce de POI e índices de riesgo, entregados como mapas interactivos en MapLibre o Mapbox.',
        },
        {
          title: 'ML en producción y pronósticos',
          body: 'Pronóstico de demanda, predicción de ventas y API de inferencia, evaluados contra una línea base antes de llegar a producción.',
        },
        {
          title: 'Plataformas de datos y tableros',
          body: 'Pipelines, almacenes de datos y tableros en BigQuery, Redshift o PostgreSQL, con control de costos y reglas de privacidad integrados.',
        },
      ],
    },
    collab: {
      title: 'Formas de colaborar',
      items: [
        { title: 'Por proyecto', body: 'Alcance definido, entregables claros y calendario. Buena opción para llevar un prototipo a producción.' },
        {
          title: 'Asesoría',
          body: 'Revisión de arquitectura y modelos, elección de stack y proveedores, y una segunda opinión antes de comprometer presupuesto.',
        },
        {
          title: 'Colaboración en investigación',
          body: 'Investigación aplicada en agentes, grafos de conocimiento o ML espacial, con evaluación sistemática, como mi trabajo en UTSA.',
        },
        {
          title: 'Talleres y capacitación',
          body: 'Sesiones prácticas para equipos que adoptan LLM o herramientas geoespaciales, basadas en cómo he formado a becarios en IA legal.',
        },
      ],
    },
  },
  notFound: {
    metaTitle: 'Página no encontrada · Gairo Peralta',
    eyebrow: 'Error 404',
    title: 'Estas coordenadas no están en el *mapa*.',
    body: 'La página cambió de lugar o nunca existió. Vuelve a terreno conocido y sigue desde ahí.',
    home: 'Volver al inicio',
    work: 'Ver proyectos',
  },
};

export default es;
