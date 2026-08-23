export type Locale = "pt" | "es";

export const LOCALE_TAG: Record<Locale, string> = { pt: "pt-BR", es: "es" };

type Entry = { role: string; org: string; period: string; description: string };
type Degree = { degree: string; institution: string };

type Copy = {
  title: string;
  tagline: string;
  role: string;
  description: string;
  sections: Record<string, string>;
  intro: string[];
  experience: Entry[];
  education: Degree[];
  skills: { category: string; items: string[] }[];
  labels: Record<string, string>;
};

export const CV: Record<Locale, Copy> = {
  pt: {
    title: "Madson Aragão: currículo e portfólio",
    tagline: "Bits, bytes e biomoléculas",
    role: "Bioinformata, cientista de dados em saúde, analista de P&D e gerente de produto",
    description:
      "Currículo de Madson Allan de Luna Aragão: bioinformata e cientista de dados em saúde, doutorando em Bioinformática na UFMG, com atuação em análise multiômica, aprendizado de máquina e biologia estrutural aplicados à descoberta de peptídeos antimicrobianos e ao desenho de fármacos.",
    sections: {
      about: "Sobre",
      skills: "Competências",
      experience: "Experiência",
      education: "Formação",
      certifications: "Certificações",
      publications: "Publicações",
      talks: "Comunicações em eventos",
      awards: "Prêmios e distinções",
      teaching: "Docência",
      contact: "Contato",
    },
    intro: [
      "Sou doutorando em Bioinformática na Universidade Federal de Minas Gerais, onde trabalho com engenharia de software, aprendizado de máquina, ômicas, biologia estrutural e quimioinformática. A pesquisa aplica algoritmos de aprendizado profundo, com foco em modelos generativos, para caracterizar e desenhar peptídeos antimicrobianos inspirados no sistema imune de organismos diversos, com o objetivo de gerar candidatos terapêuticos contra a resistência antimicrobiana por métodos in silico escaláveis.",
      "Sou Nextflow Ambassador, especialista em Ciência de Dados e Analytics pela PUC-Rio e aluno de MBA em Engenharia de Software na USP. Essa combinação cobre análise de dados, fluxos de trabalho reprodutíveis, aprendizado de máquina, governança de dados e arquitetura de software.",
      "No mestrado em Genética e Biologia Molecular pela UFPE desenvolvi o AMPidentifier, ferramenta automatizada baseada em aprendizado de máquina que identifica sequências antimicrobianas em dados genômicos e proteômicos. Antes disso, me formei em Biomedicina pela UFPE, com ênfase em Bioinformática e Patologia Clínica, com estágios em hospital, em laboratórios de biologia molecular e em centros de pesquisa.",
    ],
    experience: [
      { role: "Pesquisador, doutorando", org: "Instituto de Ciências Biológicas (ICB), Universidade Federal de Minas Gerais (UFMG)", period: "ago 2024 até o presente", description: "Doutorado em Bioinformática com foco em aprendizado profundo, genômica e biologia estrutural, aplicados à caracterização e ao desenho de peptídeos antimicrobianos. O trabalho inclui modelos computacionais de interação com membranas e simulações de dinâmica molecular para avaliar estabilidade e função dos peptídeos." },
      { role: "Nextflow Ambassador", org: "Seqera", period: "jan 2026 até o presente", description: "Selecionado como embaixador do Nextflow para difundir fluxos de análise de dados escaláveis e reprodutíveis na comunidade científica. A função envolve boas práticas de orquestração de pipelines, participação no ecossistema de código aberto e adoção do Nextflow em computação de alto desempenho e em nuvem." },
      { role: "Pesquisador, mestrando", org: "Departamento de Genética (dGEN), Universidade Federal de Pernambuco (UFPE)", period: "jun 2022 a jul 2024", description: "Desenvolvimento do AMPidentifier, ferramenta baseada em aprendizado de máquina para identificar peptídeos antimicrobianos em sequências genômicas, com análise de grandes conjuntos de dados e busca por novas moléculas e assinaturas moleculares." },
      { role: "Analista de pesquisa e desenvolvimento", org: "PickCells", period: "out 2020 a ago 2023", description: "Desenvolvimento de aplicações para soluções de IoT que usam visão computacional no reconhecimento de padrões em imagens de interesse clínico, incluindo prototipagem, desenvolvimento e validação de sistemas." },
      { role: "Bolsista de iniciação científica", org: "Laboratório de Genética e Biotecnologia Vegetal (LGBV), Universidade Federal de Pernambuco (UFPE)", period: "jan 2020 a mai 2022", description: "Pesquisa em bioinformática voltada à caracterização e à otimização de peptídeos antimicrobianos bioinspirados, além da investigação de sequências de eIF4E em espécies de Vigna e do seu papel na defesa vegetal contra patógenos." },
      { role: "Estagiário em patologia clínica", org: "Empresa Brasileira de Serviços Hospitalares (EBSERH), Hospital das Clínicas da UFPE", period: "out 2021 a mar 2022", description: "Atividades no Laboratório de Análises Clínicas do HC/UFPE: triagem de amostras, hematologia, bioquímica, urinálise, microbiologia, dosagens hormonais e sorologia." },
      { role: "Estagiário de pesquisa, desenvolvimento tecnológico e inovação", org: "PickCells", period: "abr 2020 a ago 2020", description: "Desenvolvimento de soluções para o diagnóstico molecular de SARS-CoV-2." },
      { role: "Bolsista de iniciação científica", org: "Fundação Oswaldo Cruz (FIOCRUZ)", period: "nov 2016 a dez 2019", description: "Atividades em biologia estrutural e química teórica e computacional, com foco em modelagem molecular e engenharia de proteínas para diagnóstico e vacinas, no Departamento de Virologia e Terapia Experimental." },
      { role: "Bolsista de iniciação científica", org: "Instituto Keizo Asami (iLIKA)", period: "mai 2015 a dez 2016", description: "Atividades no setor de biologia molecular em genética humana e bioinformática, com ênfase em genética forense, marcadores de ancestralidade e predição de fenótipo." },
    ],
    education: [
      { degree: "Doutorado em Bioinformática, em andamento", institution: "Universidade Federal de Minas Gerais (UFMG), Belo Horizonte, MG" },
      { degree: "MBA em Engenharia de Software, em andamento", institution: "Universidade de São Paulo (USP), São Paulo, SP" },
      { degree: "Especialização em Ciência de Dados e Analytics, 2026", institution: "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio), Rio de Janeiro, RJ" },
      { degree: "Mestrado em Genética e Biologia Molecular, ênfase em Bioinformática, 2024", institution: "Universidade Federal de Pernambuco (UFPE), Recife, PE" },
      { degree: "Bacharelado em Biomedicina, ênfase em Patologia Clínica e Bioinformática, 2022", institution: "Universidade Federal de Pernambuco (UFPE), Recife, PE" },
    ],
    skills: [
      { category: "Bioinformática", items: ["Genômica e transcriptômica", "Montagem de genomas", "Mineração e anotação genômica", "Biologia molecular e estrutural", "Modelagem de proteínas e membranas", "Desenho de proteínas", "Simulações de dinâmica molecular", "Desenvolvimento de pipelines"] },
      { category: "IA, dados e programação", items: ["Aprendizado de máquina", "Análise e visualização de dados", "Engenharia e governança de dados", "Git e controle de versão", "Python, Bash e Java", "MySQL e PostgreSQL", "Sistemas Linux e Unix", "Docker e conteinerização", "Snakemake e Nextflow", "Gestão de cargas em HPC"] },
      { category: "Produto e projetos", items: ["Ciclo de vida de produto", "Métodos ágeis (Scrum, Kanban)", "Design centrado no usuário", "Construção de roadmap", "Indicadores de desempenho (KPIs)", "Pesquisa de mercado e de usuário", "Lean product development", "Design thinking"] },
      { category: "Ferramentas e plataformas", items: ["Figma, Miro, Jira, Trello e Azure", "Prototipagem e wireframes", "Mapeamento de jornada do usuário", "Controle de versão e gestão de releases", "Google Workspace e Notion", "Tableau e Power BI"] },
      { category: "Colaboração e comunicação", items: ["Liderança de times multidisciplinares", "Gestão de stakeholders", "Comunicação técnica e de negócio", "Resolução de problemas complexos", "Narrativa com dados"] },
    ],
    labels: {
      backToPortfolio: "Portfólio completo em inglês",
      langLabel: "Idioma",
      publicationsNote: "Títulos e periódicos mantidos no idioma original de publicação.",
      talksNote: "22 apresentações em congressos, conferências e simpósios. Lista completa no portfólio.",
      teachingNote: "Turmas como professor convidado ou monitor.",
      awardsNote: "Prêmios mantidos no idioma original de concessão.",
      pdf: "Currículo em PDF",
    },
  },
  es: {
    title: "Madson Aragão: currículum y portafolio",
    tagline: "Bits, bytes y biomoléculas",
    role: "Bioinformático, científico de datos en salud, analista de I+D y gerente de producto",
    description:
      "Currículum de Madson Allan de Luna Aragão: bioinformático y científico de datos en salud, doctorando en Bioinformática en la UFMG, con trabajo en análisis multiómico, aprendizaje automático y biología estructural aplicados al descubrimiento de péptidos antimicrobianos y al diseño de fármacos.",
    sections: {
      about: "Perfil",
      skills: "Competencias",
      experience: "Experiencia",
      education: "Formación",
      certifications: "Certificaciones",
      publications: "Publicaciones",
      talks: "Comunicaciones en congresos",
      awards: "Premios y distinciones",
      teaching: "Docencia",
      contact: "Contacto",
    },
    intro: [
      "Soy doctorando en Bioinformática en la Universidad Federal de Minas Gerais, donde trabajo con ingeniería de software, aprendizaje automático, ómicas, biología estructural y quimioinformática. La investigación aplica algoritmos de aprendizaje profundo, con énfasis en modelos generativos, para caracterizar y diseñar péptidos antimicrobianos inspirados en el sistema inmune de organismos diversos, con el objetivo de generar candidatos terapéuticos contra la resistencia antimicrobiana mediante métodos in silico escalables.",
      "Soy Nextflow Ambassador, especialista en Ciencia de Datos y Analytics por la PUC-Rio y estudiante de MBA en Ingeniería de Software en la USP. Esa combinación cubre análisis de datos, flujos de trabajo reproducibles, aprendizaje automático, gobernanza de datos y arquitectura de software.",
      "En la maestría en Genética y Biología Molecular por la UFPE desarrollé AMPidentifier, una herramienta automatizada basada en aprendizaje automático que identifica secuencias antimicrobianas en datos genómicos y proteómicos. Antes me gradué en Biomedicina por la UFPE, con énfasis en Bioinformática y Patología Clínica, con prácticas en hospital, en laboratorios de biología molecular y en centros de investigación.",
    ],
    experience: [
      { role: "Investigador, doctorando", org: "Instituto de Ciencias Biológicas (ICB), Universidad Federal de Minas Gerais (UFMG)", period: "ago 2024 hasta el presente", description: "Doctorado en Bioinformática centrado en aprendizaje profundo, genómica y biología estructural, aplicados a la caracterización y al diseño de péptidos antimicrobianos. El trabajo incluye modelos computacionales de interacción con membranas y simulaciones de dinámica molecular para evaluar estabilidad y función de los péptidos." },
      { role: "Nextflow Ambassador", org: "Seqera", period: "ene 2026 hasta el presente", description: "Seleccionado como embajador de Nextflow para difundir flujos de análisis de datos escalables y reproducibles en la comunidad científica. La función abarca buenas prácticas de orquestación de pipelines, participación en el ecosistema de código abierto y adopción de Nextflow en computación de alto rendimiento y en la nube." },
      { role: "Investigador, maestrando", org: "Departamento de Genética (dGEN), Universidad Federal de Pernambuco (UFPE)", period: "jun 2022 a jul 2024", description: "Desarrollo de AMPidentifier, herramienta basada en aprendizaje automático para identificar péptidos antimicrobianos en secuencias genómicas, con análisis de grandes conjuntos de datos y búsqueda de nuevas moléculas y firmas moleculares." },
      { role: "Analista de investigación y desarrollo", org: "PickCells", period: "oct 2020 a ago 2023", description: "Desarrollo de aplicaciones para soluciones de IoT que usan visión por computadora en el reconocimiento de patrones en imágenes de interés clínico, con prototipado, desarrollo y validación de sistemas." },
      { role: "Becario de iniciación científica", org: "Laboratorio de Genética y Biotecnología Vegetal (LGBV), Universidad Federal de Pernambuco (UFPE)", period: "ene 2020 a may 2022", description: "Investigación en bioinformática orientada a la caracterización y optimización de péptidos antimicrobianos bioinspirados, además del estudio de secuencias de eIF4E en especies de Vigna y su papel en la defensa vegetal frente a patógenos." },
      { role: "Practicante en patología clínica", org: "Empresa Brasileña de Servicios Hospitalarios (EBSERH), Hospital de Clínicas de la UFPE", period: "oct 2021 a mar 2022", description: "Actividades en el Laboratorio de Análisis Clínicos del HC/UFPE: triaje de muestras, hematología, bioquímica, urianálisis, microbiología, determinaciones hormonales y serología." },
      { role: "Practicante de investigación, desarrollo tecnológico e innovación", org: "PickCells", period: "abr 2020 a ago 2020", description: "Desarrollo de soluciones para el diagnóstico molecular de SARS-CoV-2." },
      { role: "Becario de iniciación científica", org: "Fundación Oswaldo Cruz (FIOCRUZ)", period: "nov 2016 a dic 2019", description: "Actividades en biología estructural y química teórica y computacional, con énfasis en modelado molecular e ingeniería de proteínas para diagnóstico y vacunas, en el Departamento de Virología y Terapia Experimental." },
      { role: "Becario de iniciación científica", org: "Instituto Keizo Asami (iLIKA)", period: "may 2015 a dic 2016", description: "Actividades en el sector de biología molecular en genética humana y bioinformática, con énfasis en genética forense, marcadores de ancestralidad y predicción de fenotipo." },
    ],
    education: [
      { degree: "Doctorado en Bioinformática, en curso", institution: "Universidad Federal de Minas Gerais (UFMG), Belo Horizonte, Brasil" },
      { degree: "MBA en Ingeniería de Software, en curso", institution: "Universidad de São Paulo (USP), São Paulo, Brasil" },
      { degree: "Especialización en Ciencia de Datos y Analytics, 2026", institution: "Pontificia Universidad Católica de Río de Janeiro (PUC-Rio), Río de Janeiro, Brasil" },
      { degree: "Maestría en Genética y Biología Molecular, énfasis en Bioinformática, 2024", institution: "Universidad Federal de Pernambuco (UFPE), Recife, Brasil" },
      { degree: "Licenciatura en Biomedicina, énfasis en Patología Clínica y Bioinformática, 2022", institution: "Universidad Federal de Pernambuco (UFPE), Recife, Brasil" },
    ],
    skills: [
      { category: "Bioinformática", items: ["Genómica y transcriptómica", "Ensamblaje de genomas", "Minería y anotación genómica", "Biología molecular y estructural", "Modelado de proteínas y membranas", "Diseño de proteínas", "Simulaciones de dinámica molecular", "Desarrollo de pipelines"] },
      { category: "IA, datos y programación", items: ["Aprendizaje automático", "Análisis y visualización de datos", "Ingeniería y gobernanza de datos", "Git y control de versiones", "Python, Bash y Java", "MySQL y PostgreSQL", "Sistemas Linux y Unix", "Docker y contenedores", "Snakemake y Nextflow", "Gestión de cargas en HPC"] },
      { category: "Producto y proyectos", items: ["Ciclo de vida de producto", "Métodos ágiles (Scrum, Kanban)", "Diseño centrado en el usuario", "Construcción de roadmap", "Indicadores de desempeño (KPIs)", "Investigación de mercado y de usuario", "Lean product development", "Design thinking"] },
      { category: "Herramientas y plataformas", items: ["Figma, Miro, Jira, Trello y Azure", "Prototipado y wireframes", "Mapeo de recorrido del usuario", "Control de versiones y gestión de releases", "Google Workspace y Notion", "Tableau y Power BI"] },
      { category: "Colaboración y comunicación", items: ["Liderazgo de equipos multidisciplinarios", "Gestión de stakeholders", "Comunicación técnica y de negocio", "Resolución de problemas complejos", "Narrativa con datos"] },
    ],
    labels: {
      backToPortfolio: "Portafolio completo en inglés",
      langLabel: "Idioma",
      publicationsNote: "Títulos y revistas se mantienen en el idioma original de publicación.",
      talksNote: "22 presentaciones en congresos, conferencias y simposios. Lista completa en el portafolio.",
      teachingNote: "Cursos como profesor invitado o monitor.",
      awardsNote: "Premios en el idioma original de concesión.",
      pdf: "Currículum en PDF (inglés)",
    },
  },
};

export const CERTIFICATIONS = [
  { title: "Generative AI", issuer: "Massachusetts Institute of Technology (MIT), Professional Education", year: 2025 },
  { title: "Agile Project Management Professional Certificate", issuer: "Atlassian", year: 2025 },
  { title: "Career Essentials in Project Management", issuer: "Microsoft", year: 2025 },
  { title: "Data-Driven Product Management", issuer: "NASBA", year: 2025 },
  { title: "Microsoft Azure AI Essentials: Workloads and Machine Learning", issuer: "Microsoft", year: 2025 },
  { title: "Requirements Engineering and Agile Product Management", issuer: "PUC-Rio", year: 2025 },
  { title: "The Data Science of Healthcare, Medicine, and Public Health", issuer: "LinkedIn Learning", year: 2025 },
  { title: "Advanced Gemini for Developers", issuer: "Google DeepMind", year: 2024 },
  { title: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", year: 2024 },
  { title: "Project Management", issuer: "Project Management Institute (PMI)", year: 2024 },
  { title: "Python Programming from Basic to Advanced", issuer: "Udemy", year: 2022 },
  { title: "Bioinformatics with Python", issuer: "Udemy", year: 2022 },
];

export const PUBLICATIONS = [
  { title: "The Regulatory Army of Plant Defense: Transcription Factors in the War for Plant Immunity", journal: "International Journal of Molecular Sciences", doi: "10.3390/ijms27167315" },
  { title: "Unveiling Three Functionally Diverse Isoforms of eIF4E in Cowpea Through a Multi-Omics Approach", journal: "Agronomy", doi: "10.3390/agronomy16070766" },
  { title: "Transposable elements: Functional aspects and applications as drivers of crop innovation", journal: "Crop Science", doi: "10.1002/csc2.70257" },
  { title: "Deciphering Cowpea Resistance to Potyvirus: Assessment of eIF4E Gene Mutations and Their Impact on the eIF4E-VPg Protein Interaction", journal: "Viruses", doi: "10.3390/v17081050" },
  { title: "Omics-driven bioinformatics for plant lectins discovery and functional annotation", journal: "International Journal of Biological Macromolecules", doi: "10.1016/j.ijbiomac.2024.135511" },
  { title: "Association strength of E6 to E6AP/p53 complex correlates with HPV-mediated oncogenesis risk", journal: "Biopolymers", doi: "10.1002/bip.23524" },
  { title: "Approaches for Identification and Validation of Antimicrobial Compounds of Plant Origin", journal: "Eco-Friendly Biobased Products Used in Microbial Diseases, CRC Press", doi: "10.1201/9781003243700" },
];

export const AWARDS = [
  "Next Generation Bioinformatician (NGB), X-Meeting 2025",
  "Travel Grant Award, School on Biological Physics and Biomolecular Simulations in the Machine Learning Era, ICTP-SAIFR",
  "Travel Grant Award, AI for Protein Design (AI4PD), The Protein Society",
  "Young Geneticist Award of the Northeast, XXI ENGNE",
  "Honorable Mention, Human and Forensic Genetics, CNPq/UFPE",
  "Honorable Mention, Postgraduate Genetics Journey, UFPE",
  "Best Poster Award, XIII Journey of the Genetics and Molecular Biology Program",
  "Certificate of Excellence in the Peer Reviewing, Elsevier",
  "Highest Admission Score, MSc in Genetics and Molecular Biology, UFPE",
  "Highest Admission Score, PhD in Bioinformatics, UFMG",
];

export const TEACHING = [
  { title: "Molecular Docking & Dynamics: Breathing Motion into Life's Building Blocks, 2nd Edition", year: "2025" },
  { title: "Molecular Modeling with Machine Learning Techniques, 2nd Edition", year: "2025" },
  { title: "Molecular Docking & Dynamics: Breathing Motion into Life's Building Blocks, 1st Edition", year: "2025" },
  { title: "Molecular Modeling with Machine Learning Techniques, 1st Edition", year: "2025" },
  { title: "Bioinformatics: A Theoretical-Practical Approach", year: "2024" },
  { title: "Introduction to Bioinformatics, From DNA to Proteins: Databases, Annotation and Protein Modeling Techniques", year: "2022" },
  { title: "Human Genetics, Federal University of Pernambuco", year: "2017-2018" },
  { title: "Molecular Tools Applied to Clinical Diagnosis, Federal University of Pernambuco", year: "2017-2018" },
];

export const LINKS = [
  { label: "E-mail", value: "madsondeluna@gmail.com", href: "mailto:madsondeluna@gmail.com" },
  { label: "LinkedIn", value: "madsonaragao", href: "https://www.linkedin.com/in/madsonaragao/" },
  { label: "GitHub", value: "madsondeluna", href: "https://github.com/madsondeluna" },
  { label: "Google Scholar", value: "GmHvOYsAAAAJ", href: "https://scholar.google.com.br/citations?user=GmHvOYsAAAAJ&hl=en" },
  { label: "ResearchGate", value: "Madson-Aragao", href: "https://www.researchgate.net/profile/Madson-Aragao" },
  { label: "AMPidentifier", value: "ampidentifier.com", href: "https://www.ampidentifier.com/" },
];
