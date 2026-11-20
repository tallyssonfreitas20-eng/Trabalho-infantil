/* =========================================================
   config.js — CONFIGURAÇÃO CENTRAL DA PÁGINA
   Edite aqui: nome, preço, checkout, imagens, coleções, bônus,
   garantia, depoimentos e perguntas frequentes.
   ========================================================= */
window.CONFIG = {
  produto: '100 Dedoches Bíblicos em Feltro',

  /* PLANOS — preços e links de checkout (edite só aqui).
     Enquanto o link estiver vazio, o botão mostra um aviso para configurar. */
  planos: {
    basico:  { nome: 'Kit Básico',  preco: 5.90,  checkoutUrl: 'https://pay.cakto.com.br/wiuua4h_1349756' },
    premium: { nome: 'Kit Premium', preco: 19.90, checkoutUrl: 'https://pay.cakto.com.br/hdg3zzc_1349762' }
  },
  precoNota: 'Pagamento único · sem mensalidade',
  formasPagamento: 'Pix, cartão ou boleto (conforme a plataforma de pagamento)',
  repassarUTMs: true, // repassa ?utm_... da URL da página para o checkout

  /* SUPORTE e links legais (deixe vazio para ocultar) */
  emailSuporte: '',
  linkPrivacidade: '',
  linkTermos: '',

  /* ACESSO */
  acesso: 'Após a confirmação do pagamento, você recebe o acesso aos arquivos pelo e-mail cadastrado na compra.',

  /* GARANTIA */
  garantia: {
    dias: 7,
    texto: 'Você tem 7 dias após a compra para conhecer todo o material. Se sentir que não é para você, basta solicitar o reembolso pela plataforma de pagamento, conforme as condições aplicáveis e o direito de arrependimento do Código de Defesa do Consumidor.'
  },

  /* IMAGENS — quando tiver fotos reais dos personagens confeccionados,
     coloque os arquivos em /assets e informe o caminho aqui.
     Vazio = usa a ilustração demonstrativa em SVG. */
  imagens: {
    hero: 'assets/hero.jpg',               // Bloco 1 — personagens prontos com crianças
    antesDepois: ['assets/antes-depois-maria.jpg', 'assets/antes-depois-jesus.jpg'], // Bloco 3
    passos: ['assets/passo1.jpg', 'assets/passo2.jpg', 'assets/passo3.jpg', 'assets/passo4.jpg'], // Bloco 4
    kitDigital: 'assets/kit-digital.jpg',  // Bloco 8 — colagem com 16 moldes
    final: 'assets/final.jpg',             // CTA final — colagem com 16 moldes
    ogImage: 'assets/og-image.jpg'
  },

  /* CARROSSEL AUTOMÁTICO (Bloco "Veja o que você recebe")
     Linha 1: páginas de molde completas. Linha 2: cartões de molde. */
  carrosselPaginas: [
    { img: 'assets/moldes/maria.jpg', nome: 'Maria' },
    { img: 'assets/moldes/jose.jpg', nome: 'José' },
    { img: 'assets/moldes/menino-jesus.jpg', nome: 'Menino Jesus' },
    { img: 'assets/moldes/anjo-gabriel.jpg', nome: 'Anjo Gabriel' },
    { img: 'assets/moldes/jesus.jpg', nome: 'Jesus' },
    { img: 'assets/moldes/noe.jpg', nome: 'Noé' },
    { img: 'assets/moldes/abraao.jpg', nome: 'Abraão' },
    { img: 'assets/moldes/sara.jpg', nome: 'Sara' },
  ],
  carrosselCartoes: [
    { img: 'assets/cards/maria.jpg', nome: 'Maria' },
    { img: 'assets/cards/jose.jpg', nome: 'José' },
    { img: 'assets/cards/menino-jesus.jpg', nome: 'Menino Jesus' },
    { img: 'assets/cards/anjo-gabriel.jpg', nome: 'Anjo Gabriel' },
    { img: 'assets/cards/pastor.jpg', nome: 'Pastor' },
    { img: 'assets/cards/melchior.jpg', nome: 'Rei Mago Melchior' },
    { img: 'assets/cards/gaspar.jpg', nome: 'Rei Mago Gaspar' },
    { img: 'assets/cards/baltazar.jpg', nome: 'Rei Mago Baltazar' },
    { img: 'assets/cards/noe.jpg', nome: 'Noé' },
    { img: 'assets/cards/moises.jpg', nome: 'Moisés' },
    { img: 'assets/cards/farao.jpg', nome: 'Faraó' },
    { img: 'assets/cards/davi.jpg', nome: 'Davi' },
    { img: 'assets/cards/golias.jpg', nome: 'Golias' },
    { img: 'assets/cards/jonas.jpg', nome: 'Jonas' },
    { img: 'assets/cards/daniel.jpg', nome: 'Daniel' },
    { img: 'assets/cards/pedro.jpg', nome: 'Pedro' },
    { img: 'assets/cards/paulo.jpg', nome: 'Paulo' },
    { img: 'assets/cards/maria-madalena.jpg', nome: 'Maria Madalena' },
    { img: 'assets/cards/anjo-sepulcro.jpg', nome: 'Anjo do Sepulcro' },
  ],

  /* FOTOS DO BLOCO "Para quem é" */
  fotosPublico: [
    { img: 'assets/familia-avo.jpg', legenda: 'Avós e netos' },
    { img: 'assets/familia.jpg', legenda: 'Família' },
    { img: 'assets/catequese.jpg', legenda: 'Catequese' }
  ],

  /* Mostra o nome de cada espaço de imagem na página (true = ligado).
     Útil para saber onde cada foto vai entrar. */
  mostrarNomesDasImagens: false,

  /* DEPOIMENTOS — só adicione avaliações REAIS e verificáveis.
     Enquanto a lista estiver vazia, a seção fica oculta.
     Formato: { nome: 'Ana', local: 'Belo Horizonte/MG', texto: '...', foto: 'assets/dep-ana.jpg' } */
  depoimentos: [],

  /* COLEÇÕES — "look" descreve a ilustração demonstrativa de cada personagem.
     "foto" (opcional) substitui as ilustrações do card por uma foto real. */
  colecoes: [
    {
      titulo: 'O Nascimento de Jesus', destaque: true, foto: '',
      desc: 'Monte um presépio completo de dedoches e conte a história do Natal.',
      personagens: [
        ['Maria', { robe: 'white', cloak: 'blue', head: 'veil', veil: 'blue', halo: true }],
        ['José', { robe: 'brown', cloak: 'tan', hair: 'brown', beard: 'short', head: 'cloth', headC: 'cream', band: 'brown', item: 'staff' }],
        ['Menino Jesus', { robe: 'cream', baby: true, halo: true, skin: 'a', hair: 'brown', hairStyle: 'curly' }],
        ['Anjo Gabriel', { robe: 'white', sash: 'gold', wings: true, halo: true, hair: 'blond', hairStyle: 'curly', skin: 'a' }],
        ['Pastor', { robe: 'olive', head: 'cloth', headC: 'cream', band: 'brown', beard: 'short', hair: 'dark', item: 'staff' }],
        ['Melchior (Rei Mago)', { robe: 'red', cloak: 'gold', head: 'crown', hair: 'grey', beard: 'long', item: 'gift', skin: 'a' }],
        ['Gaspar (Rei Mago)', { robe: 'green', cloak: 'wine', head: 'crown', hair: 'brown', beard: 'short', item: 'gift' }],
        ['Baltasar (Rei Mago)', { robe: 'purple', cloak: 'gold', head: 'turban', headC: 'white', item: 'gift', skin: 'd', hair: 'black' }],
        ['Hospedeiro', { robe: 'mustard', belt: 'brown', hair: 'dark', hairStyle: 'bald', beard: 'short', item: 'lamp' }],
        ['Isabel', { robe: 'wine', head: 'veil', veil: 'tan', skin: 'a' }],
        ['Zacarias', { robe: 'white', sash: 'blue', head: 'turban', headC: 'white', hair: 'white', beard: 'long', item: 'scroll' }],
        ['Simeão', { robe: 'cream', cloak: 'teal', hair: 'white', hairStyle: 'bald', beard: 'long' }],
        ['Jumentinho', { animal: 'donkey' }],
        ['Boi', { animal: 'ox' }],
        ['Ovelha', { animal: 'sheep' }]
      ]
    },
    {
      titulo: 'A Arca de Noé', foto: '',
      desc: 'Noé, sua família e os animais para encenar a promessa de Deus.',
      personagens: [
        ['Noé', { robe: 'brown', cloak: 'olive', hair: 'white', hairStyle: 'bald', beard: 'long', item: 'staff' }],
        ['Esposa de Noé', { robe: 'teal', head: 'veil', veil: 'cream' }],
        ['Sem', { robe: 'orange', hair: 'brown', beard: 'short', belt: 'brown' }],
        ['Cam', { robe: 'green', hair: 'black', beard: 'short', skin: 'c', sash: 'mustard' }],
        ['Jafé', { robe: 'sky', hair: 'auburn', belt: 'brown', skin: 'a' }],
        ['Pomba', { animal: 'dove', item: 'branch' }],
        ['Girafa', { animal: 'giraffe' }],
        ['Urso', { animal: 'bear' }]
      ]
    },
    {
      titulo: 'Abraão, José e os Patriarcas', foto: '',
      desc: 'As grandes histórias de fé e família do livro do Gênesis.',
      personagens: [
        ['Abraão', { robe: 'cream', cloak: 'brown', head: 'cloth', headC: 'white', band: 'brown', hair: 'white', beard: 'long', item: 'staff' }],
        ['Sara', { robe: 'pink', head: 'veil', veil: 'white' }],
        ['Isaac', { robe: 'sky', hair: 'brown', hairStyle: 'curly', belt: 'brown' }],
        ['Rebeca', { robe: 'orange', head: 'veil', veil: 'mustard' }],
        ['Jacó', { robe: 'olive', cloak: 'brown', hair: 'dark', beard: 'short', item: 'staff' }],
        ['Esaú', { robe: 'brown', hair: 'auburn', hairStyle: 'curly', beard: 'short', sash: 'tan' }],
        ['José do Egito', { robe: 'white', stripes: ['red', 'mustard', 'blue', 'green', 'orange'], hair: 'brown' }],
        ['Benjamim', { robe: 'sky', hair: 'dark', hairStyle: 'curly', skin: 'a', belt: 'brown' }],
        ['Faraó', { robe: 'white', collar: 'gold', head: 'nemes', skin: 'c', hairStyle: 'none' }],
        ['Potifar', { robe: 'white', collar: 'blue', head: 'band', headC: 'gold', hair: 'black', skin: 'c', item: 'spear' }]
      ]
    },
    {
      titulo: 'Moisés e a Libertação do Povo', foto: '',
      desc: 'Do cesto no rio Nilo à travessia do Mar Vermelho.',
      personagens: [
        ['Moisés', { robe: 'wine', cloak: 'brown', hair: 'grey', beard: 'long', item: 'staff' }],
        ['Miriam', { robe: 'teal', head: 'veil', veil: 'mustard', item: 'tambourine' }],
        ['Aarão', { robe: 'blue', sash: 'gold', head: 'turban', headC: 'white', hair: 'grey', beard: 'long' }],
        ['Faraó', { robe: 'white', cloak: 'red', collar: 'gold', head: 'nemes', skin: 'c', hairStyle: 'none', item: 'staff' }],
        ['Filha do Faraó', { robe: 'white', collar: 'teal', hair: 'black', hairStyle: 'long', skin: 'c', head: 'band', headC: 'gold' }],
        ['Zípora', { robe: 'red', head: 'veil', veil: 'orange', skin: 'c' }],
        ['Josué', { robe: 'brown', head: 'band', headC: 'red', hair: 'dark', beard: 'short', item: 'spear' }],
        ['Soldado egípcio', { robe: 'white', collar: 'blue', head: 'band', headC: 'blue', hair: 'black', skin: 'c', belt: 'gold', item: 'spear' }],
        ['Ancião hebreu', { robe: 'tan', cloak: 'grey', hair: 'white', hairStyle: 'bald', beard: 'long', item: 'staff' }]
      ]
    },
    {
      titulo: 'Davi e os Profetas', foto: '',
      desc: 'Coragem, amizade e a voz dos profetas de Israel.',
      personagens: [
        ['Samuel', { robe: 'white', cloak: 'blue', hair: 'grey', beard: 'long', item: 'lamp' }],
        ['Jessé', { robe: 'olive', head: 'cloth', headC: 'cream', band: 'olive', hair: 'white', beard: 'long', item: 'staff' }],
        ['Davi', { robe: 'orange', belt: 'brown', hair: 'auburn', hairStyle: 'curly', item: 'sling', skin: 'a' }],
        ['Golias', { robe: 'grey', armor: true, head: 'helmet', hair: 'black', beard: 'long', item: 'spear' }],
        ['Saul', { robe: 'wine', cloak: 'gold', head: 'crown', hair: 'dark', beard: 'short', item: 'spear' }],
        ['Jônatas', { robe: 'green', belt: 'gold', hair: 'brown', item: 'heart' }],
        ['Elias', { robe: 'brown', cloak: 'tan', hair: 'grey', hairStyle: 'long', beard: 'long' }],
        ['Eliseu', { robe: 'olive', cloak: 'brown', hairStyle: 'bald', hair: 'dark', beard: 'short', item: 'staff' }]
      ]
    },
    {
      titulo: 'Jonas e Daniel', foto: '',
      desc: 'Obediência, confiança e a fidelidade de Deus em tempos difíceis.',
      personagens: [
        ['Jonas', { robe: 'sky', hair: 'brown', beard: 'short', belt: 'brown' }],
        ['Grande peixe', { animal: 'fish' }],
        ['Rei de Nínive', { robe: 'purple', cloak: 'red', head: 'crown', hair: 'black', beard: 'long' }],
        ['Daniel', { robe: 'blue', sash: 'gold', hair: 'dark', item: 'scroll' }],
        ['Rei Dario', { robe: 'red', cloak: 'purple', head: 'crown', hair: 'grey', beard: 'long' }],
        ['Ananias', { robe: 'orange', head: 'turban', headC: 'cream', skin: 'c' }],
        ['Misael', { robe: 'green', head: 'turban', headC: 'mustard' }],
        ['Azarias', { robe: 'teal', head: 'turban', headC: 'red', skin: 'c' }]
      ]
    },
    {
      titulo: 'Jesus e Seus Discípulos', foto: '',
      desc: 'Jesus, os apóstolos e os amigos de Betânia.',
      personagens: [
        ['Jesus', { robe: 'white', cloak: 'red', hair: 'brown', hairStyle: 'long', beard: 'short', halo: true }],
        ['Pedro', { robe: 'blue', cloak: 'mustard', hair: 'grey', hairStyle: 'curly', beard: 'short', item: 'key' }],
        ['André', { robe: 'green', hair: 'auburn', beard: 'short', item: 'fish' }],
        ['Tiago', { robe: 'orange', hair: 'dark', beard: 'short', item: 'staff' }],
        ['João', { robe: 'red', hair: 'blond', hairStyle: 'long', skin: 'a', item: 'scroll' }],
        ['Filipe', { robe: 'mustard', hair: 'brown', beard: 'short', item: 'cross' }],
        ['Tomé', { robe: 'teal', hair: 'black', beard: 'short', skin: 'c', belt: 'brown' }],
        ['Mateus', { robe: 'purple', hair: 'dark', beard: 'short', item: 'scroll' }],
        ['Judas Iscariotes', { robe: 'grey', hair: 'black', beard: 'short', item: 'bag' }],
        ['Maria Madalena', { robe: 'red', head: 'veil', veil: 'wine', item: 'jar' }],
        ['Marta', { robe: 'mustard', head: 'veil', veil: 'brown', item: 'bread' }],
        ['Lázaro', { robe: 'cream', hair: 'dark', beard: 'short', sash: 'tan' }]
      ]
    },
    {
      titulo: 'Parábolas e Milagres', foto: '',
      desc: 'Os ensinamentos de Jesus para encenar com as crianças.',
      personagens: [
        ['Bom Samaritano', { robe: 'teal', head: 'cloth', headC: 'cream', band: 'red', beard: 'short', hair: 'dark' }],
        ['Viajante ferido', { robe: 'cream', hair: 'brown', beard: 'short', head: 'band', headC: 'white' }],
        ['Sacerdote', { robe: 'white', sash: 'blue', head: 'turban', headC: 'white', beard: 'long', hair: 'grey' }],
        ['Levita', { robe: 'sky', head: 'turban', headC: 'cream', beard: 'short' }],
        ['Filho pródigo', { robe: 'tan', hair: 'dark', hairStyle: 'curly' }],
        ['Pai misericordioso', { robe: 'wine', cloak: 'gold', hair: 'white', beard: 'long' }],
        ['Irmão mais velho', { robe: 'olive', hair: 'dark', beard: 'short', belt: 'brown' }],
        ['Cego curado', { robe: 'grey', hair: 'brown', beard: 'short', item: 'staff' }],
        ['Paralítico', { robe: 'cream', cloak: 'tan', hair: 'auburn' }],
        ['Menino dos pães e peixes', { robe: 'sky', hair: 'dark', hairStyle: 'curly', item: 'bread' }]
      ]
    },
    {
      titulo: 'Paixão e Ressurreição', foto: '',
      desc: 'Personagens para a Semana Santa e a alegria da Páscoa.',
      personagens: [
        ['Pôncio Pilatos', { robe: 'white', cloak: 'purple', hair: 'grey', skin: 'a' }],
        ['Centurião romano', { robe: 'red', armor: true, head: 'helmet', crest: true, item: 'spear' }],
        ['Soldado romano', { robe: 'red', armor: true, head: 'helmet', item: 'spear' }],
        ['Simão de Cirene', { robe: 'tan', skin: 'd', hair: 'black', hairStyle: 'curly', beard: 'short', item: 'cross' }],
        ['Barrabás', { robe: 'brown', hair: 'black', hairStyle: 'curly', beard: 'short' }],
        ['Maria, mãe de Tiago', { robe: 'purple', head: 'veil', veil: 'grey' }],
        ['Anjo do sepulcro', { robe: 'white', wings: true, halo: true, hair: 'blond', hairStyle: 'long', sash: 'sky', skin: 'a' }]
      ]
    },
    {
      titulo: 'Os Primeiros Cristãos', foto: '',
      desc: 'A Igreja nascente nos Atos dos Apóstolos.',
      personagens: [
        ['Paulo', { robe: 'green', cloak: 'red', hairStyle: 'bald', hair: 'dark', beard: 'long', item: 'scroll' }],
        ['Estêvão', { robe: 'white', sash: 'red', hair: 'brown', skin: 'a' }],
        ['Cornélio', { robe: 'red', cloak: 'gold', armor: true, head: 'helmet', crest: true }],
        ['Ananias de Damasco', { robe: 'olive', head: 'cloth', headC: 'cream', band: 'olive', hair: 'grey', beard: 'long' }],
        ['Barnabé', { robe: 'orange', hair: 'brown', beard: 'long' }],
        ['Silas', { robe: 'sky', hair: 'black', beard: 'short', skin: 'c' }],
        ['Timóteo', { robe: 'teal', hair: 'auburn', skin: 'a', item: 'scroll' }],
        ['Tito', { robe: 'mustard', hair: 'dark', hairStyle: 'curly' }],
        ['Priscila', { robe: 'pink', head: 'veil', veil: 'teal' }],
        ['Áquila', { robe: 'brown', hair: 'dark', beard: 'short', belt: 'tan' }],
        ['Lídia', { robe: 'purple', head: 'veil', veil: 'pink' }],
        ['Filipe, o evangelista', { robe: 'blue', hair: 'brown', beard: 'short', item: 'scroll' }],
        ['Tiago, irmão do Senhor', { robe: 'cream', cloak: 'brown', hair: 'grey', beard: 'long' }]
      ]
    }
  ],

  /* KITS PARA VENDER — "p" = [índice da coleção, índice do personagem] */
  kits: [
    { nome: 'Kit Nascimento de Jesus', desc: 'Personagens para representar a história do Natal.', p: [[0, 1], [0, 0], [0, 2], [0, 3], [0, 14]], tag: 'Natal' },
    { nome: 'Kit Arca de Noé', desc: 'Noé, sua família e os animais.', p: [[1, 0], [1, 5], [1, 6], [1, 7]] },
    { nome: 'Kit Davi e Golias', desc: 'Personagens para encenar a história bíblica.', p: [[4, 2], [4, 3], [4, 4]] },
    { nome: 'Kit Histórias de Jesus', desc: 'Personagens para parábolas, milagres e ensinamentos.', p: [[6, 0], [7, 0], [7, 9], [6, 1]] },
    { nome: 'Kit Catequese Infantil', desc: 'Conjunto variado para atividades religiosas.', p: [[2, 0], [3, 0], [5, 0], [5, 1]] }
  ],

  /* BÔNUS — exclusivos do Kit Premium */
  bonus: [
    { titulo: 'Guia de Montagem e Produção', desc: 'Orientações complementares sobre organização da produção, corte, costura, acabamento e fabricação em quantidade.', cor: '#2F5D4A', icone: 'needle', capa: 'assets/bonus/bonus1.jpg' },
    { titulo: 'Catálogo de Kits para Venda', desc: 'Sugestões de combinações de personagens para montar coleções temáticas e oferecer kits aos clientes.', cor: '#7E2E3A', icone: 'box', capa: 'assets/bonus/bonus2.jpg' },
    { titulo: 'Guia de Precificação e Lucro', desc: 'Orientações para calcular o custo dos materiais, tempo de produção e preço de venda das peças confeccionadas.', cor: '#23457A', icone: 'tag', capa: 'assets/bonus/bonus3.jpg' },
    { titulo: 'Guia de Embalagens e Apresentação', desc: 'Ideias para embalar, organizar e apresentar os dedoches como presentes e kits religiosos.', cor: '#9A6B2F', icone: 'gift', capa: 'assets/bonus/bonus4.jpg' },
  ],

  /* PERGUNTAS FREQUENTES */
  faq: [
    ['Nunca costurei. Consigo fazer?', 'Sim. Os personagens foram pensados para iniciantes: todos partem de uma mesma estrutura-base simples, e o que muda são as roupas, os rostos, os cabelos e os acessórios. As instruções ilustradas mostram a montagem passo a passo. Comece pelos personagens mais simples e, depois do primeiro, os próximos ficam cada vez mais naturais.'],
    ['Preciso de máquina de costura?', 'Não. Os projetos são pensados para costura manual, com agulha e linha.'],
    ['Como imprimo os moldes?', 'No app, cada personagem tem o botão "Imprimir este molde". Dá para imprimir em impressora comum, em papel A4, ou numa papelaria. Cada molde indica o tamanho correto de impressão.'],
    ['Quais materiais vou precisar?', 'Basicamente feltro em cores variadas, linha, agulha de mão, tesoura e caneta ou giz para marcar o feltro. Cola de tecido e pequenos detalhes para os rostos são opcionais. A lista completa vem no material.'],
    ['Posso usar na catequese e na paróquia?', 'Pode e deve! Os dedoches foram pensados justamente para encontros de catequese, atividades infantis, encenações e ações de evangelização.'],
    ['Posso vender os dedoches que eu fizer?', 'Sim. Você pode vender as peças físicas que confeccionar, avulsas ou em kits. O que não é permitido é revender, compartilhar ou distribuir os moldes digitais (os arquivos em PDF).'],
    ['Qual a diferença entre o Kit Básico e o Kit Premium?', 'Os dois trazem os 100 moldes com paleta de cores, lista de materiais, referência do personagem pronto e passo a passo ilustrado. O Premium traz tudo isso e mais 4 bônus: Guia de Montagem e Produção, Catálogo de Kits para Venda, Guia de Precificação e Lucro, e Guia de Embalagens e Apresentação.'],
    ['Vou receber os bonecos prontos em casa?', 'Não. Este é um produto 100% digital: você recebe o acesso ao app, com os moldes para imprimir e as instruções para confeccionar os personagens. Nenhum item físico é enviado.'],
    ['Como recebo o acesso?', 'Após a confirmação do pagamento, você recebe pelo e-mail o link do app Dedoches Bíblicos. Pagamentos por Pix e cartão costumam ser confirmados rapidamente; boleto pode levar alguns dias úteis.'],
    ['E se eu não gostar?', 'Você tem 7 dias de garantia. Se não ficar satisfeita, é só pedir o reembolso pela plataforma de pagamento, conforme as condições aplicáveis.'],
    ['O que é A Bíblia em Cena?', 'É um complemento opcional oferecido no checkout: 20 roteiros para contar e encenar histórias da Bíblia com os dedoches, com falas, cenário, mensagem e perguntas para as crianças. Ele aparece dentro do app para quem adicionar na compra.']
  ]
};
