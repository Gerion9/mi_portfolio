/**
 * English copy. *Asterisks* mark serif-italic accent words in headings.
 * es.ts must keep exactly the same shape (enforced by the Copy type).
 * Every metric traces to src/data/projects.json or the résumé (resume_latex/).
 */
const en = {
  nav: {
    work: 'Work',
    about: 'About',
    resume: 'Résumé',
    contact: 'Contact',
    cta: 'Get in touch',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    langSwitch: 'Language',
  },
  footer: {
    tagline: 'AI/ML engineer building systems that read maps, documents and conversations.',
    builtWith: 'Built with Astro, WebGL and Motion.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    pages: 'Pages',
    connect: 'Connect',
    elsewhere: 'Elsewhere',
    privacy: 'Privacy',
    terms: 'Terms',
  },
  home: {
    metaTitle: 'Gairo Peralta · AI/ML Engineer, LLM Systems & GeoAI',
    metaDescription:
      'AI/ML engineer building LLM agents, GeoAI platforms and production ML: market studies across 11 metro areas, payments data for ~5.5M merchants, legal drafting ~8× faster.',
    status: 'Now: Lead AI Engineer at BlackPrint Technologies',
    headline: 'I build AI that reads *places* and *language*.',
    sub: 'LLM agents, GeoAI platforms and production ML pipelines that turn maps, documents and conversations into answers your team can check.',
    roles: ['LLM systems & agents', 'GeoAI platforms', 'Production ML', 'Spatial data pipelines'],
    ctaPrimary: 'See the work',
    ctaSecondary: 'Download résumé (PDF)',
    scroll: 'Scroll',
    hudPointer: 'Inspecting',
    hudAuto: 'Autopilot',
    affiliationsLabel: "Where I've worked and studied",
    impact: {
      eyebrow: 'Measured outcomes',
      title: 'Every number, with its *project*.',
      items: [
        { value: '2.5M+', label: 'urban blocks with real-time inference', context: 'LLM GeoAI Platform · BlackPrint Technologies' },
        { value: '~5.5M', label: 'merchants scored for payment-acceptance propensity', context: 'Acceptance Radar · BlackPrint Technologies' },
        { value: '~8×', label: 'faster legal drafting: ~2 h → ~15 min', context: 'LLM agents · Law Offices of Manuel Solis' },
        { value: '+24.2pp', label: 'medical QA accuracy, reaching 54.69%', context: 'Multi-agent QA on PrimeKG · UT San Antonio' },
      ],
    },
    capabilities: {
      eyebrow: 'What I build',
      title: 'From the data warehouse to the *map* on screen.',
      intro:
        'Most projects need all four: mireporte.ai turns a point on a map into a frozen 25-section market study built on ten data layers.',
      cards: [
        {
          title: 'GeoAI & spatial intelligence',
          body: 'Models and maps for where-questions: site selection, competitive attraction, POI matching and risk indices, from H3 cells to census blocks.',
          tags: ['MapLibre GL', 'H3', 'GeoPandas', 'Turf.js'],
        },
        {
          title: 'LLM systems & agents',
          body: 'Multi-agent orchestration, RAG and document pipelines: verified SQL, audit trails, role-based access and a handoff to human operators.',
          tags: ['LangGraph', 'RAG', 'Pinecone', 'Neo4j'],
        },
        {
          title: 'Production ML & forecasting',
          body: 'Models that run behind an API, not in a notebook: demand forecasting with +42% accuracy and 30% lower inventory cost, and a site-sales model whose leave-one-out error fell from 106% to 22%.',
          tags: ['PyTorch', 'XGBoost', 'FastAPI', 'MLflow'],
        },
        {
          title: 'Data platforms & pipelines',
          body: "Warehouses and ETL built to hold up: BigQuery with cost gates, Redshift with a CSV fallback, anonymized exports under Mexico's LFPDPPP.",
          tags: ['BigQuery', 'Redshift', 'Terraform', 'pandas'],
        },
      ],
    },
    work: {
      eyebrow: 'Selected work',
      title: 'From city *blocks* to case *files*.',
      intro:
        'Five projects from 2025–2026: territory intelligence, field-sales routing, payments data at national scale, legal AI and medical research.',
      viewAll: 'See all {count} projects',
      readCase: 'Read the case',
      featured: [
        {
          slug: 'mireporte-ai',
          outcome: 'Turns a point on the map into a frozen 25-section market study across 11 metro areas, kept honest by 5,043 passing tests.',
        },
        {
          slug: 'pharma-field-sales',
          outcome: 'Driving-aware daily routes, GPS-verified pharmacy visits with photo evidence and supervisor review for a five-role sales team.',
        },
        {
          slug: 'acceptance-radar',
          outcome: 'Scores payment-acceptance propensity across ~5.5M merchants; a 45 GB extract now ships as a 70 MB Parquet file.',
        },
        {
          slug: 'declarationletteronline',
          outcome: 'Turns questionnaires into court-formatted declaration letters in under 60 seconds, with a local audit trail.',
        },
        {
          slug: 'medical-qa-multi-agent-system',
          outcome: 'Four agents reason over PrimeKG (4M+ nodes) in Neo4j and lift medical QA accuracy 24.24 points, to 54.69%.',
        },
      ],
    },
    path: {
      eyebrow: 'Path',
      title: 'From Berkeley data science to AI in *production*.',
      milestones: [
        { year: '2022', text: 'BA in Data Science, UC Berkeley' },
        { year: '2023', text: 'AI/ML Engineer at STRTGY: GeoAI and RAG' },
        { year: '2024', text: 'OCR + Llama 3.3 extraction for PRODENSA' },
        { year: '2025', text: 'Back to BlackPrint; legal AI lead; UTSA research' },
        { year: '2026', text: 'mireporte.ai and GeoAI products at BlackPrint' },
      ],
      cta: 'See the full timeline',
    },
    closing: {
      eyebrow: 'Contact',
      title: 'Working with maps, documents or *both*?',
      sub: 'Tell me what you need to decide and what data you have. I reply within 24–48 hours.',
      email: 'Email me',
      copy: 'Copy email',
      copied: 'Email copied',
      linkedin: 'LinkedIn',
    },
  },
  about: {
    metaTitle: 'About · Gairo Peralta, AI/ML Engineer',
    metaDescription:
      'Gairo Peralta (Gairo Yostin Peralta Alvarez) builds LLM agents and GeoAI platforms. BA Data Science, UC Berkeley; Master’s in Applied AI, Tec de Monterrey.',
    eyebrow: 'About',
    title: 'An engineer for problems that live on a *map* or in a *document*.',
    intro:
      "I'm Gairo Peralta, an AI/ML engineer. I build systems that turn city blocks, legal files and medical questions into answers people can check, then measure whether they hold up.",
    bio: [
      'As Lead AI Engineer at BlackPrint Technologies, I design territory-intelligence products on Mexican census and commercial data. I led mireporte.ai, which turns a point on a map into a 25-section market study across eleven metro areas, and built field-sales routing, payment-acceptance scoring for ~5.5M merchants and a pipeline that reconciles 230k+ points of interest.',
      'From 2025 to July 2026 I also led AI work for the Law Offices of Manuel Solis as a consultant, guiding a team of interns. Our LLM agents cut turnaround on T-Visa declarations and cover letters from about two hours to about fifteen minutes per document. We also built a meeting-intelligence platform with role-based access and a certified-translation pipeline on Gemini Vision.',
      "From 2025 to January 2026 I was a visiting student researcher in medical AI at UT San Antonio (volunteer), where four agents reasoning over PrimeKG reached 54.69% accuracy on medical QA, a 24.24-point gain. I hold a BA in Data Science from UC Berkeley (2022) and am completing a Master's in Applied AI at Tecnológico de Monterrey (expected 2027, grade 98/100).",
      "I work in English and Spanish, which helps when the data comes from INEGI and the client drafts U.S. immigration filings. I'm known professionally as Gairo Peralta; my full legal name is Gairo Yostin Peralta Alvarez in Mexico and Gairo Yostin Peralta in the United States.",
    ],
    facts: [
      { label: 'Focus', value: 'LLM agents, GeoAI, production ML' },
      { label: 'Education', value: "BA Data Science, UC Berkeley · Master's in Applied AI, Tec" },
      { label: 'Currently', value: 'Lead AI Engineer, BlackPrint Technologies' },
      { label: 'Languages', value: 'English and Spanish' },
    ],
    timelineTitle: 'The path so far',
    timelineIntro: 'Roles, research and degrees since 2022, newest first.',
    principles: {
      title: 'Working principles',
      items: [
        {
          title: 'Evaluate before you demo',
          body: 'A demo proves one answer; an evaluation proves the rate. The medical QA work reports 54.69% accuracy and a 24.24-point lift, not a highlight reel.',
        },
        {
          title: 'Check the cost before the query',
          body: 'On a ~79 GB BigQuery lake, a vague question can get expensive. In Meridian, a SQL validator and four-tier cost gates check every generated query before it can run.',
        },
        {
          title: 'Privacy goes in the pipeline',
          body: "NetAiCore analyzes chatbot conversations under Mexico's LFPDPPP: anonymization runs inside the pipeline, and the shareable dashboard shows no PII.",
        },
        {
          title: 'Leave room for a human',
          body: "BrokerAI's agent qualifies leads, but operators watch conversations live and can take over, with Telegram alerts when a chat needs a person.",
        },
      ],
    },
    approach: {
      title: 'How a project runs',
      steps: [
        { title: 'Frame the decision', body: 'Start from the decision the system should support and the data that already exists, not from a model.' },
        { title: 'Test on your data', body: 'A small prototype on your data, scored against an evaluation set, shows what works before anything scales.' },
        {
          title: 'Build for production',
          body: 'APIs, infrastructure as code, cost controls and access rules go in early, so the prototype can grow instead of being rewritten.',
        },
        { title: 'Hand off and measure', body: 'Documentation and training for the team that inherits it, plus the agreed metric, tracked after launch.' },
      ],
    },
    interests: {
      title: "What I'm exploring",
      items: [
        { title: 'Text-to-SQL that knows its limits', body: "Agents that check their own SQL, explain their joins and say so when the data can't answer the question." },
        { title: 'Places as embeddings', body: 'Representing blocks, POIs and neighborhoods as vectors, so models can compare places the way they compare text.' },
        { title: 'Graphs that ground LLM answers', body: 'Multi-hop reasoning over knowledge graphs like PrimeKG, so every answer can point back to its evidence.' },
        { title: 'Analytics that protect people', body: 'Getting cohorts, topics and sentiment out of conversations without exposing the people who wrote them.' },
      ],
    },
    cta: {
      title: "Bring the problem. I'll bring the *questions*.",
      sub: 'Send a short note about the problem and the data behind it. I reply within 24–48 hours.',
      primary: 'Get in touch',
      secondary: 'See the work',
    },
  },
  work: {
    metaTitle: 'Work · Gairo Peralta, AI/ML Engineer',
    metaDescription:
      'Every project with its stack and results: LLM agents, GeoAI platforms, production ML and data pipelines for legal, urban and research teams.',
    eyebrow: 'Work',
    title: 'The work, *project* by project.',
    intro:
      '{count} projects since 2021, each with what it does, its stack and its results. Filter by domain or organization, or search by tool.',
    searchPlaceholder: 'Search by tool, project or organization',
    filterLabel: 'Filter by domain',
    domains: {
      all: 'All',
      llm: 'LLM & agents',
      geo: 'GeoAI & maps',
      ml: 'ML & forecasting',
      data: 'Data & pipelines',
      web: 'Web apps',
    },
    companyLabel: 'Organization',
    allCompanies: 'All organizations',
    viewList: 'List',
    viewGrid: 'Grid',
    results: '{count} projects',
    resultsOne: '1 project',
    emptyTitle: 'Nothing in this part of the map',
    emptyBody: 'No project matches those filters. Try a broader term or clear the filters.',
    reset: 'Clear filters',
    dialog: {
      overview: 'Overview',
      results: 'Results',
      highlights: 'Highlights',
      stack: 'Stack',
      close: 'Close',
      prev: 'Previous project',
      next: 'Next project',
      openCase: 'Open case study',
    },
    case: {
      breadcrumb: 'Work',
      back: 'All work',
      organization: 'Organization',
      date: 'Date',
      domain: 'Domain',
      more: 'More work',
      ctaTitle: 'Working on something *similar*?',
      ctaBody: 'Tell me about the problem and the data behind it. I reply within 24–48 hours.',
      ctaButton: 'Discuss a project',
    },
  },
  resume: {
    metaTitle: 'Résumé · Gairo Peralta, AI/ML Engineer',
    metaDescription:
      'Résumé of Gairo Peralta, Lead AI Engineer at BlackPrint Technologies: LLM agents, GeoAI and production ML; before that, legal AI for Manuel Solis and medical AI research at UTSA. View online or download the PDF.',
    eyebrow: 'Résumé',
    title: 'The short version',
    intro: 'Roles, results and skills on one screen. The PDF version is formatted for applicant tracking systems.',
    download: 'Download PDF',
    openPdf: 'Open in new tab',
    updated: 'Updated {date}',
    sections: {
      summary: 'Summary',
      experience: 'Experience',
      projects: 'Selected projects',
      skills: 'Skills',
      education: 'Education',
      certifications: 'Certifications',
      languages: 'Languages',
    },
    summary:
      "Lead AI Engineer at BlackPrint Technologies, building LLM agents, GeoAI platforms and production ML. At BlackPrint: mireporte.ai market studies across 11 metro areas, GeoAI over 2.5M+ urban blocks and payment-acceptance scoring for ~5.5M merchants. For the Law Offices of Manuel Solis: legal LLM agents that cut document turnaround ~8×. Medical AI research, UTSA. BA Data Science, Berkeley; Master's in Applied AI, Tec.",
    verify: 'Verify',
    current: 'Current',
    preview: 'PDF preview',
  },
  contact: {
    metaTitle: 'Contact · Gairo Peralta, AI/ML Engineer',
    metaDescription:
      'Write to Gairo Peralta about LLM agents, GeoAI, production ML or a research collaboration. Replies within 24–48 hours, in English or Spanish.',
    eyebrow: 'Contact',
    title: "Tell me what you're trying to *decide*.",
    intro:
      'A short note is enough: the problem, the data you have and your timeline. I reply within 24–48 hours, in English or Spanish.',
    form: {
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      emailPh: 'you@company.com',
      company: 'Company or institution (optional)',
      companyPh: 'Company, firm or lab',
      topic: 'Topic (optional)',
      topicPh: 'Choose a topic',
      topics: [
        'A role on your team',
        'A project with a defined scope',
        'Advisory or technical review',
        'Research collaboration',
        'Something else',
      ],
      message: 'Message',
      messagePh: 'What are you working on, and what data do you have?',
      submit: 'Send message',
      sending: 'Sending…',
      successTitle: 'Message sent',
      successBody: "Thanks. I'll reply within 24–48 hours at the email you entered.",
      errorTitle: "The message didn't go through",
      errorBody: 'Something went wrong while sending. Try again, or write to me directly at gairo@berkeley.edu.',
      required: 'This field is required',
      invalidEmail: 'Enter a valid email address',
      tooShort: 'Too short: at least {min} characters',
    },
    direct: {
      title: 'Prefer email?',
      emailLabel: 'Email',
      copy: 'Copy email',
      copied: 'Email copied',
      responseTime: 'Usual reply time: 24–48 hours',
    },
    next: {
      title: 'What happens next',
      steps: [
        { title: 'I read and reply', body: 'Within 24–48 hours, with follow-up questions if I need more context.' },
        { title: 'A short call', body: 'If the project fits, we schedule a call to walk through the problem and your data.' },
        { title: 'A written proposal', body: 'Scope, approach and timeline in writing before any work starts.' },
      ],
    },
    services: {
      title: 'What I can help with',
      items: [
        {
          title: 'LLM systems & agents',
          body: 'Agents, RAG and document pipelines for text-heavy work: legal drafting, meeting notes, OCR extraction and text-to-SQL over large warehouses.',
        },
        {
          title: 'GeoAI & location intelligence',
          body: 'Site selection, market potential, POI matching and risk indices, delivered as interactive maps on MapLibre or Mapbox.',
        },
        {
          title: 'Production ML & forecasting',
          body: 'Demand forecasting, sales prediction and inference APIs, evaluated against a baseline before they reach production.',
        },
        {
          title: 'Data platforms & dashboards',
          body: 'Pipelines, warehouses and dashboards on BigQuery, Redshift or PostgreSQL, with cost controls and privacy rules built in.',
        },
      ],
    },
    collab: {
      title: 'Ways to work together',
      items: [
        { title: 'Project-based', body: 'A defined scope, clear deliverables and a timeline. A good fit for taking a prototype to production.' },
        { title: 'Advisory', body: 'Architecture and model reviews, stack and vendor choices and a second opinion before you commit budget.' },
        {
          title: 'Research collaboration',
          body: 'Applied research on agents, knowledge graphs or spatial ML, with systematic evaluation, as in my medical AI work at UTSA.',
        },
        {
          title: 'Workshops & training',
          body: 'Hands-on sessions for teams adopting LLMs or geospatial tools, drawn from training interns on production legal AI.',
        },
      ],
    },
  },
  notFound: {
    metaTitle: 'Page not found · Gairo Peralta',
    eyebrow: 'Error 404',
    title: "These coordinates aren't on the *map*.",
    body: 'The page moved or never existed. Head back to known territory and pick up from there.',
    home: 'Back to home',
    work: 'See the work',
  },
};

export default en;
