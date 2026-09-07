// Traducao do atlas. Aqui so entra o que muda de lingua: rotulo, prosa e
// leitura. Slug, ano, repositorio, licenca, DOI e numero nao traduzem, entao
// vivem uma vez so em models.ts e sao lidos de la nas duas linguas.

export type Lang = 'en' | 'pt';

export const ui = {
  en: {
    brand: 'Proteins',
    brandSub: 'in a world of LLMs',
    tagline: 'LLMs for beginners in protein design, and for anyone who forgets the basics',
    groupAtlas: 'The atlas',
    groupFoundations: 'The foundations',
    navBig: 'The big picture',
    navStart: 'Where to start',
    navModels: 'Model catalogue',
    navCompare: 'Side by side',
    navDictionary: 'The dictionary',
    sideKicker: 'Learn by exploring',
    sideCopy: ['Small experiments.', 'Real papers. No black boxes.'],
    sideLink: 'A dictionary for every step',
    skip: 'Skip to content',
    footerTag: 'Protein language models, structure prediction and design',
    footerNote: 'Every number traces to a listed source.',
    language: 'Language',
    foundationsNote: 'The foundations run in English.',
    catalogueKicker: 'The catalogue',
    catalogueHead: ['Attention is all you need to ', 'fold proteins'],
    catalogueLede:
      'Every model here reads sequences or geometry, and every claim on the page traces to the paper or the model card it came from. Written for people meeting these architectures for the first time, and for everyone who has read the papers and would still like the diagram.',
    filterAll: 'All',
    filterLabel: 'Filter by task',
    readTwo: 'Read two at a time',
    diagramCount: (n: number) => `${n} models carry a full architecture diagram`,
    exploreArch: 'Explore the architecture',
    open: 'Open',
    readEntry: 'Read the entry',
    plain: 'In plain language',
    analogy: 'One way to picture it',
    misread: 'Commonly misread as',
    tryIt: 'Try it',
    youNeed: 'You need',
    weight: 'Weight',
    howToRead: 'How to read it',
    notRun:
      'These snippets have not been executed here. Versions move; check the model card before trusting a line of it.',
    whyHere: 'Why it is here',
    standing: 'Standing',
    setsApart: 'What sets it apart',
    distinctions: 'Distinctions',
    whereStops: 'Where it stops',
    limits: 'Limits',
    weightsCode: 'Weights and code',
    weightsNote: 'Checked against the registry, not from memory',
    thRepo: 'Repository',
    thSize: 'Size',
    thLicence: 'Licence',
    thNote: 'Note',
    sources: 'Sources',
    sourcesNote: 'Each number above comes from one of these',
    sameTask: 'Same task, other answers',
    backToCatalogue: 'Back to the catalogue',
    compareNeighbours: 'Compare it with its neighbours',
    howBuilt: 'How it is put together',
    pickComponent: 'Select a component to read it',
    component: 'Component',
    passesOn: 'Passes on',
    attachesTo: 'Attaches to',
    side: 'Side',
    compareKicker: 'Side by side',
    compareHead: ['Same prefix, ', 'different model'],
    compareLede:
      'Three pairs that get confused in conversation, laid out row by row. The reading under each table says what the difference amounts to once the specification sheet is out of the way.',
    routesKicker: 'Guided routes',
    routesHead: ['Three ways ', 'in'],
    routesLede:
      'Nobody needs all fourteen models. Pick the sentence that sounds like you, then follow the steps in order. Each step says why it comes where it does.',
    homeKicker: 'Proteins in a world of LLMs',
    homeHead: ['Attention is all you need to ', 'fold proteins'],
    homeLede:
      'This is the closest we have come to what nature does in seconds, and what nature does remains the better-kept secret. Here is how a transformer trained on amino acids ends up predicting a structure, and what separates AlphaFold from ESM3. Start with a route, read a model, or open the experiments and change the numbers yourself.',
    homeStart: 'Start here',
    homeExperiments: 'The experiments',
    homeExperimentsNote: 'Seven interactive labs that run in your browser',
    kinds: {
      journal: 'Peer reviewed',
      preprint: 'Preprint',
      vendor: 'Vendor page',
      weights: 'Model card',
      code: 'Code',
    },
    taskNames: {
      'Structure prediction': 'Structure prediction',
      'Protein language model': 'Protein language model',
      'Inverse folding': 'Inverse folding',
      'Backbone generation': 'Backbone generation',
      'Variant effect': 'Variant effect',
    } as Record<string, string>,
  },
  pt: {
    brand: 'Proteínas',
    brandSub: 'num mundo de LLMs',
    tagline: 'LLMs para quem está começando em design de proteínas, e para quem esquece o básico',
    groupAtlas: 'O atlas',
    groupFoundations: 'Os fundamentos',
    navBig: 'O panorama',
    navStart: 'Por onde começar',
    navModels: 'Catálogo de modelos',
    navCompare: 'Lado a lado',
    navDictionary: 'O dicionário',
    sideKicker: 'Aprender explorando',
    sideCopy: ['Experimentos pequenos.', 'Artigos reais. Nada de caixa-preta.'],
    sideLink: 'Um dicionário para cada passo',
    skip: 'Ir para o conteúdo',
    footerTag: 'Modelos de linguagem de proteínas, predição de estrutura e design',
    footerNote: 'Todo número na página vem de uma fonte listada.',
    language: 'Idioma',
    foundationsNote: 'Os fundamentos estão em inglês.',
    catalogueKicker: 'O catálogo',
    catalogueHead: ['A atenção basta para ', 'dobrar proteínas'],
    catalogueLede:
      'Cada modelo aqui lê sequências ou geometria, e cada afirmação da página aponta para o artigo ou o cartão do modelo de onde saiu. Escrito para quem encontra essas arquiteturas pela primeira vez, e para quem já leu os artigos e ainda quer ver o diagrama.',
    filterAll: 'Todos',
    filterLabel: 'Filtrar por tarefa',
    readTwo: 'Ler dois de uma vez',
    diagramCount: (n: number) => `${n} modelos trazem o diagrama completo da arquitetura`,
    exploreArch: 'Ver a arquitetura',
    open: 'Abrir',
    readEntry: 'Ler a entrada',
    plain: 'Em linguagem simples',
    analogy: 'Uma forma de imaginar',
    misread: 'O engano mais comum',
    tryIt: 'Rodar',
    youNeed: 'O que é preciso',
    weight: 'Peso',
    howToRead: 'Como ler',
    notRun:
      'Estes trechos não foram executados aqui. Versões mudam: confira o cartão do modelo antes de confiar em qualquer linha.',
    whyHere: 'Por que está aqui',
    standing: 'Posição',
    setsApart: 'O que o distingue',
    distinctions: 'Distinções',
    whereStops: 'Onde para',
    limits: 'Limites',
    weightsCode: 'Pesos e código',
    weightsNote: 'Conferido no registro, não de memória',
    thRepo: 'Repositório',
    thSize: 'Tamanho',
    thLicence: 'Licença',
    thNote: 'Observação',
    sources: 'Fontes',
    sourcesNote: 'Cada número acima vem de uma destas',
    sameTask: 'Mesma tarefa, outras respostas',
    backToCatalogue: 'Voltar ao catálogo',
    compareNeighbours: 'Comparar com os vizinhos',
    howBuilt: 'Como é montado',
    pickComponent: 'Escolha um componente para ler',
    component: 'Componente',
    passesOn: 'Entrega adiante',
    attachesTo: 'Liga-se a',
    side: 'Lateral',
    compareKicker: 'Lado a lado',
    compareHead: ['Mesmo prefixo, ', 'outro modelo'],
    compareLede:
      'Três pares que se confundem na conversa, linha a linha. A leitura embaixo de cada tabela diz no que a diferença dá, depois que a ficha técnica sai da frente.',
    routesKicker: 'Roteiros guiados',
    routesHead: ['Três portas de ', 'entrada'],
    routesLede:
      'Ninguém precisa dos catorze modelos. Escolha a frase que soa como você e siga os passos na ordem. Cada passo diz por que vem onde vem.',
    homeKicker: 'Proteínas num mundo de LLMs',
    homeHead: ['A atenção basta para ', 'dobrar proteínas'],
    homeLede:
      'É o mais perto que chegamos do que a natureza faz em segundos, e o que a natureza faz continua sendo o segredo mais bem guardado. Aqui está como um transformer treinado em aminoácidos acaba prevendo uma estrutura, e o que separa o AlphaFold do ESM3. Comece por um roteiro, leia um modelo, ou abra os experimentos e mude os números você mesmo.',
    homeStart: 'Comece aqui',
    homeExperiments: 'Os experimentos',
    homeExperimentsNote: 'Sete laboratórios interativos que rodam no seu navegador',
    kinds: {
      journal: 'Revisado por pares',
      preprint: 'Preprint',
      vendor: 'Página do fabricante',
      weights: 'Cartão do modelo',
      code: 'Código',
    },
    taskNames: {
      'Structure prediction': 'Predição de estrutura',
      'Protein language model': 'Modelo de linguagem de proteínas',
      'Inverse folding': 'Enovelamento inverso',
      'Backbone generation': 'Geração de esqueleto',
      'Variant effect': 'Efeito de variante',
    } as Record<string, string>,
  },
};

/** Texto de modelo em portugues. O que nao aparece aqui cai no ingles, e a
 *  pagina continua de pe em vez de mostrar um campo vazio. */
type ModelText = {
  tagline?: string;
  what?: string;
  standing?: string;
  distinct?: string[];
  limits?: string;
  flow?: Record<string, {kicker?: string; title?: string; summary?: string; detail?: string; carries?: string; exhibit?: string}>;
};

export const modelsPt: Record<string, ModelText> = {
  alphafold2: {
    tagline: 'Evolução entra, coordenadas saem.',
    what:
      'Prevê a estrutura de uma proteína a partir da sequência, de um alinhamento de homólogas e de moldes opcionais. O Evoformer troca informação entre o alinhamento e os pares de resíduos; um módulo geométrico de estrutura transforma essas representações em átomos.',
    standing:
      'O resultado no CASP14 em 2020 e o artigo na Nature em 2021 marcam o ponto em que a predição computacional de estrutura virou ferramenta de uso corrente no laboratório. O Nobel de Química de 2024 cita este trabalho.',
    distinct: [
      'A representação de pares carrega a restrição do triângulo, então a geometria é imposta pela arquitetura e não apenas aprendida.',
      'A atenção por pontos invariantes deixa o decodificador mover resíduos em três dimensões sem quebrar a equivariância.',
      'A busca pelo alinhamento, e não a rede, costuma ser a parte mais lenta de uma predição.',
    ],
    limits:
      'Prevê uma estrutura por entrada. Conformações alternativas, o efeito de uma mutação pontual e o comportamento de regiões desordenadas ficam fora do que uma única predição confiante consegue dizer.',
    flow: {
      evidence: {
        kicker: 'Entrada',
        title: 'Sequência e evidência evolutiva',
        summary: 'Uma sequência-alvo, um alinhamento múltiplo e moldes estruturais opcionais.',
        detail:
          'O alinhamento é a visão que o modelo tem da evolução. Resíduos que mutam juntos entre homólogas tendem a ficar próximos no espaço, e esse sinal é o que sustenta a predição quando não existe molde. Montar o alinhamento é busca em banco de dados, não um passo neural, e numa sequência nova costuma ser a parte mais lenta.',
        carries: 'Evidência preparada',
      },
      embed: {
        kicker: 'Codificação',
        title: 'Embedding de entrada e reciclagem',
        summary: 'Linhas do alinhamento e pares de resíduos viram dois tensores: representação de MSA e de pares.',
        detail:
          'Tudo adiante lê esses dois tensores. A representação de pares é indexada pelo resíduo i e pelo resíduo j, então guarda uma afirmação geométrica sobre duas posições antes de existir qualquer coordenada. A reciclagem devolve a passagem anterior à entrada, e é assim que a rede refina uma estrutura que ela mesma já rascunhou.',
        carries: 'Estado inicial de MSA e pares',
      },
      msa: {
        kicker: 'Tronco',
        title: 'Evoformer: fluxo do MSA',
        summary: 'A atenção corre pela linha e depois pela coluna: cada resíduo lê suas homólogas e seus vizinhos.',
        detail:
          'A atenção por linha compara posições dentro de uma sequência. A atenção por coluna compara a mesma posição ao longo do alinhamento. A representação de pares enviesa a atenção por linha, e é aí que a geometria passa a guiar a leitura da evolução, e não só o contrário.',
        carries: 'Média do produto externo',
        exhibit: 'Rodar uma cabeça de atenção',
      },
      pair: {
        kicker: 'Tronco',
        title: 'Evoformer: fluxo de pares',
        summary: 'As atualizações em triângulo obrigam o tensor de pares a respeitar a desigualdade triangular.',
        detail:
          'Se i está perto de k e k está perto de j, então i e j não podem estar arbitrariamente longe. A multiplicação e a atenção em triângulo escrevem essa restrição dentro da rede em vez de deixá-la para ser aprendida só dos dados. É este bloco que faz a representação de pares se comportar como geometria de distâncias.',
        carries: 'Representações simples e de pares',
      },
      recycle: {
        kicker: 'Caminho lateral',
        title: 'Reciclar representações e geometria',
        summary: 'A saída de uma passagem completa volta ao tronco como entrada extra.',
        detail:
          'Três reciclagens são o padrão. Cada uma dá ao tronco uma estrutura rascunhada para reagir, e o gradiente não atravessa o laço, então o custo é tempo de inferência e não memória de treino.',
      },
      structure: {
        kicker: 'Decodificador',
        title: 'Módulo de estrutura',
        summary: 'Cada resíduo vira um referencial rígido, movido por atenção até o esqueleto e as cadeias laterais assentarem.',
        detail:
          'Os referenciais começam na origem, todos iguais, e o módulo os caminha até o lugar. A atenção por pontos invariantes opera sobre pontos expressos no referencial local de cada resíduo, então a operação inteira comuta com girar ou transladar a proteína. Os ângulos de torção then posicionam os átomos da cadeia lateral.',
        carries: 'Coordenadas atômicas',
      },
      confidence: {
        kicker: 'Caminho lateral',
        title: 'Cabeças de confiança',
        summary: 'O pLDDT pontua cada resíduo; o PAE pontua a posição relativa de dois resíduos.',
        detail:
          'pLDDT abaixo de mais ou menos 50 costuma marcar um trecho desordenado, e não mal previsto. O PAE é o que diz se dois domínios confiantes estão confiantemente posicionados um em relação ao outro, coisa que uma pontuação por resíduo não consegue afirmar.',
      },
    },
  },
  alphafold3: {
    tagline: 'Um modelo para o complexo inteiro.',
    what:
      'Prevê a estrutura conjunta de complexos com proteínas, ácidos nucleicos, moléculas pequenas, íons e resíduos modificados. Um Pairformer raciocina sobre tokens e pares, e um módulo de difusão gera as coordenadas atômicas.',
    standing:
      'Relata precisão acima de ferramentas especializadas de docagem para interações entre proteína e ligante, acima de preditores específicos de ácidos nucleicos, e acima do AlphaFold-Multimer 2.3 para pares de anticorpo e antígeno, tudo num arcabouço só.',
    distinct: [
      'A representação de MSA sai do tronco profundo. O Pairformer mantém as atualizações em triângulo e abandona o fluxo do alinhamento.',
      'O módulo determinístico de estrutura dá lugar à difusão sobre átomos, então amostrar devolve um conjunto de estruturas.',
      'Ligantes e resíduos modificados são tokenizados átomo a átomo em vez de ficarem ausentes da representação.',
    ],
    limits:
      'Um decodificador generativo pode produzir geometria plausível para regiões que não têm nenhuma, e é por isso que a ordenação por confiança faz parte do método. Reimplementações abertas existem porque os pesos originais não são livremente redistribuíveis.',
    flow: {
      tokens: {
        kicker: 'Entrada',
        title: 'Complexo tokenizado',
        summary: 'Proteínas, ácidos nucleicos, ligantes, íons e resíduos modificados entram como um único conjunto de tokens.',
        detail:
          'Um resíduo padrão é um token. Um ligante ou um resíduo modificado é tokenizado por átomo, então uma representação só cobre a química que o AlphaFold 2 não tinha onde guardar. É esta mudança que faz um modelo responder perguntas antes divididas entre ferramentas de enovelamento e de docagem.',
        carries: 'Estado de tokens e pares',
      },
      'msa-module': {
        kicker: 'Tronco',
        title: 'Módulo de MSA',
        summary: 'Uma pilha curta resume o alinhamento dentro da representação de pares e sai de cena.',
        detail:
          'A evidência evolutiva ainda entra, mas não é mais carregada pelo tronco inteiro. O alinhamento é comprimido cedo e o resto da rede raciocina sobre tokens e pares, o que reduz quanto do cálculo depende da profundidade do alinhamento.',
        carries: 'Representação de pares',
      },
      pairformer: {
        kicker: 'Tronco',
        title: 'Pairformer',
        summary: 'Atualizações em triângulo e atenção sobre representações simples e de pares, sem fluxo de MSA.',
        detail:
          'Comparado ao Evoformer, a representação de MSA sumiu da pilha profunda e a maquinaria do triângulo ficou. Este é o resumo arquitetural da diferença: o mesmo raciocínio geométrico, aplicado a uma representação que não precisa mais de um alinhamento morando dentro dela.',
        carries: 'Condicionamento',
      },
      diffusion: {
        kicker: 'Decodificador',
        title: 'Módulo de difusão',
        summary: 'As coordenadas atômicas são geradas por remoção de ruído, condicionada na saída do tronco.',
        detail:
          'Em vez de uma passagem determinística por um módulo de estrutura, coordenadas ruidosas são refinadas em passos repetidos. Amostrar várias vezes devolve várias estruturas, e não uma resposta com barra de erro, e o gerador trabalha direto sobre átomos, sem precisar de referenciais por resíduo nem de parametrização por torções.',
        carries: 'Estruturas amostradas',
      },
      ranking: {
        kicker: 'Caminho lateral',
        title: 'Confiança e ordenação',
        summary: 'Pontuações previstas ordenam as amostras e sinalizam desordem ou alucinação provável.',
        detail:
          'Um decodificador generativo consegue produzir um arranjo de aparência confiante para uma região que não tem nenhum, então ordenar as amostras faz parte do método, e não é uma camada de conveniência colada por cima.',
      },
    },
  },
  esm2: {
    tagline: 'Leia proteínas o bastante e a estrutura cai da leitura.',
    what:
      'Um transformer bidirecional treinado para reconstruir aminoácidos mascarados a partir de sequências não alinhadas. Produz representações contextuais por resíduo e logits de aminoácido. Transformar essas representações em coordenadas exige o ESMFold, que é um modelo separado.',
    standing:
      'O estudo de escala que tornou os modelos de linguagem de proteínas mascarados um componente padrão. Trabalhos posteriores inicializam outros modelos a partir dos pesos do ESM-2 e usam seus embeddings como atributos.',
    distinct: [
      'Nenhum alinhamento na inferência. A informação evolutiva mora nos pesos.',
      'Checkpoints de 8M a 15B de parâmetros deixam o comportamento de escala visível.',
      'Os mapas de atenção se correlacionam com contatos entre resíduos, embora nenhum termo estrutural apareça na função de perda.',
    ],
    limits:
      'É um codificador. Não gera estruturas, e os logits por resíduo são um substituto ruim para aptidão quando a função depende de mais do que a verossimilhança da sequência.',
    flow: {
      sequence: {
        kicker: 'Entrada',
        title: 'Uma sequência, nenhum alinhamento',
        summary: 'Aminoácidos são tokenizados direto. Nenhuma busca por homólogas roda na inferência.',
        detail:
          'Este é o argumento prático inteiro de um modelo de linguagem de proteínas. Onde um pipeline de enovelamento gasta minutos procurando parentes em bancos de dados, o modelo de linguagem lê a sequência que recebeu. O sinal evolutivo não está ausente: foi absorvido pelos pesos durante o pré-treino.',
        carries: 'Embeddings de token',
      },
      mask: {
        kicker: 'Objetivo',
        title: 'Modelagem de linguagem mascarada',
        summary: 'Resíduos são escondidos ao acaso e o modelo os reconstrói a partir dos dois lados da sequência.',
        detail:
          'O objetivo é o mesmo que o BERT usa em texto. Para preencher bem uma posição mascarada, a rede precisa representar quais resíduos são compatíveis com aquele contexto estrutural e funcional, e é essa pressão que produz representações úteis para tarefas que ninguém treinou.',
        carries: 'Representações contextuais',
        exhibit: 'Preencher uma posição mascarada',
      },
      transformer: {
        kicker: 'Tronco',
        title: 'Pilha de transformer bidirecional',
        summary: 'Camadas de atenção misturam informação entre todos os pares de posições.',
        detail:
          'Mapas de atenção num modelo de linguagem de proteínas treinado se correlacionam com contatos entre resíduos, e é por isso que os estados internos podem ser lidos como geometria mesmo sem nada de geometria na função de perda. Profundidade e largura são os dois botões que a família ESM-2 varia, de oito milhões a quinze bilhões de parâmetros.',
        carries: 'Vetores por resíduo',
        exhibit: 'Explorar representações de resíduo',
      },
      heads: {
        kicker: 'Saída',
        title: 'Representações e logits',
        summary: 'Vetores por resíduo, um vetor agregado da sequência e probabilidades de aminoácido.',
        detail:
          'O trabalho seguinte quase sempre usa os estados ocultos, não os logits: uma cabeça pequena sobre embeddings congelados, ou um ajuste fino das últimas camadas. Transformar esses vetores em coordenadas pede um modelo de enovelamento separado, que é exatamente o que o ESMFold é.',
      },
      frozen: {
        kicker: 'Caminho lateral',
        title: 'Atributos congelados ou ajuste fino',
        summary: 'Congelar o codificador e treinar uma cabeça, ou atualizar o próprio codificador.',
        detail:
          'Com algumas centenas de exemplos rotulados, o caminho congelado costuma ganhar, porque um ajuste fino completo de um codificador grande sobreajusta. A adaptação de baixo posto fica entre os dois.',
        exhibit: 'Comparar congelado, completo e LoRA',
      },
    },
  },
  esmfold: {
    tagline: 'Dobrar sem procurar parentes.',
    what:
      'Prevê uma estrutura a partir de uma única sequência, sem busca por alinhamento no momento da consulta. Um ESM-2 congelado entrega representações de sequência a um tronco de enovelamento e a um módulo de estrutura derivado do AlphaFold 2.',
    standing:
      'Tornou prática a rota do modelo de linguagem até a estrutura na escala de levantamentos metagenômicos. É um preditor de estrutura construído sobre o ESM-2, não outro nome para o modelo de linguagem.',
    distinct: [
      'A busca por alinhamento desaparece, e é daí que vem a maior parte da velocidade.',
      'O modelo de linguagem fica congelado. Só o tronco de enovelamento é treinado.',
      'A precisão fica atrás da predição baseada em alinhamento em alvos com alinhamentos profundos e informativos.',
    ],
    limits:
      'Quando existe um alinhamento rico, a evidência que ele carrega é real, e um modelo que a ignora abre mão dela. Dobrar a partir de uma sequência só é uma troca, não uma melhoria de graça.',
    flow: {
      plm: {
        kicker: 'Entrada',
        title: 'Codificador ESM-2 congelado',
        summary: 'Um modelo de linguagem pré-treinado lê a sequência única e entrega seus estados internos.',
        detail:
          'O modelo de linguagem não é treinado além disso. Seus mapas de atenção e estados ocultos ficam no lugar do alinhamento que o AlphaFold 2 teria construído, e é isso que tira a busca em banco de dados do caminho crítico.',
        carries: 'Atributos de sequência e de pares',
      },
      trunk: {
        kicker: 'Tronco',
        title: 'Tronco de enovelamento',
        summary: 'Uma pilha aprendida refina representações simples e de pares a partir dos atributos do modelo de linguagem.',
        detail:
          'O tronco é menor que o Evoformer e não processa alinhamento. Ele converte atributos do modelo de linguagem nas duas representações que um decodificador geométrico espera.',
        carries: 'Representações refinadas',
      },
      sm: {
        kicker: 'Decodificador',
        title: 'Módulo de estrutura',
        summary: 'O decodificador geométrico no estilo do AlphaFold 2 posiciona os átomos.',
        detail:
          'Reaproveitar este decodificador é deliberado: a contribuição do ESMFold é o caminho até ele, não uma saída nova.',
        carries: 'Coordenadas atômicas',
      },
      atlas: {
        kicker: 'Por que importou',
        title: 'Escala metagenômica',
        summary: 'Abandonar a busca por alinhamento tornou prático dobrar centenas de milhões de sequências.',
        detail:
          'A velocidade mudou o que dava para tentar. O ESM Metagenomic Atlas existe porque o custo por sequência caiu o suficiente para valer a pena varrer proteínas metagenômicas desconhecidas.',
      },
    },
  },
  esm3: {
    tagline: 'Sequência, estrutura e função como uma predição mascarada só.',
    what:
      'Um modelo mascarado generativo sobre três trilhas paralelas. Um tokenizador geométrico converte ambientes locais do esqueleto em códigos discretos; um transformer compartilhado prevê logits para cada trilha; o desmascaramento iterativo preenche as posições que você deixou abertas.',
    standing:
      'O artigo na Science relata uma proteína fluorescente gerada a 58 por cento de identidade de sequência com as fluorescentes conhecidas, que os autores apresentam como estimativa equivalente a uma grande distância evolutiva, não como simulação literal.',
    distinct: [
      'A estrutura é uma trilha de tokens, não uma cabeça de saída parafusada num modelo de sequência.',
      'Um prompt pode misturar modalidades: fixe um motivo, nomeie uma função, deixe o resto mascarado.',
      'A ordem de geração é escolhida pelo modelo, e não da esquerda para a direita.',
    ],
    limits:
      'Resultados relatados para o maior modelo não devem ser atribuídos ao checkpoint aberto pequeno. O enquadramento de distância evolutiva é uma estimativa, e os pesos abertos são o menor membro da família.',
    flow: {
      tracks: {
        kicker: 'Entrada',
        title: 'Três trilhas, um modelo',
        summary: 'Sequência, estrutura e função entram como trilhas paralelas de tokens sobre as mesmas posições.',
        detail:
          'A posição dezessete pode carregar um aminoácido, um token estrutural, uma anotação de função, ou qualquer subconjunto dos três. Um prompt é aquilo que você escolhe deixar visível, e é isso que faz um modelo só responder perguntas de enovelamento, design e anotação sem cabeças específicas por tarefa.',
        carries: 'Tokens multimodais',
      },
      tokenizer: {
        kicker: 'Caminho lateral',
        title: 'Tokenizador geométrico',
        summary: 'A geometria local do esqueleto é comprimida num vocabulário discreto.',
        detail:
          'Uma estrutura vira uma sequência de códigos, e códigos podem ser mascarados e previstos exatamente como aminoácidos. Um decodificador separado devolve os códigos previstos a coordenadas, então o tokenizador é uma ponte com perda, porém inversível, entre geometria e modelagem de linguagem.',
      },
      stack: {
        kicker: 'Tronco',
        title: 'Transformer compartilhado',
        summary: 'Uma pilha prevê logits para todas as trilhas ao mesmo tempo.',
        detail:
          'Como as trilhas dividem um tronco, evidência numa modalidade move a predição nas outras. Dar ao modelo um motivo estrutural muda quais sequências ele considera prováveis naquelas posições, e dar uma palavra de função faz o mesmo.',
        carries: 'Logits por trilha',
      },
      unmask: {
        kicker: 'Geração',
        title: 'Desmascaramento iterativo',
        summary: 'Posições mascaradas são preenchidas poucas por vez, cada passagem condicionando a seguinte.',
        detail:
          'A geração não é da esquerda para a direita. O modelo escolhe posições para fixar, escreve, e relê o design inteiro, e é assim que um motivo fixo e um suporte livre podem ser gerados num processo só.',
        carries: 'Trilhas completas',
      },
      decode: {
        kicker: 'Caminho lateral',
        title: 'Decodificador de estrutura',
        summary: 'Tokens estruturais voltam a ser coordenadas do esqueleto.',
        detail: 'Sem este passo, a trilha de estrutura é uma sequência de códigos, não um modelo que você abre num visualizador.',
      },
    },
  },
  proteinmpnn: {
    tagline: 'Dada a forma, quais sequências a sustentam?',
    what:
      'Propõe sequências de aminoácidos compatíveis com um esqueleto fornecido. Resíduos vizinhos são codificados como um grafo e as identidades são previstas numa ordem autorregressiva arbitrária, guardando o contexto estrutural das posições ainda não decididas.',
    standing:
      'O modelo de design de sequência condicionado à estrutura em torno do qual os pipelines de design foram construídos, com validação experimental em várias arquiteturas de proteína e reuso direto no LigandMPNN e em fluxos de design de ligantes.',
    distinct: [
      'A ordem arbitrária de decodificação é o que permite fixar um motivo enquanto o suporte é redesenhado.',
      'O codificador lê apenas geometria, então não precisa da sequência nativa que está substituindo.',
      'É pequeno e rápido o bastante para rodar milhares de designs por esqueleto.',
    ],
    limits:
      'Modela apenas átomos de proteína. Resíduos cuja função é coordenar um metal ou segurar um ligante parecem inexplicados, e é essa lacuna que o LigandMPNN fecha.',
    flow: {
      backbone: {
        kicker: 'Entrada',
        title: 'Um esqueleto, nenhuma sequência',
        summary: 'Só as coordenadas da cadeia principal são dadas. Os aminoácidos são a incógnita.',
        detail:
          'Isto é enovelamento lido ao contrário. A predição de estrutura pergunta qual forma uma sequência assume; o enovelamento inverso pergunta quais sequências sustentariam esta forma. Pipelines de design precisam da segunda resposta, porque um esqueleto gerado chega sem sequência nenhuma.',
        carries: 'Grafo de resíduos',
      },
      graph: {
        kicker: 'Codificador',
        title: 'Codificador de grafo de vizinhos',
        summary: 'Cada resíduo atende aos vizinhos mais próximos no espaço, descritos por distâncias e orientações.',
        detail:
          'Usar um grafo local em vez da matriz inteira mantém o custo administrável e combina com a física: o que um aminoácido pode ser é decidido sobretudo pelos átomos encostados nele. Os atributos são geométricos, então o codificador não muda se a entrada girar.',
        carries: 'Estados de nó com ciência da estrutura',
      },
      decoder: {
        kicker: 'Decodificador',
        title: 'Decodificador sem ordem fixa',
        summary: 'Os resíduos são decididos um por vez, em ordem aleatória, cada um condicionado nos já fixados.',
        detail:
          'Decodificar em ordem arbitrária é o que permite manter parte da sequência fixa enquanto o resto é desenhado. Um sítio de ligação pode ser congelado e o suporte reescrito ao redor dele, com os resíduos congelados visíveis a toda decisão posterior.',
        carries: 'Probabilidades de aminoácido',
      },
      ligand: {
        kicker: 'Sucessor',
        title: 'Átomos que não são proteína',
        summary: 'O LigandMPNN acrescenta ligantes, nucleotídeos e metais ao mesmo grafo.',
        detail:
          'O ProteinMPNN enxerga só átomos de proteína, então um resíduo que existe para segurar um íon de zinco parece inexplicado para ele. O LigandMPNN codifica o contexto não proteico e recupera resíduos nativos muito melhor nessas posições.',
      },
    },
  },
  rfdiffusion: {
    tagline: 'Tire o ruído até aparecer uma proteína.',
    what:
      'Gera esqueletos de proteína a partir de restrições de design, ajustando o RoseTTAFold para remover ruído de posições e orientações de resíduos. Suporta design de ligantes, montagens simétricas e suporte de motivos. O design de sequência é um passo separado, depois.',
    standing:
      'Uniu um preditor de estrutura pré-treinado à difusão generativa e testou designs diversos experimentalmente. Métodos posteriores de suporte de motivo catalítico partem dele diretamente.',
    distinct: [
      'A difusão roda sobre referenciais de resíduo, então a geometria do esqueleto continua legal sem restrições extras.',
      'O removedor de ruído parte de uma rede que já conhece estrutura de proteína.',
      'A saída não tem sequência. O ProteinMPNN e uma verificação de enovelamento completam o pipeline.',
    ],
    limits:
      'O sucesso é relatado por design testado, e a filtragem in silico faz boa parte do trabalho. O RFdiffusion2 removeu a exigência de especificar posições de resíduo para um motivo catalítico, sustentando os 41 sítios ativos do seu benchmark contra 16 dos métodos anteriores.',
    flow: {
      spec: {
        kicker: 'Entrada',
        title: 'Especificação do design',
        summary: 'Um alvo para ligar, um motivo para manter, uma simetria para obedecer, ou nada disso.',
        detail:
          'A geração sem condição é o caso mais simples e o menos útil. O valor está nas restrições: segure estes resíduos catalíticos, apresente este epítopo, construa uma montagem C3.',
        carries: 'Condicionamento',
      },
      noise: {
        kicker: 'Difusão',
        title: 'Referenciais de resíduo com ruído',
        summary: 'Comece de posições e orientações aleatórias para cada resíduo.',
        detail:
          'A difusão roda sobre referenciais, ou seja, uma translação e uma rotação por resíduo, e não sobre átomos crus. A geometria do esqueleto decorre dos referenciais, então o gerador nunca precisa manter comprimentos de ligação legais por conta própria.',
        carries: 'Esqueleto ruidoso',
      },
      denoise: {
        kicker: 'Tronco',
        title: 'RoseTTAFold como removedor de ruído',
        summary: 'Um preditor de estrutura pré-treinado é ajustado para tirar ruído um passo por vez.',
        detail:
          'Partir de uma rede que já sabe como uma proteína se parece é a razão de isso funcionar com os dados disponíveis. Um removedor de ruído treinado do zero teria de aprender geometria de proteína só a partir do objetivo de difusão.',
        carries: 'Coordenadas do esqueleto',
      },
      seq: {
        kicker: 'Próximo passo',
        title: 'Design de sequência',
        summary: 'A saída é um esqueleto sem sequência, então um modelo de enovelamento inverso roda em seguida.',
        detail:
          'Na prática o par é RFdiffusion e depois ProteinMPNN, seguidos de um modelo de enovelamento para conferir que a sequência desenhada devolve a forma pretendida antes de encomendar qualquer coisa.',
      },
      filter: {
        kicker: 'Seleção',
        title: 'Filtragem in silico',
        summary: 'Os designs são redobrados e ordenados antes da síntese.',
        detail:
          'As taxas de sucesso são relatadas por design testado, então o filtro faz parte do método. Um pipeline que gera dez mil esqueletos e encomenda noventa e seis está fazendo aqui quase toda a sua seleção.',
      },
    },
  },
  esmc: {
    tagline: 'A linha de representação, levada mais longe.',
    what:
      'Um codificador transformer com pre-layer-norm, embeddings rotativos e ativações SwiGLU, treinado em sequências do UniRef, do MGnify e do Joint Genome Institute agrupadas a 70 por cento de identidade. O contexto chega a 2048 tokens depois de um segundo estágio de treino.',
    standing:
      'Posicionado como a família de representação ao lado da linha generativa ESM3. O checkpoint de 6B é o codificador que o ESMFold2 lê.',
    distinct: [
      'Três tamanhos: 300M, 600M e 6B, com 30, 36 e 80 camadas.',
      'O treino correu em dois estágios: um milhão de passos com contexto 512, depois 500 mil com contexto 2048.',
      'O checkpoint de 6B relata 2,37e23 FLOPs de treino no seu cartão de modelo.',
    ],
    limits:
      'É um codificador, então produz embeddings e logits de token mascarado, não estruturas. Comparações com o ESM-2 vêm dos autores e do preprint deles, não de avaliação independente.',
  },
  esmfold2: {
    tagline: 'Um codificador de linguagem com decodificador de difusão de todos os átomos.',
    what:
      'Prevê estruturas de todos os átomos de proteínas e seus complexos a partir das representações do ESM C, com alinhamento opcional para alvos difíceis. Não reaproveita o módulo de estrutura no estilo AlphaFold 2 em que o ESMFold terminava.',
    standing:
      'O preprint relata predição de complexos acima de métodos estabelecidos, incluindo interações de anticorpo e antígeno, e descoberta de ligantes com afinidades nanomolares para miniproteínas e anticorpos de cadeia única.',
    distinct: [
      'O alinhamento passa a ser opcional, em vez de ausente ou obrigatório.',
      'O decodificador é difusão sobre átomos, a mesma virada que o AlphaFold 3 fez.',
      'Inverter o modelo é usado como procedimento de design, não só de predição.',
    ],
    limits:
      'É um preprint, ainda não revisado por pares. O checkpoint experimental publicado é uma variante rápida de 0,2B de parâmetros liberada para reprodutibilidade, e o próprio cartão recomenda o modelo principal para pesquisa.',
  },
  ligandmpnn: {
    tagline: 'Design de sequência que enxerga o ligante.',
    what:
      'Estende o design de sequência condicionado à estrutura para todo componente não proteico do sistema: moléculas pequenas, nucleotídeos e metais. Devolve conformações de cadeia lateral junto com as sequências.',
    standing:
      'A recuperação de sequência nativa em resíduos que contatam moléculas pequenas chega a 63,3 por cento, contra 50,5 por cento do ProteinMPNN e 50,4 por cento do Rosetta. Em resíduos que contatam metais, os números são 77,5, 40,6 e 36,0 por cento.',
    distinct: [
      'Átomos não proteicos entram no grafo em vez de serem apagados dele.',
      'O empacotamento das cadeias laterais vem junto com a sequência, então a ligação pode ser inspecionada em vez de suposta.',
      'Mais de 100 proteínas desenhadas que ligam moléculas pequenas e DNA foram validadas experimentalmente, com quatro estruturas cristalográficas.',
    ],
    limits:
      'Herda a suposição de que o esqueleto e a pose do ligante fornecidos estão corretos. Erros a montante se propagam em silêncio para a sequência desenhada.',
  },
  rfdiffusion2: {
    tagline: 'Enzimas a partir de uma geometria, não de uma numeração de resíduos.',
    what:
      'Desenha suportes diretamente a partir da geometria dos grupos funcionais catalíticos, sem especificar quais posições da sequência esses resíduos ocupam e sem geração de rotâmeros inversos.',
    standing:
      'Sustentou os 41 sítios ativos do seu benchmark, contra 16 dos métodos anteriores. Enzimas ativas foram identificadas para três mecanismos catalíticos depois de testar menos de 96 sequências em cada caso.',
    distinct: [
      'Motivos atômicos sem índice deixam o modelo escolher onde na cadeia cai um resíduo catalítico.',
      'A especificação é uma geometria de estado de transição, e não uma lista de resíduos.',
      'Mira design de enzimas em particular, onde métodos anteriores de suporte falhavam na maioria das vezes.',
    ],
    limits:
      'Atividade catalítica numa triagem de menos de 96 designs é um resultado forte para design, e ainda longe de uma enzima otimizada. Os números de renovação relatados vêm de estudos de caso individuais.',
  },
  prottrans: {
    tagline: 'Os codificadores que chegaram antes.',
    what:
      'Uma família de transformers treinados em UniRef e BFD com os objetivos de seus equivalentes em texto. O codificador do T5 é a parte normalmente usada, e seus embeddings por resíduo alimentam cabeças supervisionadas pequenas.',
    standing:
      'Estabeleceu que modelos de linguagem treinados em sequências de proteína produzem atributos com informação estrutural, e que os embeddings transferem para predição de estrutura secundária e de localização sem alinhamentos.',
    distinct: [
      'Embeddings do ProtT5 continuam uma linha de base forte para conjuntos rotulados pequenos.',
      'O codificador é usado sozinho; a metade decodificadora normalmente é descartada.',
      'Codificadores de tamanho médio muitas vezes empatam com os bem maiores quando o conjunto seguinte é pequeno.',
    ],
    limits:
      'Tokenização e dados de treino mais antigos que os da linha ESM. Para trabalho novo, estes são linhas de base, não a escolha padrão.',
  },
  saprot: {
    tagline: 'Um token para o resíduo e sua forma local.',
    what:
      'Um modelo de linguagem mascarado sobre um vocabulário com ciência de estrutura. Cada posição carrega um aminoácido combinado a um símbolo do alfabeto estrutural do Foldseek, então sequência e geometria local dividem um token.',
    standing:
      'Um codificador com ciência de estrutura bastante baixado, treinado em estruturas previstas do banco AlphaFold além das experimentais.',
    distinct: [
      'O alfabeto estrutural vem do Foldseek, então o modelo precisa de uma estrutura na entrada.',
      'Fica entre um codificador só de sequência e um modelo generativo multimodal.',
      'Existem duas linhas de checkpoint, uma treinada em estruturas previstas e outra no Protein Data Bank.',
    ],
    limits:
      'Exige uma estrutura, prevista ou experimental, o que é uma entrada mais pesada que a do ESM-2. Erros numa estrutura prevista entram direto nos tokens.',
  },
  alphamissense: {
    tagline: 'Pontuação com ciência de estrutura para trocas de um aminoácido.',
    what:
      'Classifica variantes missense como provavelmente benignas ou provavelmente patogênicas em todo o proteoma, adaptando um modelo derivado do AlphaFold com dados de frequência populacional em vez de rótulos clínicos.',
    standing:
      'Forneceu predições para variantes missense humanas em escala de proteoma, algo que a caracterização experimental não alcança.',
    distinct: [
      'Treinado sem anotações clínicas, o que mantém sentido a avaliação contra bancos clínicos.',
      'Usa contexto estrutural, então separa posições enterradas das expostas.',
      'Devolve uma pontuação calibrada, e não uma decisão binária.',
    ],
    limits:
      'Uma pontuação é evidência computacional dentro de um arcabouço de interpretação de variantes, não um diagnóstico. Cobre apenas substituições de um aminoácido.',
  },
};

type CompText = {title?: string; question?: string; rows?: Record<string, {label?: string; cells?: string[]}>; reading?: string};

export const comparisonsPt: Record<string, CompText> = {
  'esm-family': {
    title: 'ESM-2, ESM3 e ESM C',
    question: 'Três modelos com o mesmo prefixo que respondem perguntas diferentes.',
    reading:
      'O ESM3 é a linha generativa e o ESM C a linha de representação. O ESM-2 segue como o ponto de referência contra o qual os dois são medidos, e ainda é o checkpoint que a maior parte do código adiante carrega.',
    rows: {
      'What it is': {label: 'O que é', cells: ['Codificador mascarado de sequência', 'Modelo generativo multimodal', 'Codificador mascarado de sequência']},
      Tracks: {label: 'Trilhas', cells: ['Sequência', 'Sequência, estrutura, função', 'Sequência']},
      Generates: {label: 'Gera', cells: ['Logits de token mascarado', 'Sequência, estrutura e anotação', 'Logits de token mascarado']},
      'Open sizes': {label: 'Tamanhos abertos', cells: ['8M a 15B', 'Checkpoint aberto de 1,4B', '300M, 600M, 6B']},
      Context: {label: 'Contexto', cells: ['1024 tokens', 'Ver cartão do modelo', '2048 tokens']},
      'Use it for': {label: 'Use para', cells: ['Embeddings e linhas de base', 'Design por prompt', 'Embeddings em escala maior']},
      'Published as': {label: 'Publicado como', cells: ['Science 2023', 'Science 2025', 'Preprint 2026']},
    },
  },
  alphafold: {
    title: 'AlphaFold 2 e AlphaFold 3',
    question: 'O que mudou de fato entre os dois.',
    reading:
      'A maquinaria do triângulo sobreviveu e o fluxo do alinhamento não. Leia a diferença como a passagem de uma resposta determinística sobre proteínas para uma resposta amostrada sobre complexos biomoleculares.',
    rows: {
      Trunk: {label: 'Tronco', cells: ['Evoformer, fluxos de MSA e de pares', 'Pairformer, só token e pares']},
      Alignment: {label: 'Alinhamento', cells: ['Carregado pelo tronco inteiro', 'Resumido cedo e posto de lado']},
      Decoder: {label: 'Decodificador', cells: ['Módulo de estrutura, referenciais de resíduo', 'Difusão sobre átomos']},
      Output: {label: 'Saída', cells: ['Uma estrutura com confiança', 'Estruturas amostradas e ordenadas']},
      Covers: {label: 'Cobre', cells: ['Proteínas, e multímeros por extensão', 'Proteínas, ácidos nucleicos, ligantes, íons']},
      'Triangle updates': {label: 'Atualizações em triângulo', cells: ['Sim', 'Sim']},
      'Published as': {label: 'Publicado como', cells: ['Nature 2021', 'Nature 2024']},
    },
  },
  'esmfold-line': {
    title: 'ESMFold e ESMFold2',
    question: 'A mesma ideia, refeita sobre um codificador novo e outro decodificador.',
    reading:
      'A linhagem é um modelo de linguagem alimentando um decodificador de enovelamento. O que mudou é que o decodificador virou generativo e o alinhamento voltou como opção, não como exigência.',
    rows: {
      Encoder: {label: 'Codificador', cells: ['ESM-2, congelado', 'ESM C']},
      Alignment: {label: 'Alinhamento', cells: ['Nenhum na consulta', 'Opcional, para alvos difíceis']},
      Decoder: {label: 'Decodificador', cells: ['Módulo de estrutura estilo AlphaFold 2', 'Difusão de todos os átomos']},
      Scope: {label: 'Alcance', cells: ['Cadeias únicas', 'Cadeias e complexos']},
      'Design use': {label: 'Uso em design', cells: ['Só predição', 'Inversão usada para desenhar ligantes']},
      Status: {label: 'Situação', cells: ['Science 2023', 'Preprint 2026, sem revisão por pares']},
    },
  },
};

type TeachText = {plain?: string; analogy?: string; misread?: string; example?: {title?: string; needs?: string; weight?: string; reads?: string}};

export const teachingPt: Record<string, TeachText> = {
  alphafold2: {
    plain:
      'Você dá uma sequência de proteína. Ele procura milhares de sequências aparentadas em outras espécies, repara em quais posições mudam juntas e transforma isso num modelo tridimensional da proteína.',
    analogy:
      'Imagine ler a mesma frase traduzida em mil idiomas. Duas palavras que sempre mudam juntas provavelmente estão ligadas no sentido. Dois resíduos que sempre mutam juntos provavelmente se tocam no espaço.',
    misread:
      'Uma pontuação alta de confiança não é prova de que a estrutura está certa, e uma baixa muitas vezes significa que a região não tem forma fixa, e não que o modelo falhou.',
    example: {
      title: 'Dobrar uma sequência sem instalar nada',
      needs: 'Um navegador e uma conta Google para o notebook gratuito',
      weight: 'Minutos para uma proteína pequena, numa GPU gratuita',
      reads:
        'O ColabFold é o caminho que quase todo mundo usa de fato. Ele troca a busca lenta em banco de dados por uma hospedada, e é por isso que termina em minutos em vez de horas.',
    },
  },
  alphafold3: {
    plain:
      'O mesmo trabalho do AlphaFold 2, estendido a tudo que fica ao lado de uma proteína: DNA, RNA, uma molécula de fármaco, um íon metálico. Ele escreve a montagem inteira de uma vez, em vez de prever a proteína e docar o resto depois.',
    analogy:
      'O AlphaFold 2 desenhou o prédio. O AlphaFold 3 desenha o prédio já com os móveis dentro, e esboça o mesmo cômodo várias vezes para você ver a qual arranjo ele volta.',
    misread:
      'Como o decodificador gera em vez de medir, ele consegue desenhar uma pose caprichada para um ligante que na verdade não liga. A ordenação por confiança existe por isso e deve ser lida, não pulada.',
    example: {
      title: 'Rodar uma reimplementação aberta',
      needs: 'Uma GPU de 24 GB ou mais, e algumas horas para os bancos de dados',
      weight: 'Pesado. Esta é a única entrada aqui que um laptop não aguenta.',
      reads:
        'Os pesos originais não são livremente redistribuíveis, então o trabalho aberto acontece em reimplementações. Protenix e Boltz seguem a mesma família de arquitetura.',
    },
  },
  esm2: {
    plain:
      'Um modelo treinado escondendo aminoácidos e adivinhando de volta. Fazer isso bem obriga a aprender para que serve cada posição de uma proteína, e esses números internos acabam servindo para quase qualquer tarefa com proteínas.',
    analogy:
      'Preencha as lacunas, dez bilhões de vezes, até não conseguir evitar entender a gramática. Ninguém ensinou química a ele. Ele aprendeu quais resíduos combinam por ser obrigado a adivinhá-los.',
    misread:
      'Ele não prevê estrutura. Ele produz vetores. O ESMFold é o modelo que transforma esses vetores em coordenadas, e é um download separado.',
    example: {
      title: 'Obter um embedding para uma sequência',
      needs: 'pip install torch transformers',
      weight: 'Cerca de 2,5 GB para o checkpoint de 650M. Roda em CPU em segundos.',
      reads:
        'O último estado oculto tem um vetor por resíduo. A média sobre os resíduos reais, e não sobre o preenchimento, dá o vetor de sequência que as pessoas entregam a um classificador.',
    },
  },
  esmfold: {
    plain:
      'Ele dobra uma proteína só a partir da sequência. Sem busca por parentes, sem espera por banco de dados. O modelo de linguagem já leu proteínas o bastante para que seu estado interno faça as vezes do alinhamento.',
    analogy:
      'Um tradutor que leu a biblioteca inteira não para para consultar. Mais rápido, e um pouco pior na frase rara em que consultar teria ajudado.',
    misread:
      'Mais rápido não quer dizer melhor. Quando existe um alinhamento profundo, um preditor baseado em alinhamento costuma ganhar, e abrir mão dessa evidência é uma escolha sua.',
    example: {
      title: 'Prever uma estrutura e gravar um arquivo PDB',
      needs: 'pip install torch transformers accelerate',
      weight: 'Cerca de 10 GB de pesos. Uma GPU é muito recomendada.',
      reads:
        'A saída é um texto PDB que você pode salvar e abrir em qualquer visualizador. A coluna de fator B guarda o pLDDT, então colorir por fator B é colorir por confiança.',
    },
  },
  esm3: {
    plain:
      'Um modelo que lê e escreve três coisas ao mesmo tempo: a sequência, a forma e o que a proteína faz. Você entrega um formulário parcialmente preenchido e ele completa o que você deixou em branco.',
    analogy:
      'Palavras cruzadas em que as horizontais são aminoácidos, as verticais são geometria e o tema é a função. Preencher qualquer uma facilita o resto.',
    misread:
      'Os resultados de manchete vêm do maior modelo. O checkpoint disponível abertamente é o pequeno, e ele não vai reproduzi-los.',
    example: {
      title: 'Completar uma proteína parcialmente mascarada',
      needs: 'pip install esm, além de aceitar a licença na página do modelo',
      weight: 'Alguns gigabytes para o checkpoint aberto de 1,4B.',
      reads:
        'Os sublinhados são as posições que você deixa para o modelo decidir. A mesma chamada pode partir de uma trilha de estrutura, e é isso que faz dele um modelo, e não três.',
    },
  },
  proteinmpnn: {
    plain:
      'Você dá uma forma sem sequência e ele diz quais aminoácidos sustentariam aquela forma. Este é o passo de que todo pipeline de design precisa, porque esqueletos gerados chegam sem sequência nenhuma.',
    analogy:
      'Você tem o esqueleto de uma ponte e precisa decidir qual material vai em cada viga. O modelo olha o que cerca cada posição e escolhe algo que sirva.',
    misread:
      'Ele não verifica se a sequência realmente volta àquela forma. Por isso o pipeline padrão roda um preditor de estrutura depois e descarta os designs que não voltam.',
    example: {
      title: 'Desenhar sequências para um esqueleto',
      needs: 'Clonar o repositório, PyTorch e um arquivo PDB',
      weight: 'Cerca de 2M de parâmetros. Roda confortavelmente em CPU.',
      reads:
        'Temperatura baixa de amostragem dá sequências conservadoras e repetitivas; alta dá diversidade e mais falhas adiante. De 0,1 a 0,3 é a faixa usual.',
    },
  },
  rfdiffusion: {
    plain:
      'Ele parte de ruído aleatório e remove o ruído passo a passo até aparecer um esqueleto de proteína. Você pode fixar partes: mantenha este motivo, ligue àquele alvo, obedeça a esta simetria.',
    analogy:
      'O mesmo truque que transforma chuvisco em imagem, aplicado a uma proteína. Você segura algumas peças e deixa o processo inventar tudo em volta.',
    misread:
      'O que sai é geometria, não uma proteína. Ainda não tem sequência, e as taxas de sucesso relatadas já pressupõem filtragem pesada antes de qualquer síntese.',
    example: {
      title: 'Gerar um esqueleto que sustenta um motivo',
      needs: 'O repositório, uma GPU e os pesos liberados',
      weight: 'Um design curto leva minutos numa GPU moderna.',
      reads:
        'Leia a string de contig como uma frase: vinte resíduos livres, depois os resíduos 10 a 25 da cadeia A mantidos exatamente, depois mais quinze livres.',
    },
  },
  esmc: {
    plain:
      'O codificador mais novo da mesma família do ESM-2, treinado por mais tempo, em mais sequências, com janela maior. Serve para a mesma coisa: transformar uma sequência em números que um modelo menor consegue aprender.',
    analogy: 'Mesmo trabalho, vocabulário maior e memória melhor. Ele lê o dobro da cadeia antes de precisar parar.',
    misread: 'Não é preditor de estrutura nem modelo generativo. É o codificador que o ESMFold2 lê.',
    example: {
      title: 'Embutir uma sequência com o checkpoint de 300M',
      needs: 'pip install esm',
      weight: 'Comece pelo 300M. O checkpoint de 6B pede uma GPU grande.',
      reads: 'Peça os estados ocultos, não os logits. Os logits respondem a uma pergunta de token mascarado que você não fez.',
    },
  },
  ligandmpnn: {
    plain:
      'Design de sequência que enxerga o que a proteína está segurando. Um resíduo cuja função é agarrar um íon de zinco parece arbitrário para um modelo que não vê o zinco.',
    analogy: 'Desenhar uma mão sem saber o que ela vai segurar dá uma mão que não agarra nada em particular.',
    misread: 'Ele confia na pose que você der. Se o ligante estiver colocado errado na entrada, a sequência será desenhada em torno de um erro sem reclamar.',
  },
  rfdiffusion2: {
    plain:
      'Design de enzima que parte da geometria da química. Você descreve onde os átomos catalíticos precisam ficar, e o modelo encontra uma proteína que os coloque ali, escolhendo sozinho a numeração dos resíduos.',
    analogy:
      'Em vez de dizer "o resíduo 45 tem de ser uma histidina", você diz "um nitrogênio de histidina precisa ficar aqui, neste ângulo". O modelo decide onde na cadeia isso cai.',
    misread: 'Ativo numa triagem de menos de 96 designs é um resultado forte para design, e ainda muito longe de uma enzima que você usaria na indústria.',
  },
  prottrans: {
    plain: 'A primeira geração de modelos de linguagem de proteínas que funcionou. Ainda é uma linha de base justa, e ainda rápida o bastante para tentar antes de recorrer a algo maior.',
    analogy: 'A lente antiga confiável. Existe vidro mais nítido hoje, e esta ainda tira a foto.',
    misread: 'Carregue a metade codificadora do ProtT5 e ignore o decodificador. Quase ninguém usa o modelo sequência a sequência completo.',
  },
  saprot: {
    plain: 'Um modelo de linguagem cujo alfabeto guarda duas coisas por posição: qual aminoácido é, e mais ou menos que forma o esqueleto assume ali.',
    analogy: 'Escrever cada letra com um acento que diz como a cadeia se curva naquele ponto.',
    misread: 'Ele precisa de uma estrutura na entrada. Se essa estrutura for prevista, os erros dela vão direto para os tokens.',
  },
  alphamissense: {
    plain:
      'Dada uma substituição de aminoácido, ele estima quão provável é que a troca quebre a proteína. Foi treinado sem rótulos clínicos, e é isso que dá sentido a testá-lo contra dados clínicos.',
    analogy: 'Um corretor que sabe quais letras importam. Trocar uma numa palavra que sustenta a frase não é o mesmo que trocar numa palavra de enchimento.',
    misread: 'Uma pontuação é uma linha de evidência computacional dentro de um arcabouço de interpretação de variantes. Não é diagnóstico e não cobre inserções nem deleções.',
  },
  esmfold2: {
    plain: 'O fim atual da linha do modelo de linguagem até a estrutura: um codificador grande na frente, um decodificador generativo de todos os átomos atrás, e o alinhamento rebaixado de exigência a opção.',
    analogy: 'O mesmo pipeline do ESMFold, com um leitor melhor na frente e um decodificador que esboça em vez de medir.',
    misread: 'É um preprint. O checkpoint que dá para baixar hoje é uma variante experimental pequena cujo próprio cartão manda usar o modelo principal para trabalho de verdade.',
  },
};

type RouteText = {title?: string; who?: string; time?: string; steps?: {label: string; why: string}[]};

export const routesPt: Record<string, RouteText> = {
  newcomer: {
    title: 'Nunca treinei nada',
    who: 'Você sabe biologia. As palavras de aprendizado de máquina é que são estranhas.',
    time: 'Cerca de uma hora',
    steps: [
      {label: 'Treine um classificador com 100 pontos', why: 'Antes de qualquer proteína, veja um modelo aprender uma fronteira a partir de exemplos. Tudo depois disso é o mesmo laço com mais parâmetros.'},
      {label: 'Olhe dentro de um neurônio', why: 'Pesos, viés, ativação. Três ideias que reaparecem em toda arquitetura do catálogo.'},
      {label: 'Preencha uma palavra mascarada', why: 'Este é exatamente o objetivo que produziu o ESM-2. Rode primeiro em palavras, onde você mesmo julga a resposta.'},
      {label: 'Leia o ESM-2', why: 'Agora o mesmo objetivo em aminoácidos, numa escala em que os estados internos começam a codificar estrutura.'},
      {label: 'Siga até a estrutura', why: 'O que precisa ser somado a um modelo de linguagem antes de sair coordenada do outro lado.'},
    ],
  },
  predict: {
    title: 'Quero prever uma estrutura',
    who: 'Você tem uma sequência, precisa de um modelo dela e de um jeito de julgar o que recebeu.',
    time: 'Uma tarde',
    steps: [
      {label: 'Comece pelo AlphaFold 2', why: 'A rota baseada em alinhamento, ainda a referência para uma cadeia única com parentes conhecidos.'},
      {label: 'Veja o que o AlphaFold 3 mudou', why: 'Se a sua pergunta envolve um ligante, um ácido nucleico ou um complexo, a resposta é outro modelo.'},
      {label: 'Use o ESMFold quando a velocidade ganhar', why: 'Sem busca por alinhamento. Vale para sequências órfãs e para tudo de que você precise aos milhares.'},
      {label: 'Veja onde a linha está agora', why: 'O preprint de 2026, com as ressalvas de se ler um preprint.'},
    ],
  },
  design: {
    title: 'Quero desenhar uma proteína',
    who: 'Você quer construir algo que ainda não existe e saber qual modelo faz cada passo.',
    time: 'Uma tarde, e depois muita computação',
    steps: [
      {label: 'Gere um esqueleto', why: 'A difusão produz a forma. As restrições são como você diz para que serve a forma.'},
      {label: 'Dê a ele uma sequência', why: 'Um esqueleto sem sequência não pode ser encomendado. O enovelamento inverso preenche isso.'},
      {label: 'Coloque o ligante na conta', why: 'Se o seu design segura uma molécula pequena, um metal ou DNA, o modelo só de proteína é cego para metade do problema.'},
      {label: 'Confira antes de encomendar', why: 'Dobre a sequência desenhada e veja se ela volta à forma pedida. A maioria não volta.'},
      {label: 'Ou peça a um modelo só', why: 'A rota multimodal: descreva o motivo e a função, deixe um modelo escrever o resto.'},
    ],
  },
};
