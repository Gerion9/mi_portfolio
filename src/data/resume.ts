/**
 * Résumé content in both languages. Mirrors resume_latex/resume_gairo_peralta_onecolumn.tex
 * (the PDF source) plus technologies verified in src/data/projects.json.
 */
import type { Lang } from '../i18n';

export interface Role {
  position: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface Degree {
  institution: string;
  degree: string;
  period: string;
  note: string;
  current: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string | null;
}

export interface ResumeData {
  experience: Role[];
  education: Degree[];
  skills: { group: string; items: string[] }[];
  certifications: Certification[];
  languages: { name: string; level: string }[];
}

const en: ResumeData = {
  experience: [
    {
      position: 'Lead AI Engineer',
      company: 'BlackPrint Technologies',
      location: 'Remote',
      period: '2025 – Present',
      current: true,
      bullets: [
        'Led the map copilot\'s redesign into a tool-grounded agent (Copilot v2): 38 FastMCP tools with per-tool authorization, 53 user-confirmed UI actions and a 778-question blind-annotated gold eval set.',
        'Architected a production WhatsApp agent that qualifies real-estate leads and books appointments via OpenAI tool calling, with a deterministic slot validator, human takeover and 13 golden evals.',
        'Built GromAI Report Studio, grounding Claude site-report narratives behind a numeric firewall, claim ledger and anti-leak guard with deterministic fallback; 15 eval suites and 2,809 tests.',
        'Built an expansion-planning OS demoed to three chains: Claude tool calling over deterministic services (87% prompt-cache hits, 58/58 Q&A audit) and a finance engine within +0.27% of public disclosures.',
        'Led mireporte.ai, which turns a map point into a 25-section market study, from 3 to 11 metro areas: per-city data contracts that fail the build on drift, sha256 manifests, 19 ADRs and 5,043 tests.',
        'Built an LLM-powered GeoAI platform for 2.5M+ urban blocks and a multi-brand site selector (63,724 blocks, 117 municipalities) whose v1.2 sales model cut leave-one-out MAPE from 106% to 22%.',
        'Scored the payment-acceptance propensity of ~5.5M merchants for a global payments network (45 GB Postgres to a 70 MB Parquet via DuckDB) and reconciled 230,553 business records with MiniLM embeddings.',
        'Built logistics optimizers: an exact MILP (HiGHS) partner selector on a 4,851-pair OSRM drive-time matrix for a digital pharmacy, and VRP routing for a pharma distributor\'s 3,100+ pharmacy pilot.',
      ],
    },
    {
      position: 'Lead AI/ML Engineer (Consulting)',
      company: 'Law Offices of Manuel Solis',
      location: 'Remote',
      period: '2025 – Jul 2026',
      current: false,
      bullets: [
        'Led custom LLM agents for T-Visa declarations and cover letters, cutting turnaround from ~2 hours to ~15 minutes per document (~8× faster).',
        'Built a meeting-intelligence platform with Speechmatics transcription, GPT-5 structured summaries, Pinecone search and group-based RBAC.',
        'Automated email-to-case database ingestion and assignment.',
      ],
    },
    {
      position: 'Visiting Student Researcher (Medical AI, volunteer)',
      company: 'UT San Antonio',
      location: 'San Antonio, TX',
      period: '2025 – Jan 2026',
      current: false,
      bullets: [
        'Developed a multi-agent medical QA system grounded in PrimeKG (4M+ nodes, 33M+ edges) and Neo4j.',
        'Reached 54.69% QA accuracy (+24.24 pp) with multi-hop reasoning and systematic evaluation.',
      ],
    },
    {
      position: 'AI/ML Engineer',
      company: 'STRTGY',
      location: 'Remote',
      period: '2023 – 2025',
      current: false,
      bullets: [
        'Built a RAG assistant for industrial real estate (Claude 3.5 Sonnet, FAISS; +90% response relevance, 85% faster queries) and GPT-4 Vision competitor mapping in ArcGIS (+82% decision confidence).',
        'Built adaptive demand forecasting for a beverage-industry client (Prophet or SARIMA chosen per SKU history, with inventory optimization): +42% forecast accuracy and 30% lower inventory cost.',
      ],
    },
    {
      position: 'AI Engineer (Contract)',
      company: 'PRODENSA',
      location: 'Remote',
      period: '2024 – 2025',
      current: false,
      bullets: [
        'Built OCR + Llama 3.3 extraction for invoices, packing lists and customs documents (95% accuracy, 98% less processing time) with FastAPI, React/Vite and async PDF/CSV/XLSX ingestion.',
      ],
    },
    {
      position: 'Data Scientist',
      company: 'BlackPrint Technologies',
      location: 'Berkeley, CA',
      period: '2022 – 2023',
      current: false,
      bullets: [
        'Delivered property analytics with Google Maps geocoding (92% accuracy) and pandas/SQL ETL pipelines with 99.9% deliverable accuracy.',
      ],
    },
  ],
  education: [
    {
      institution: 'Tecnológico de Monterrey',
      degree: "Master's in Applied Artificial Intelligence (MNA)",
      period: 'Expected 2027',
      note: 'Grade: 98/100',
      current: true,
    },
    {
      institution: 'University of California, Berkeley',
      degree: 'BA in Data Science',
      period: '2022',
      note: 'Machine learning, statistics and data visualization',
      current: false,
    },
  ],
  skills: [
    { group: 'GenAI / LLM', items: ['RAG', 'Agents', 'LangGraph', 'LangChain', 'Fine-tuning (LoRA)', 'Embeddings', 'FAISS', 'Pinecone', 'Speechmatics'] },
    { group: 'LLM platforms', items: ['OpenAI (GPT-4o / GPT-5)', 'Claude', 'Gemini', 'Llama'] },
    { group: 'ML / DL', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'LSTM', 'Forecasting'] },
    { group: 'Geo', items: ['GeoPandas', 'MapLibre GL', 'Mapbox GL', 'Turf.js', 'H3', 'ArcGIS', 'QGIS'] },
    { group: 'Data', items: ['Python', 'SQL', 'BigQuery', 'Redshift', 'pandas', 'NumPy', 'Neo4j', 'MongoDB'] },
    { group: 'Backend / Cloud', items: ['FastAPI', 'Node.js', 'TypeScript', 'Next.js', 'Google Cloud', 'Terraform', 'MLflow', 'Docker'] },
  ],
  certifications: [
    {
      name: 'Enterprise Data Science in Practice',
      issuer: 'IBM SkillsBuild',
      date: 'Mar 2025',
      verifyUrl: 'https://www.credly.com/badges/7c138adb-18cb-43a2-8ded-d3b2b6948432',
    },
    {
      name: 'Data Analysis with Python',
      issuer: 'Cognitive Class (IBM)',
      date: 'Mar 2025',
      verifyUrl: 'https://courses.cognitiveclass.ai/certificates/1e33d232e7d8463dbaa62632bac62289',
    },
    {
      name: 'Sutardja Center for Entrepreneurship Certificate',
      issuer: 'UC Berkeley, Sutardja Center for Entrepreneurship & Technology',
      date: 'Fall 2022',
      verifyUrl: null,
    },
  ],
  languages: [
    { name: 'English', level: '' },
    { name: 'Spanish', level: '' },
  ],
};

const es: ResumeData = {
  experience: [
    {
      position: 'Ingeniero líder de IA',
      company: 'BlackPrint Technologies',
      location: 'Remoto',
      period: '2025 – actual',
      current: true,
      bullets: [
        'Dirigió el rediseño del copiloto de mapas como un agente basado en herramientas (Copilot v2): 38 herramientas de FastMCP con autorización por herramienta, 53 acciones de interfaz que confirma la persona usuaria y un conjunto dorado de evaluación de 778 preguntas anotado a ciegas.',
        'Diseñó un agente de WhatsApp en producción que califica prospectos inmobiliarios y agenda citas con tool calling de OpenAI, con un validador determinista de datos, intervención humana y 13 evaluaciones doradas.',
        'Construyó GromAI Report Studio, que fundamenta las narrativas de reportes de sitio generadas con Claude tras un cortafuegos numérico, un registro de afirmaciones y una guarda contra fugas, con respaldo determinista; 15 suites de evaluación y 2,809 pruebas.',
        'Construyó un sistema operativo de expansión presentado como demo a tres cadenas: tool calling de Claude sobre servicios deterministas (87 % de aciertos en la caché de prompts, auditoría de preguntas 58/58) y un motor financiero calibrado a +0.27 % de la divulgación pública.',
        'Dirigió mireporte.ai, que convierte un punto en el mapa en un estudio de mercado de 25 secciones, de 3 a 11 zonas metropolitanas: contratos de datos por ciudad que detienen el build si hay desviaciones, manifiestos sha256, 19 ADR y 5,043 pruebas.',
        'Construyó una plataforma GeoAI con LLM para más de 2.5 millones de manzanas urbanas y un selector de sitios multimarca (63,724 manzanas, 117 municipios) cuyo modelo de ventas v1.2 redujo el MAPE de validación cruzada dejando uno fuera de 106 % a 22 %.',
        'Calculó la propensión a aceptar pagos de ~5.5 millones de comercios para una red global de pagos (de 45 GB en Postgres a un Parquet de 70 MB con DuckDB) y concilió 230,553 registros de negocios con embeddings de MiniLM.',
        'Construyó optimizadores logísticos: un selector exacto de socios con MILP (HiGHS) sobre una matriz de tiempos de manejo de OSRM con 4,851 pares para una farmacia digital, y ruteo VRP para el piloto de más de 3,100 farmacias de una distribuidora farmacéutica.',
      ],
    },
    {
      position: 'Ingeniero líder de IA/ML (consultoría)',
      company: 'Law Offices of Manuel Solis',
      location: 'Remoto',
      period: '2025 – jul 2026',
      current: false,
      bullets: [
        'Dirigió agentes de LLM para declaraciones de visa T y cartas de presentación, que redujeron el tiempo por documento de ~2 horas a ~15 minutos (~8 veces más rápido).',
        'Construyó una plataforma de inteligencia de reuniones con transcripción de Speechmatics, resúmenes estructurados con GPT-5, búsqueda en Pinecone y control de acceso por grupos.',
        'Automatizó la ingesta de correos a la base de casos y su asignación.',
      ],
    },
    {
      position: 'Estudiante investigador visitante (IA médica, voluntario)',
      company: 'UT San Antonio',
      location: 'San Antonio, TX',
      period: '2025 – ene 2026',
      current: false,
      bullets: [
        'Desarrolló un sistema multiagente de QA médico anclado en PrimeKG (más de 4 millones de nodos y 33 millones de aristas) y Neo4j.',
        'Alcanzó 54.69 % de precisión en QA (+24.24 pp) con razonamiento multisalto y evaluación sistemática.',
      ],
    },
    {
      position: 'Ingeniero de IA/ML',
      company: 'STRTGY',
      location: 'Remoto',
      period: '2023 – 2025',
      current: false,
      bullets: [
        'Construyó un asistente RAG para bienes raíces industriales (Claude 3.5 Sonnet, FAISS; +90 % de relevancia en las respuestas y consultas 85 % más rápidas) y un mapeo de competidores con GPT-4 Vision en ArcGIS (+82 % de confianza en las decisiones).',
        'Construyó pronósticos de demanda adaptativos para un cliente de la industria de bebidas (Prophet o SARIMA según el historial de cada SKU, con optimización de inventario): +42 % de precisión y 30 % menos costo de inventario.',
      ],
    },
    {
      position: 'Ingeniero de IA (contrato)',
      company: 'PRODENSA',
      location: 'Remoto',
      period: '2024 – 2025',
      current: false,
      bullets: [
        'Construyó extracción con OCR y Llama 3.3 para facturas, listas de empaque y documentos aduanales (95 % de precisión y 98 % menos tiempo de procesamiento) con FastAPI, React/Vite e ingesta asíncrona de PDF, CSV y XLSX.',
      ],
    },
    {
      position: 'Científico de datos',
      company: 'BlackPrint Technologies',
      location: 'Berkeley, CA',
      period: '2022 – 2023',
      current: false,
      bullets: [
        'Entregó analítica inmobiliaria con geocodificación de Google Maps (92 % de precisión) y pipelines ETL en pandas/SQL con 99.9 % de precisión en los entregables.',
      ],
    },
  ],
  education: [
    {
      institution: 'Tecnológico de Monterrey',
      degree: 'Maestría en Inteligencia Artificial Aplicada (MNA)',
      period: 'Fin previsto: 2027',
      note: 'Promedio: 98/100',
      current: true,
    },
    {
      institution: 'Universidad de California, Berkeley',
      degree: 'Licenciatura en Ciencia de Datos',
      period: '2022',
      note: 'Aprendizaje automático, estadística y visualización de datos',
      current: false,
    },
  ],
  skills: [
    { group: 'IA generativa / LLM', items: ['RAG', 'Agentes', 'LangGraph', 'LangChain', 'Ajuste fino (LoRA)', 'Embeddings', 'FAISS', 'Pinecone', 'Speechmatics'] },
    { group: 'Plataformas de LLM', items: ['OpenAI (GPT-4o / GPT-5)', 'Claude', 'Gemini', 'Llama'] },
    { group: 'ML / DL', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'LSTM', 'Pronósticos'] },
    { group: 'Geoespacial', items: ['GeoPandas', 'MapLibre GL', 'Mapbox GL', 'Turf.js', 'H3', 'ArcGIS', 'QGIS'] },
    { group: 'Datos', items: ['Python', 'SQL', 'BigQuery', 'Redshift', 'pandas', 'NumPy', 'Neo4j', 'MongoDB'] },
    { group: 'Backend / nube', items: ['FastAPI', 'Node.js', 'TypeScript', 'Next.js', 'Google Cloud', 'Terraform', 'MLflow', 'Docker'] },
  ],
  certifications: [
    {
      name: 'Enterprise Data Science in Practice',
      issuer: 'IBM SkillsBuild',
      date: 'mar 2025',
      verifyUrl: 'https://www.credly.com/badges/7c138adb-18cb-43a2-8ded-d3b2b6948432',
    },
    {
      name: 'Data Analysis with Python',
      issuer: 'Cognitive Class (IBM)',
      date: 'mar 2025',
      verifyUrl: 'https://courses.cognitiveclass.ai/certificates/1e33d232e7d8463dbaa62632bac62289',
    },
    {
      name: 'Sutardja Center for Entrepreneurship Certificate',
      issuer: 'UC Berkeley, Sutardja Center for Entrepreneurship & Technology',
      date: 'otoño de 2022',
      verifyUrl: null,
    },
  ],
  languages: [
    { name: 'Español', level: '' },
    { name: 'Inglés', level: '' },
  ],
};

export const RESUME: Record<Lang, ResumeData> = { en, es };
