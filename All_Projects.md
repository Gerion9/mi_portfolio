# All Projects - Gairo Y. Peralta

This document contains a complete list of all my projects, chronologically ordered from most recent to oldest.

## 2026

### NetAiCore: Affinity Network & NLP Analysis Ecosystem
**Company:** BlackPrint Technologies  
**Date:** May 2026  
**Impact Metrics:** 
- Anonymized Exports: 100% Compliant
- NLP Extraction Time: Seconds

**Technologies:** Python, spaCy, BERTopic, NetworkX, HDBSCAN, Streamlit, Quarto, Data Privacy (LFPDPPP), Data Pipelines

**Description:**
- Designed a 360-degree analytics ecosystem and secure anonymization pipeline for chatbot operational databases, extracting sociodemographic insights under LFPDPPP privacy regulations.
- Built an advanced NLP pipeline utilizing spaCy Spanish models and BERTopic for sentiment analysis and topic modeling on conversational logs.
- Developed a dual-mode Streamlit dashboard (internal with PII / shareable anonymized) and Quarto reporting scripts for stakeholders.
- Modelled user interactions as a social graph with NetworkX and grouped user cohorts using HDBSCAN and scikit-learn clustering.

**Impact:** This system enables safe, fully compliant sociodemographic insights and cohort modeling from raw chatbot conversations while guaranteeing strict protection of personally identifiable information.

### Radar Comercial Querétaro V2: Geospatial License Analytics Dashboard
**Company:** BlackPrint Technologies  
**Date:** May 2026  
**Impact Metrics:** 
- Data Volume: ~110k Licenses
- Connection: Redshift / CSV Fallback

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, MapLibre GL JS, Amazon Redshift, SQL Queries, Geospatial Analytics

**Description:**
- Built a high-performance geospatial analytics dashboard to visualize over 110,000 active and blocked commercial business licenses in Querétaro, mapping Redshift datasets with interactive bounding boxes and metadata export pipelines.
- Engineered an interactive MapLibre GL JS mapping interface showcasing spatial business distributions and density filters across Querétaro.
- Integrated dual-source data fetching connecting a production Amazon Redshift data warehouse with an optimized local CSV fallback parser.
- Designed a sleek, modern UI utilizing Next.js 15, Tailwind CSS, and shadcn/ui components for rapid bounding-box and metadata exports.

**Impact:** Translates complex commercial licensing spatial data into an optimized, interactive map dashboard, facilitating quick municipal zoning compatibility checks and license data extraction.

### BrokerAI: Conversational AI & Lead Qualification Engine
**Company:** BlackPrint Technologies  
**Date:** May 2026  
**Impact Metrics:** 
- Operator SLA: <15 mins
- Funnel Conversion: +34%

**Technologies:** Next.js 15, React 19, Tailwind CSS 4, FastAPI, OpenAI GPT-4o, Prisma ORM, WhatsApp Cloud API, Google Calendar API, Server-Sent Events, Turborepo

**Description:**
- Architected and built a production-grade WhatsApp conversational sales agent and real-time operator dashboard for progressive lead qualification and automated appointment booking.
- Designed a robust AI orchestrator using OpenAI GPT-4o and WhatsApp Cloud API for multi-stage lead qualification and dynamic booking slots via Google Calendar API.
- Developed a real-time operator workspace using Next.js 15, React 19, Tailwind CSS 4, and Server-Sent Events (SSE) for seamless human takeover.
- Built a secure database schema with Prisma ORM on Cloud SQL (PostgreSQL), deploying cron jobs for appointment reminders and SLA escalation alerts to Slack.

**Impact:** Automates housing development sales processes from initial contact to booked viewing, providing human operators a seamless dashboard to supervise AI agent performance.

### Meridian: Low-Code Territory Intelligence SaaS
**Company:** BlackPrint Technologies  
**Date:** May 2026  
**Impact Metrics:** 
- Database Scale: ~577M Rows
- Data Footprint: ~79GB

**Technologies:** Next.js 14, FastAPI, LangGraph, Google BigQuery, Terraform, Google Cloud Run, GIS, Geospatial Analysis, Multi-Agent Systems

**Description:**
- Architected a low-code SaaS platform mapping BigQuery-scale Mexican socio-demographic and geographic data into dynamically generated, explainable geospatial applications.
- Built a multi-agent orchestrator in LangGraph with 7 specialized agents (Profiler, Discovery, SQLGenerator, etc.) to translate natural language queries into verified SQL.
- Integrated a large-scale data lake of ~577M rows (~79GB) on Google BigQuery using strict dry-run cost gates and topological dictionaries to protect query costs.
- Designed IaC with Terraform for scalable deployment on GCP Cloud Run and integrated design tokens 1:1 using the BlackPrint Design System.

**Impact:** Empowers non-technical operators to query, visualize, and generate customized spatial analysis maps on demand in under a minute without manual SQL/infra work.

### SJS Sales Intelligence: Geospatial Predictive Modeling
**Company:** BlackPrint Technologies  
**Date:** April 2026  
**Impact Metrics:** 
- Forecast Acc.: ElasticNet/XGB
- Active Blocks: 100k+ Manzanas

**Technologies:** React, FastAPI, MapLibre GL JS, XGBoost, ElasticNet, Zustand, OSMnx, H3 Index, GeoJSON, Predictive Analytics

**Description:**
- Developed a predictive sales intelligence system and interactive GIS simulator to model branch performance and analyze competitive attraction in Querétaro.
- Designed a machine learning pipeline using XGBoost and ElasticNet to predict sales based on spatial competition, urban attractors, and mobility parameters.
- Built a high-fidelity React frontend with MapLibre GL JS to display interactive target markets, custom radar charts, and multi-scenario side-by-side comparisons.
- Implemented a FastAPI server delivering fast, on-demand inference for new-branch placement simulations with real-time UI updates.

**Impact:** Accelerates real estate site selection and sales estimations by integrating complex competitive spatial attraction indices into a user-friendly GIS environment.

### Proxy Security Risk Index: Neighborhood Safety Modeling
**Company:** BlackPrint Technologies  
**Date:** March 2026  
**Impact Metrics:** 
- Risk Classification: Jenks 5
- Census Granularity: AGEB/Manzana

**Technologies:** Python, GeoPandas, QGIS, mapclassify, Spatial Statistics, Moran's I (LISA), Kernel Density Estimation

**Description:**
- Designed a multi-factor geospatial proxy security index at the neighborhood (colonia) level for Ecatepec, modeling spatial crime correlation and public exposure metrics.
- Engineered a GeoPandas ETL pipeline integrating population census data (INEGI), business directories (DENUE), major transit corridors, and municipal crime figures (SESNSP).
- Calculated normalized per-capita exposure indices using WGS 84 / UTM Zone 14N projections and classified risk levels via Jenks Natural Breaks.
- Conducted advanced spatial autocorrelation using Local Moran's I (LISA) to detect crime spillover effects and hotspots near inter-municipal transit terminals.

**Impact:** Provides urban planners and security organizations with an objective, data-driven framework to analyze public exposure and risk boundaries beyond raw crime counts.

### Blackprint Radar: Multi-Source POI Matching Pipeline
**Company:** BlackPrint Technologies  
**Date:** March 2026  
**Impact Metrics:** 
- Match Rate: +9.1% (Gobierno)
- Processing Volume: 230k+ POIs

**Technologies:** Python, Pandas, NLP, Sentence Embeddings, Vector Search, STRtree, Spatial Grid, Pytest, BigQuery

**Description:**
- Engineered a high-performance, multi-stage deduplication and matching pipeline to merge, reconcile, and spatially enrich Point of Interest (POI) data from commercial and government sources in Querétaro.
- Developed an adaptive text-similarity algorithm combining Jaro-Winkler, Levenshtein, and semantic category similarity using paraphrase-multilingual sentence embeddings.
- Implemented a high-performance SpatialGrid cell bucketing algorithm to optimize hot-loop deduplication matching across 215k x 34k records in under 3 minutes.
- Engineered cadastral spatial joins using STRtree to enrich POIs with 2023 municipal zoning guidelines and verify business compatibility (AMAI / SCIAN classification).

**Impact:** Built a consolidated database connecting municipal business licenses with commercial POIs and cadastral data, enabling accurate tax, zoning, and retail analysis.

### H Barbería Colima: Client Booking & Management Web App
**Company:** Personal Project  
**Date:** February 2026  
**Impact Metrics:** 
- Google Calendar Sync: Real-Time
- Zero-Latency Booking: Responsive UI

**Technologies:** React 19, TypeScript, Vite 6, React Router DOM, React Helmet Async, CSS Modules, SEO Optimization

**Description:**
- Designed and developed a client-facing booking web app for a local barbershop in Colima, integrating custom calendar scheduling parameters per-barber and modern fluid galleries with SEO optimization.
- Developed a fluid scheduling workflow using React 19 and Vite 6, incorporating Google Calendar sync integrations to eliminate double bookings.
- Implemented responsive CSS modules with premium glassmorphism aesthetics and custom micro-animations to increase user engagement.
- Optimized load times and SEO rankings using React Helmet Async and semantic HTML, ensuring zero-latency transitions.

**Impact:** Provides a professional, highly responsive booking interface that eliminates booking conflicts through automated calendar syncing, enhancing customer acquisition and the shop's brand presence.

### OCR Gemini: Certified Legal Translation Pipeline
**Company:** Law Offices of Manuel Solis  
**Date:** January 2026  
**Impact Metrics:** 
- Layout Preservation: Yes
- Format: Bilingual DOCX

**Technologies:** Python, Google Gemini Vision API, python-docx, Certified Translation, OCR, Media Resolution Optimization, Data Pipelines, AI Application, Multi-page OCR

**Description:**
- Led and guided a team of interns to develop a high-fidelity Python CLI pipeline using Gemini Vision API, instructing them on OCR best practices and spatial layout mapping.
- Mentored interns on implementing a vision-based OCR pipeline utilizing Gemini Vision to extract and translate low-resolution legal scans with unmatched accuracy.
- Guided the team in building a layout-preserving DOCX compiler that maps text positions, tables, and headers into a professional bilingual format.
- Instructed junior engineers on integrating automatic media resolution preprocessing, reducing token costs while optimizing detection rates for certified signatures.

**Impact:** Automates certified translation and multi-page layout reconstruction of low-resolution court documents, delivering clean bilingual outputs and driving growth for case processing workflows.

## 2025

### Meeting Intelligence Platform for Legal Teams
**Company:** Law Offices of Manuel Solis  
**Date:** December 2025  
**Impact Metrics:** 
- Turnaround Time: ~8x Faster
- Actionable Summaries: Yes

**Technologies:** LLM, NLP, Speechmatics, Pinecone, RBAC, Data Processing, FastAPI, Vector Database

**Description:**
- Led the development and guided a team of interns to build a meeting intelligence system that converts Zoom/Teams/Meet recordings into searchable transcripts and structured summaries.
- Mentored interns in automating transcription and summarization workflows using Speechmatics and LLM APIs for case documentation.
- Guided the team in building semantic search across meetings using Pinecone vector indexing and retrieval.
- Instructed interns on implementing secure RBAC controls for admin, supervisor, and user access levels under industry best practices.

**Impact:** Saves legal teams hundreds of hours of manual transcription by enabling instant semantic searches across hundreds of hours of recordings with secure access controls.

### DeclarationLetterOnline: Legal AI Generator
**Company:** Law Offices of Manuel Solis  
**Date:** October 2025  
**Impact Metrics:** 
- Processing Time: <60s
- Format Accuracy: Century Schoolbook

**Technologies:** FastAPI, Python, React, Google Gemini AI, SQLite, python-docx, XML parsing, Legal AI Templates, Document Generation

**Description:**
- Led and directed a team of interns to build a production-grade FastAPI and React legal document generator utilizing Gemini 1.5 Pro, instructing them on prompt engineering, strict document styling, and secure local audit trails.
- Guided interns on developing a multi-stage NLP synthesis pipeline that ingests questionnaires and translates them into certified legal letters in Century Schoolbook format.
- Mentored the team in building an asynchronous processing workflow with local SQLite audit trails and structured XML parsing for automated DOCX compilation.
- Instructed junior developers on creating a React interface featuring real-time feedback loops, version control of draft revisions, and instant side-by-side editing.

**Impact:** Drastically reduces declaration letter creation time from hours to under 60 seconds, maintaining perfect formatting compliance required by immigration and federal courts.

### LLM GeoAI Platform for Urban Intelligence
**Company:** BlackPrint Technologies  
**Date:** August 2025  
**Impact Metrics:** 
- Urban Blocks: 2.5M+
- Real-time Inference: Yes

**Technologies:** Geospatial Analysis, Machine Learning, React, Mapbox GL, Turf.js, LLM, GeoAI, Data Visualization

**Description:**
- Shipped React + Mapbox + Turf.js pipelines for scalable geospatial visualization of 2.5M+ urban blocks.
- Integrated LLM reasoning to surface location intelligence insights in production.
- Delivered real-time analytics to support licensing and urban planning workflows.

**Impact:** Empowers cities and businesses to run high-speed spatial inferences and query geographic trends directly in natural language.

### Electoral and Socioeconomic Geospatial Analysis
**Company:** STRTGY  
**Date:** May 2025  
**Impact Metrics:** 
- Data Processed: 2.5M+
- Predictive Effectiveness: +78%

**Technologies:** Geospatial Analysis, Data Visualization, React, Python, ETL, GeoPandas, Mapbox GL, TypeScript, Turf.js, Data Processing, Inventory Optimization

**Description:**
- Developed an advanced analytical platform integrating historical electoral data (2018-2024) with socioeconomic indicators at the block level for all of Mexico, allowing multidimensional analysis of electoral behavior.
- Implemented a frontend with React 18, TypeScript 5.0, and Mapbox GL JS v2.15 with custom extensions for interactive geospatial visualization and spatial analysis using Turf.js.
- Designed and implemented Python scripts with GeoPandas for geospatial ETL, shapefile transformation, and vector processing for geometric schema unification.
- Processed more than 2.5M urban blocks from INEGI with more than 30 variables per entity, implementing AMAI classification algorithms for socioeconomic level calculation.
- Implemented topological optimization with adaptive Douglas-Peucker simplification and generation of vector tiling schemes with efficient encoding.

**Impact:** This platform represents a comprehensive geospatial data science system that combines advanced processing, analysis, and visualization techniques to extract valuable insights about the relationship between socioeconomic factors and electoral behavior in Mexico.

### Intelligent Commercial Document Analysis System
**Company:** Prodensa AI  
**Date:** April 2025  
**Impact Metrics:** 
- Extraction Accuracy: +95%
- Processing Time: 98% ↓

**Technologies:** AI Application, Document Processing, React, Vite, Tailwind CSS, PDF Processing, LLM Integration, NLP, Data Extraction, Frontend Development, Meta Llama, Prompt Engineering

**Description:**
- Designed and developed a multipurpose system to extract structured information from unstructured commercial documents such as invoices, packing lists, and customs documents.
- Implemented a modern frontend application with React and Vite, using Tailwind CSS for responsive design and Drag and Drop system for file handling.
- Created an advanced document processing system with support for multiple formats (PDF, CSV, XLSX) and worker threads for asynchronous processing without blocking the main thread.
- Developed advanced prompt engineering techniques for LLMs, with specialized templates for each document type, optimized parameter configuration, and advanced response validation.
- Implemented an optimized processing pipeline with asynchronous architecture, real-time progress tracking, robust error handling, and memory optimization.

**Impact:** This system significantly reduced the time spent on manual document analysis, improved accuracy in critical information extraction, and enabled efficient processing of large volumes of commercial documents with intelligent data validation.

### Medical QA Multi-Agent System
**Company:** UT San Antonio (Volunteer)  
**Date:** April 2025  
**Impact Metrics:** 
- Accuracy: 54.69%
- Lift: +24.24pp

**Technologies:** LLM, Agents, Knowledge Graph, Neo4j, Medical AI, NLP

**Description:**
- Designed specialized agents for clinical reasoning and evidence retrieval grounded in medical knowledge bases.
- Integrated Neo4j knowledge graph queries to support explainable QA outputs.
- Evaluated system performance with systematic benchmarking over PrimeKG datasets.

**Impact:** Improves clinical question-answering accuracy significantly through multi-hop reasoning over complex biomedical networks.

### Specialized Industrial Real Estate Chatbot
**Company:** STRTGY  
**Date:** March 2025  
**Impact Metrics:** 
- Response Relevance: +90%
- Query Time: 85% ↓

**Technologies:** Machine Learning, NLP, Python, Streamlit, RAG, LLM, Vector Database, Data Processing, AI Application, Anthropic Claude, OpenAI, PDF Generation

**Description:**
- Designed and implemented a custom RAG (Retrieval Augmented Generation) system with chatbot for the industrial real estate sector, integrating Anthropic's Claude 3.5 Sonnet and OpenAI APIs.
- Developed a data processing system for semantic vectorization (embeddings) of complex real estate information using OpenAI Embeddings and FAISS for efficient search.
- Implemented advanced prompt engineering techniques with a multi-layer system for contextualization, generation, and formatting, significantly improving the relevance and accuracy of responses.
- Created a dynamic PDF report generation system from conversations, using Jinja2 for templating and HTML-PDF conversion techniques for structured documents.
- Developed a customized user interface in Streamlit with multi-user authentication system, dynamic theming, and accessibility optimizations.

**Impact:** This project democratized access to complex industrial real estate market data through an intuitive conversational interface, significantly reducing the time to access specialized information and improving decision-making.

### Comprehensive Data Analysis Platform for TV Shopping Company
**Company:** STRTGY  
**Date:** February 2025  
**Impact Metrics:** 
- Analysis Time: 99% ↓
- User Adoption: +85%

**Technologies:** Data Analysis, Business Intelligence, FastAPI, React, MongoDB, Dashboard Development, API Development, ETL, Material UI, Python, JavaScript, Data Visualization, Microservices, SQL, Database Management, API Integration, Performance Optimization

**Description:**
- Developed a complete data analysis and business visualization ecosystem consisting of three interconnected projects: a RESTful API backend (FastAPI), an interactive dashboard (React), and a report generation platform (Flask with AI).
- Implemented a RESTful API with FastAPI that provides access to analytical data stored in MongoDB, with endpoints for different dimensions of business analysis.
- Designed and developed an interactive dashboard with React 18 and Material UI 6 for business KPI visualization, implementing visualizations with Recharts, D3.js, and React Leaflet.
- Created a data-driven decision-making solution, implementing KPIs for sales trends, customer segmentation, inventory turnover, and advertising effectiveness through interactive dashboards.
- Employed K-means clustering for customer segmentation and created interactive chloropleth maps using GeoJSON data, revealing geographical patterns in sales and customer behavior.
- Integrated Google Trends data using time series analysis to anticipate consumer interests, informing inventory management and marketing strategies.
- Implemented a multi-stage data processing pipeline, extracting data from SQL databases, storing in MongoDB, processing with pandas and numpy, and integrating external APIs for data enrichment.

**Impact:** This ecosystem provides the client with powerful capabilities for data-driven decision making, market trend analysis, inventory optimization, customer segmentation, and automated generation of executive reports, significantly improving analysis time and user engagement.

### Advanced Demand Forecasting & Inventory Optimization System
**Company:** STRTGY  
**Date:** January 2025  
**Impact Metrics:** 
- Forecast Accuracy: +42%
- Inventory Cost: 30% ↓

**Technologies:** Time Series Analysis, Machine Learning, Python, React, TypeScript, Data Processing, Inventory Optimization, Prophet, SARIMA, ETL, Data Visualization, Chart.js

**Description:**
- Developed a complete demand forecasting and inventory optimization system for the beverage industry, incorporating time series analysis, statistical modeling, and full-stack implementation.
- Designed and built a robust ETL pipeline for beverage sales data, with multiple source integration, advanced cleaning with pattern extraction, and automated outlier detection.
- Implemented an adaptive forecasting system that selects optimal algorithms based on data characteristics: Prophet for SKUs with sufficient history, SARIMA for products with moderate history, and moving averages as fallback.
- Developed a mathematical inventory optimization model incorporating lead time calculations, safety stock determination, capacity constraints, and turnover rate optimization.
- Created a modern and responsive dashboard with React/TypeScript, interactive visualizations with Chart.js, component-based architecture, and performance optimization through memoization and lazy loading.

**Impact:** This system significantly improved forecast accuracy and inventory management efficiency, reducing costs while maintaining optimal service levels for a major beverage company.

## 2024

### GeoAI Insights: Advanced Visualization of the Competitive Landscape
**Company:** STRTGY  
**Date:** September 2024  
**Impact Metrics:** 
- Decision Confidence: +82%
- Market Analysis Time: 70% ↓

**Technologies:** Geospatial Analysis, Machine Learning, Data Visualization, OpenAI, GIS, Social Media Analytics, Market Analysis, Strategic Planning, Decision Support Systems

**Description:**
- Leveraged GPT-4 and GPT Vision for competitor analysis, using chain of thought reasoning and previous examples to extract insights on employee count, building size, and competitor locations.
- Implemented GIS tools with GeoJSON and ArcGIS Online, overcoming data cleaning challenges to create detailed maps of showroom and retail locations.
- Utilized Storymaps in ArcGIS Online for effective visualization, balancing local and cloud-based processing based on analysis requirements.
- Developed gradient-based visualizations using ArcGIS API to highlight competition concentrations across the US, ensuring interpretability through interactive maps.
- Integrated AI-driven analysis with geospatial data, validating accuracy with GPT Vision API, to create a comprehensive competitive landscape view.

**Impact:** The project culminated in a powerful decision-support tool that enabled strategic planning for market entry and expansion in the U.S. market, providing robust foundations for strategic decisions in real-time.

### Interactive Personal Portfolio Development
**Company:** Personal Project  
**Date:** June 2024  
**Impact Metrics:** 
- Page Speed: 97/100
- Accessibility: 100%

**Technologies:** Web Development, UI/UX Design, Performance Optimization, React, Tailwind CSS, Astro, Content Management, Git, Version Control, Responsive Design, Accessibility, Component-Based Architecture, Animation

**Description:**
- Designed and developed an interactive personal portfolio using Astro, React, and Tailwind CSS, optimizing for performance and SEO while leveraging popular frameworks for UI development.
- Implemented a responsive and accessible design following W3C Web Content Accessibility Guidelines (WCAG), ensuring optimal user experience across all devices and tested using browser developer tools.
- Created reusable components for clean and maintainable code, including navigation menu, footer, and contact form, which facilitate effective data visualization and user interaction.
- Integrated smooth animations using Animate.css library to enhance interactivity and visual appeal, contributing to effective data storytelling and user engagement.
- Optimized website performance using Lighthouse, Google PageSpeed Insights, and WebPageTest tools, achieving fast loading times and a fluid user experience with measurable improvements.

**Impact:** This project demonstrates my skills in front-end web development, UI/UX design, and the ability to create efficient and attractive web solutions. The portfolio serves as a dynamic platform to showcase my projects and skills to potential employers and clients.

### Automated Data Analysis System for Motor Vehicle Company
**Company:** STRTGY  
**Date:** March 2024  
**Impact Metrics:** 
- Analysis Time: 90% ↓
- Reporting Quality: +45%

**Technologies:** Automation, ETL, Data Analysis, Documentation, Survey Data, Data Cleaning, AI-Driven Insight Generation, User Interface Design, Data Selection, Rapid Report Generation

**Description:**
- Developed an automated system for efficient analysis of large-scale web analytics data using Google Analytics metrics and dimensions, with on-demand data extraction and batch processing.
- Designed and implemented a comprehensive ETL pipeline, incorporating data cleaning, validation, and profiling, along with AI-driven insight generation using Large Language Models.
- Created an intuitive dashboard with filters and KPIs using HTML, CSS, and JavaScript, enabling non-technical stakeholders to select data and view reports easily.
- Conducted country-specific analysis of web data, analyzing user behavior patterns and cultural nuances across metrics like Active Users, Engagement Rate, and device preferences, as well as country-specific KPIs such as Build & Price completions and test drive bookings.
- Established thorough documentation practices using Google Docs and version control, enhancing project transparency and replicability.

**Impact:** This system significantly reduced the time and effort required for data analysis, enabling faster and more accurate decision-making processes.

### Comprehensive Time Series Analysis and Forecasting Project
**Company:** STRTGY  
**Date:** January 2024  
**Impact Metrics:** 
- Forecasting Accuracy: +37%
- Cost Reduction: ~25%

**Technologies:** Time Series Analysis, Forecasting, Python, Machine Learning, Deep Learning, Data Preprocessing, Visualization, Inventory Optimization, GPU Acceleration, Hyperparameter Optimization, Geospatial Analysis

**Description:**
- Developed a robust time series analysis and forecasting pipeline using Python, incorporating multiple advanced models including SARIMA, Prophet, XGBoost, LSTM, and Transformer.
- Implemented data preprocessing techniques such as handling missing values, resampling, and feature engineering to enhance model performance.
- Utilized concurrent processing with ThreadPoolExecutor to efficiently handle multiple SKUs, optimizing computational resources and reducing execution time.
- Integrated advanced visualization techniques using Matplotlib and Plotly to create interactive and informative charts for trend analysis and forecast comparison.
- Implemented inventory optimization algorithms, including EOQ and safety stock calculations, considering sustainability factors like CO2 emissions.
- Leveraged GPU acceleration for deep learning models (LSTM, Transformer) using PyTorch and TensorFlow, significantly improving training speed.
- Developed a custom Transformer model architecture for time series forecasting, showcasing adaptability to complex sequential data.
- Implemented robust error handling and logging mechanisms to ensure reliable execution across large datasets.
- Utilized Optuna for hyperparameter optimization, enhancing model performance through automated tuning.
- Integrated geospatial analysis using Folium to visualize geographical patterns in sales and inventory distribution.

**Impact:** This project significantly improved forecasting accuracy and inventory management efficiency, leading to reduced costs and improved sustainability in supply chain operations.

## 2023

### Automated Interview Analysis
**Company:** STRTGY  
**Date:** July 2023  
**Impact Metrics:** 
- Processing Time: 99.9% ↓
- Insight Depth: +75%

**Technologies:** Automation, Data Analysis, Data Visualization, SurveyMonkey, Survey Analysis, Python, Pandas, Multi-Index, Plotly, HTML, Interactive Visualization, Custom Visualizations, Employee Feedback Analysis, Performance Analysis, Organizational Improvement

**Description:**
- Automated survey data analysis from SurveyMonkey, reducing a 1-2 month process to seconds of script runtime.
- Implemented data normalization and weighted sampling to mitigate demographic biases in survey responses.
- Utilized sentiment analysis and topic modeling on open-ended responses to extract key themes and identify market opportunities.
- Leveraged Python, pandas, and multi-index for complex data manipulations, creating multi-level pivot tables for cross-sectional analysis.
- Optimized code performance using vectorized operations and chunking techniques for efficient large dataset processing.
- Generated custom radar and multi-line charts with Plotly, embedded in HTML, enhancing data interpretability.
- Balanced company design specifications with data visualization best practices, ensuring accessibility and effective communication.
- Applied ANOVA and chi-square tests to identify statistically significant performance issues across groups and sections.
- Developed an interactive HTML dashboard for management, featuring dynamic data exploration and highlighting key insights.

**Impact:** This automation significantly reduced the time required for data analysis and provided deeper insights into employee feedback, leading to targeted improvements in organizational performance.

### Trading Strategy Backtesting
**Company:** Personal Project  
**Date:** February 2023  
**Impact Metrics:** 
- Testing Speed: 10x
- Model Variants: 24

**Technologies:** Financial Analysis, Data Analysis, API Integration, Python, Plotly, MongoDB, Database Management, Trading Strategies, Economic Data Analysis, Market Trend Analysis, Correlation Analysis, Strategy Development, Backtesting

**Description:**
- Extracted financial data via Alpha Vantage API and visualized trading patterns using Plotly in Python, implementing rate limiting and error handling for data consistency.
- Configured a MongoDB database with a document-based schema for storing varied economic data, optimizing for scalability and query performance.
- Conducted correlation analysis on key economic indicators (GDP, unemployment, inflation, interest rates) versus market trends, implementing lag analysis for optimal impact assessment.
- Discovered through rigorous testing that strategies performed poorly, using metrics like Sharpe ratio and maximum drawdown, highlighting the need for advanced techniques in future projects.

**Impact:** This project provided valuable insights into the complexities of financial markets and the importance of robust testing in strategy development.

## 2022

### Geospatial Analysis of Ciudad Guzmán
**Company:** Storymaps Personal Project  
**Date:** September 2022  
**Impact Metrics:** 
- Risk Prediction: +63%
- Data Points: 4,700+

**Technologies:** Geospatial Analysis, Data Visualization, ArcGIS, Earthquake Analysis, Elevation Analysis, Interactive Mapping, Urban Planning, Disaster Preparedness

**Description:**
- Conducted exploratory geospatial analysis in ArcGIS using data from the Jalisco Seismic Network, utilizing time slider for temporal visualization.
- Analyzed patterns between earthquake intensity and elevation using Getis-Ord Gi* spatial statistics and Geographical Weighted Regression.
- Created an interactive Storymaps map in ArcGIS, using templates and pop-ups to present complex geospatial data accessibly.

**Impact:** This project demonstrated the power of geospatial analysis in understanding natural phenomena and its potential applications in urban planning and disaster preparedness.

### Data Analysis for Property Management System
**Company:** BlackPrint Technologies  
**Date:** March 2022  
**Impact Metrics:** 
- Location Accuracy: +92%
- Response Time: 65% ↓

**Technologies:** Data Analysis, Geospatial Analysis, Database Management, Property Management, Data Integrity, Operational Efficiency, Python, Pandas, Numpy, Data Manipulation, Data Preparation, Advanced Geocoding, Location-Based Data

**Description:**
- Conducted comprehensive data analysis on KPIs like occupancy rates and maintenance response times, comparing against industry benchmarks.
- Utilized Google Maps Geocoding API for advanced geocoding, implementing address normalization and validation.
- Performed data cleaning using Python scripts with pandas, addressing inconsistencies and duplicates in large datasets.
- Applied pandas and numpy for complex data transformations, including multi-level aggregations and pivot tables for cross-sectional analysis.

**Impact:** The analysis led to significant improvements in property management efficiency and accuracy of location-based services.

## 2021

### User Engagement Analysis for SaaS Platform
**Company:** Collaborative Project: AGM Analytics  
**Date:** November 2021  
**Impact Metrics:** 
- User Retention: +28%
- Feature Adoption: +41%

**Technologies:** Data Analysis, Data Visualization, Business Intelligence, SaaS Platform, User Engagement, User Behavior Analysis, Usage Trends, Customer Behavior, Data Visualization Techniques, Actionable Insights, Business Decision-Making, Strategic Objectives

**Description:**
- Analyzed user engagement using metrics like DAU, MAU, and feature adoption rates, segmenting users by subscription tier and usage frequency.
- Developed custom JavaScript visualizations in Looker Studio, creating interactive sankey diagrams and heatmaps.
- Translated analytical findings into strategic recommendations, creating layered dashboards in Looker Studio for different levels of technical understanding.

**Impact:** The analysis provided crucial insights into user behavior, enabling data-driven decisions to improve user engagement and retention. 