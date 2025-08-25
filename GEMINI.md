Documento de Requisitos do Produto (PRD)
Infográfico Interativo: Guia de Gerenciamento de Resíduos de Epóxi

1. Introdução e Resumo
   1.1. Produto: Infográfico web interativo, de página única (one-page), focado em educar e conscientizar profissionais sobre o correto gerenciamento de resíduos de epóxi, com base na legislação e normas técnicas brasileiras, incluindo a atualização da ABNT NBR 10.004 para 2024.
   1.2. Problema: O descarte incorreto de resíduos provenientes da aplicação e remoção de revestimentos epóxi — como pó de lixamento, sobras de tintas, solventes e embalagens contaminadas — representa um grave risco à saúde pública e ao meio ambiente. Muitos profissionais da área desconhecem que esses materiais são classificados como Resíduos Perigosos (Classe 1) e, por consequência, não seguem os procedimentos legais e seguros para seu manejo, armazenamento e destinação final.
   1.3. Solução Proposta: Desenvolver um guia visual, centralizado e de fácil compreensão que sirva como uma fonte de consulta rápida e confiável. O infográfico abordará de forma didática desde os conceitos legais e os perigos associados até o passo a passo prático para o descarte correto, capacitando os profissionais a agirem em conformidade com as normas e de maneira ambientalmente responsável.
   1.4. Público-Alvo:
   • Primário: Aplicadores de pisos e revestimentos epóxi, equipes de obra, técnicos em meio ambiente, técnicos de segurança do trabalho, gestores de EHS e gestores de projetos na construção civil.
   • Secundário: Técnicos de segurança do trabalho, engenheiros ambientais, arquitetos e gestores de empresas de construção e reforma.
2. Metas e Objetivos
   2.1. Meta Principal: Reduzir o descarte inadequado de resíduos de epóxi no setor da construção civil, promovendo práticas de gerenciamento seguras que protejam a saúde dos trabalhadores e o meio ambiente.
   2.2. Objetivos Específicos:
   • Educar: Informar claramente sobre as legislações pertinentes (Lei 12.305/10 - PNRS e NR-6) e a norma técnica ABNT NBR 10.004:2024.
   • Conscientizar: Destacar os riscos associados ao manejo incorreto, incluindo danos à saúde, contaminação ambiental e perigo de acidentes.
   • Instruir: Fornecer um guia visual passo a passo sobre o ciclo de vida do resíduo, desde a geração até a destinação final.
   • Capacitar: Apresentar as opções de descarte final licenciadas e seguras, como coprocessamento, incineração e aterro industrial Classe I.
3. Recursos e Funcionalidades (Requisitos Funcionais)
   Funcionalidade Descrição Prioridade
   Navegação Fixa (Sticky) Um menu no topo da página, que permanece visível durante a rolagem, com links âncora para todas as seções principais do infográfico. Alta
   Seções de Conteúdo Estático O infográfico será dividido em seções temáticas, cada uma com títulos claros, textos concisos e elementos visuais de apoio (ícones, pictogramas, emojis). As seções são: Legislação, Os Perigos, Proteção/EPIs, Classificação e Destinação Final. Alta
   Componente Interativo: Ciclo de Vida Uma linha do tempo horizontal com 5 etapas clicáveis (Geração, Acondicionamento, Armazenamento, Transporte, Destinação). Ao clicar em uma etapa, uma área de conteúdo abaixo é atualizada dinamicamente para exibir detalhes, incluindo um ícone e um texto explicativo. A etapa selecionada deve ter um destaque visual. Alta
   Visualização de Dados (Gráficos) Na seção "Destinação Final", cada opção de descarte (Coprocessamento, Incineração, Aterro Classe I) será acompanhada por um gráfico de rosca (doughnut chart) para reforçar visualmente a ideia de um ciclo completo e seguro. Média
   Design Responsivo O layout do infográfico deve se adaptar perfeitamente a diferentes tamanhos de tela, garantindo uma experiência de usuário consistente em desktops, tablets e smartphones. Alta
   Rodapé Informativo O final da página deve conter uma mensagem de reforço sobre a responsabilidade do gerador do resíduo, informações de contato e um aviso legal destacando o caráter educativo do material. Alta
   Multi-idioma Disponibiliza versões em português, inglês e espanhol. Alta
   Seção de FAQ Criada uma área com perguntas e respostas comuns sobre o tema. Alta
   Links para Fontes Externas Adicionados links diretos para a consulta das leis e normas citadas. Alta
   Dark Mode Adicionado um botão para alternar entre o modo claro e escuro. Média
   Formulário de Contato Adicionado um formulário de contato. Média
4. Design e Experiência do Usuário (UX)
   • Identidade Visual: A paleta de cores deve ser profissional e funcional. Utilizar cores como azul (#073B4C, #118AB2) para transmitir confiança e seriedade, vermelho (#FF6B6B) para alertas de perigo, e verde (#06D6A0) para soluções e práticas corretas.
   • Tipografia: A fonte "Inter" será usada em diferentes pesos para criar uma hierarquia visual clara entre títulos, subtítulos e corpo de texto, garantindo excelente legibilidade.
   • Iconografia: Os ícones e pictogramas devem ser estilizados, claros e universalmente compreensíveis, facilitando a absorção rápida da informação.
   • Interatividade: As interações (hover em links, clique nas etapas) devem fornecer feedback visual imediato para o usuário, tornando a navegação intuitiva.
5. Tecnologias
   • Estrutura (Frontend): HTML5
   • Estilização: Tailwind CSS e CSS customizado.
   • Interatividade e Lógica: JavaScript (Vanilla JS).
   • Gráficos: Biblioteca Chart.js.
6. Escopo Futuro (Não incluído na versão inicial)
   • Versão para Impressão/PDF: Adicionar um botão que permita ao usuário baixar uma versão estática do infográfico em formato PDF.
