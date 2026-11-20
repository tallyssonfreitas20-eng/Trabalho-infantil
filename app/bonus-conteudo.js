/* =========================================================
   bonus-conteudo.js — os 4 bônus do Kit Premium (lidos no app)
   Cada bônus: { id, titulo, sub, cor, paginas: [{ t, h }] }
   h = HTML simples (parágrafos, listas, quadros .box / .tip)
   ========================================================= */
window.BONUS = [
  {
    id: 'b1', titulo: 'Guia de Montagem e Produção', sub: 'Do primeiro corte à produção em quantidade', cor: '#2F5D4A',
    paginas: [
      { t: 'Como usar este guia', h: '<p>Este guia complementa o passo a passo de cada personagem. Leia uma vez do começo ao fim e depois volte às páginas que precisar.</p><ul><li>Páginas 1 a 6: preparação e corte.</li><li>Páginas 7 a 12: costura e detalhes.</li><li>Páginas 13 a 18: acabamento e produção em série.</li></ul><div class="tip">Comece por um personagem simples, como a Ovelha ou a Estrela, para treinar a mão.</div>' },
      { t: 'Kit de ferramentas essenciais', h: '<ul><li><b>Tesoura grande e afiada</b>, só para tecido.</li><li><b>Tesoura pequena</b> de ponta fina, para curvas e rostos.</li><li><b>Agulhas de mão</b> nº 7 a 9.</li><li><b>Linha de costura</b> nas cores do feltro e <b>linha de bordado</b> (meada) para olhos e boca.</li><li><b>Alfinetes</b> de cabeça.</li><li><b>Giz de alfaiate</b> ou caneta que some com calor.</li><li><b>Cola de tecido</b> (opcional, para peças muito pequenas).</li><li><b>Enchimento</b> de fibra siliconada (opcional).</li></ul><div class="box">Guarde tudo numa caixa só: você perde menos tempo procurando.</div>' },
      { t: 'Escolhendo o feltro', h: '<p>Para dedoches, prefira <b>feltro de 1 mm a 1,4 mm</b>: é firme o bastante para manter a forma e fino o bastante para costurar à mão.</p><ul><li><b>Feltro liso</b>: o mais usado, bom custo.</li><li><b>Feltro de lã/mesclado</b>: toque mais macio e acabamento artesanal, custa mais.</li><li><b>Feltro adesivado</b>: prático para detalhes, mas não serve para o corpo.</li></ul><div class="tip">Compre cores neutras em maior quantidade (pele, branco, bege, marrom): aparecem em quase todos os personagens.</div>' },
      { t: 'Organização da bancada', h: '<ul><li>Separe uma bandeja para cada personagem que está fazendo.</li><li>Deixe os moldes de papel num envelope identificado.</li><li>Use um potinho para alfinetes e outro para peças pequenas (olhos, mãos, acessórios).</li><li>Boa luz evita erro de corte e cansaço na vista.</li></ul>' },
      { t: 'Imprimir e conferir o molde', h: '<ol><li>No app, abra o personagem e toque em <b>Imprimir este molde</b>.</li><li>Na impressora, escolha <b>tamanho real (100%)</b>, nunca "ajustar à página".</li><li>Meça a régua de 5 cm impressa ao lado do molde. Se não medir 5 cm, a impressão foi reduzida.</li><li>Recorte as peças de papel com folga de 2 a 3 mm.</li></ol><div class="tip">Antes de cortar o feltro, encoste o molde do corpo no dedo de quem vai usar. Para dedos de adulto, use a opção "Ampliado".</div>' },
      { t: 'Passando o molde para o feltro', h: '<ul><li><b>Alfinete</b>: prenda o papel e corte rente. Rápido para peças grandes.</li><li><b>Contorno a giz</b>: risque em volta do papel e corte por dentro da linha.</li><li><b>Papel-manteiga</b>: para peças muito pequenas, decalque e corte junto com o papel.</li></ul><div class="box">Corte as peças que pedem "2x" com o feltro dobrado: as duas saem idênticas.</div>' },
      { t: 'Cortes retos, curvas e peças pequenas', h: '<ul><li>Retas: use a tesoura grande, em cortes longos.</li><li>Curvas: gire o feltro, não a tesoura.</li><li>Peças pequenas: tesoura de ponta fina e cortes curtos.</li><li>Pontas (coroas, estrelas): corte em direção à ponta, nunca a partir dela.</li></ul>' },
      { t: 'Ponto caseado', h: '<p>É o ponto que une frente e costas do corpo e deixa a borda bonita.</p><ol><li>Entre com a agulha de trás para a frente, a 3 mm da borda.</li><li>Antes de puxar, passe a agulha por dentro da laçada.</li><li>Puxe com firmeza, sem franzir.</li><li>Mantenha a mesma distância entre os pontos.</li></ol><div class="tip">Use a Escola de Pontos do app para ver a animação.</div>' },
      { t: 'Ponto atrás e ponto corrido', h: '<ul><li><b>Ponto atrás</b>: linha contínua e firme. Use para bocas, contornos e costuras que fazem força.</li><li><b>Ponto corrido</b>: o mais simples. Use para prender mantos, faixas e enfeites, ou como decoração em linha colorida.</li></ul>' },
      { t: 'Rostos: olhos, boca e bochechas', h: '<ul><li><b>Olhos bordados</b>: 3 ou 4 voltas de ponto atrás no mesmo lugar, com linha preta.</li><li><b>Botões ou meia-pérola</b>: ficam lindos, mas <b>não use para crianças pequenas</b> (risco de engolir).</li><li><b>Boca</b>: um arco em ponto atrás com linha vermelha ou rosa.</li><li><b>Bochechas</b>: um toque de blush ou lápis de cor rosa com algodão.</li></ul>' },
      { t: 'Cabelos, barbas e véus', h: '<ul><li>Prenda o cabelo no rosto antes de costurar o rosto no corpo.</li><li>Barbas: aplique com pontos pequenos só na parte de cima; deixe a ponta solta.</li><li>Véus e turbantes: alinhe pelo centro da cabeça e prenda nas laterais.</li></ul>' },
      { t: 'Mantos, coletes e faixas', h: '<ul><li>Mantos e coletes: prenda na frente do corpo antes de fechar o dedoche.</li><li>Faixas: um ponto em cada lateral basta; elas ficam por cima.</li><li>Use cores contrastantes: o personagem fica mais fácil de reconhecer de longe.</li></ul>' },
      { t: 'Acessórios pequenos', h: '<p>Cajados, coroas, auréolas, pergaminhos, espadas e animais pequenos:</p><ul><li>Corte em feltro duplo e una com cola de tecido para ficarem firmes.</li><li>Costure ou cole na mão do personagem por último.</li><li>Dourado e amarelo destacam coroas e auréolas.</li></ul>' },
      { t: 'Fechamento e acabamento', h: '<ol><li>Una frente e costas com ponto caseado.</li><li><b>Deixe a base aberta</b> para entrar o dedo.</li><li>Dê o nó por dentro.</li><li>Corte fiapos e linhas soltas.</li><li>Teste no dedo: não pode apertar.</li></ol>' },
      { t: 'Erros comuns e como corrigir', h: '<ul><li><b>Dedoche apertado</b>: imprima na opção "Ampliado".</li><li><b>Borda franzida</b>: os pontos estavam puxados demais; desmanche e refaça mais solto.</li><li><b>Rosto torto</b>: alinhe com alfinetes antes de costurar.</li><li><b>Feltro esgarçando</b>: feltro fino demais; use 1 mm ou mais.</li></ul>' },
      { t: 'Produção em série: corte em lote', h: '<p>Para fazer vários iguais:</p><ol><li>Faça um molde de papel-cartão ou acetato de cada peça.</li><li>Risque várias peças de uma vez no feltro.</li><li>Corte todas as peças do mesmo tipo em sequência.</li><li>Guarde em saquinhos por personagem.</li></ol><div class="tip">Cortar 10 corpos seguidos é bem mais rápido que cortar 1 personagem inteiro de cada vez.</div>' },
      { t: 'Linha de montagem semanal', h: '<ul><li><b>Dia 1</b>: imprimir e cortar.</li><li><b>Dia 2</b>: rostos e cabelos.</li><li><b>Dia 3</b>: roupas e acessórios.</li><li><b>Dia 4</b>: fechamento.</li><li><b>Dia 5</b>: acabamento, fotos e embalagem.</li></ul>' },
      { t: 'Checklist de qualidade', h: '<ul class="check"><li>Rosto centralizado e olhos alinhados</li><li>Sem linhas soltas</li><li>Pontos com o mesmo espaçamento</li><li>Base aberta e confortável no dedo</li><li>Acessórios firmes</li><li>Sem peças pequenas soltas para crianças pequenas</li><li>Personagem fácil de reconhecer</li></ul>' }
    ]
  },
  {
    id: 'b2', titulo: 'Catálogo de Kits para Venda', sub: '15 combinações prontas de personagens', cor: '#7E2E3A',
    paginas: [
      { t: 'Como usar o catálogo', h: '<p>Cada kit reúne personagens de uma mesma história. Kits com história vendem melhor que peças soltas, porque o comprador já imagina o uso.</p><ul><li>Monte primeiro os kits do calendário mais próximo (Natal, Páscoa).</li><li>Fotografe o kit completo, com o nome da história.</li><li>Inclua um cartão com a passagem bíblica.</li></ul>' },
      { t: 'Kit 1 · Presépio Essencial', h: '<p><b>Personagens:</b> Maria, José, Anjo, Pastor, Ovelha e Estrela.</p><p><b>História:</b> o nascimento de Jesus (Lc 2,1-20).</p><p><b>Para quem:</b> famílias e lembrancinhas de Natal.</p><div class="tip">O Menino Jesus não está entre os moldes. Muitas artesãs usam uma pequena manjedoura de feltro com um bebê enrolado em feltro branco, feito à mão livre.</div>' },
      { t: 'Kit 2 · Presépio com Reis Magos', h: '<p><b>Personagens:</b> os 10 moldes da Folha 8 (Maria, José, Anjo, Pastor, Ovelha, Camelo, Melchior, Gaspar, Baltazar e Estrela de Belém).</p><p><b>Para quem:</b> catequese e presente de Natal mais completo.</p>' },
      { t: 'Kit 3 · Os Magos e a Estrela', h: '<p><b>Personagens:</b> Melchior, Gaspar, Baltazar, Camelo e Estrela de Belém (Mt 2,1-12).</p><p><b>Ocasião:</b> Epifania (Dia de Reis, 6 de janeiro).</p>' },
      { t: 'Kit 4 · Animais da Bíblia', h: '<p><b>Personagens:</b> Ovelha, Leão, Camelo e Arca de Noé.</p><p><b>Para quem:</b> crianças pequenas e berçário da catequese.</p>' },
      { t: 'Kit 5 · Davi e Golias', h: '<p><b>Personagens:</b> Davi e Golias (1Sm 17). Use os dois modelos de cada, das Folhas 2 e 4, para um kit maior.</p><p><b>Mensagem:</b> coragem e confiança em Deus.</p>' },
      { t: 'Kit 6 · Daniel na Cova dos Leões', h: '<p><b>Personagens:</b> Daniel, Cova dos Leões e Leão (Dn 6).</p><p><b>Mensagem:</b> fidelidade na oração.</p>' },
      { t: 'Kit 7 · Moisés e o Êxodo', h: '<p><b>Personagens:</b> Moisés, Arão, Miriã, Faraó e Josué (Ex 3–15).</p><p><b>Ocasião:</b> encontros de catequese sobre a Páscoa judaica e a libertação.</p>' },
      { t: 'Kit 8 · Rute, Noemi e Boaz', h: '<p><b>Personagens:</b> Rute, Noemi e Boaz (Rt 1–2).</p><p><b>Mensagem:</b> fidelidade e cuidado com a família.</p>' },
      { t: 'Kit 9 · Rainha Ester', h: '<p><b>Personagens:</b> Ester (dois modelos) e Mardoqueu (Est 4–5).</p><p><b>Para quem:</b> meninas e grupos de jovens.</p>' },
      { t: 'Kit 10 · A Família de Abraão', h: '<p><b>Personagens:</b> Abraão, Sara, Isaque e Rebeca (Gn 12–24).</p><p><b>Mensagem:</b> a promessa de Deus.</p>' },
      { t: 'Kit 11 · Jacó e José do Egito', h: '<p><b>Personagens:</b> Jacó, Raquel, Leia, José do Egito e Faraó (Gn 29–45).</p><p><b>Mensagem:</b> perdão em família.</p>' },
      { t: 'Kit 12 · Milagres de Jesus', h: '<p><b>Personagens:</b> Jesus, Jairo, Filha de Jairo, Mulher do fluxo e Bartimeu (Mc 5; 10).</p><p><b>Para quem:</b> catequese de Primeira Eucaristia.</p>' },
      { t: 'Kit 13 · Amigos de Betânia', h: '<p><b>Personagens:</b> Jesus, Marta, Maria de Betânia e Lázaro (Lc 10; Jo 11).</p><p><b>Mensagem:</b> amizade e fé na vida.</p>' },
      { t: 'Kit 14 · Zaqueu', h: '<p><b>Personagens:</b> Jesus e Zaqueu (Lc 19,1-10). Kit pequeno e barato, ótimo como lembrancinha.</p>' },
      { t: 'Kit 15 · Os Primeiros Cristãos', h: '<p><b>Personagens:</b> Paulo, Barnabé, Lídia, Priscila e Áquila (At 16; 18).</p><p><b>Para quem:</b> crisma e grupos de jovens.</p>' },
      { t: 'Kit extra · Catequese Variada', h: '<p>Para catequistas que querem um personagem de cada fase da Bíblia: Abraão, Moisés, Davi, Jonas, Maria, Jesus e Paulo.</p>' }
    ]
  },
  {
    id: 'b3', titulo: 'Guia de Precificação e Lucro', sub: 'Calcule o preço certo das suas peças', cor: '#23457A',
    paginas: [
      { t: 'Antes de começar', h: '<p>Preço bom cobre o material, paga o seu tempo e deixa uma margem para a sua lojinha crescer. Os valores deste guia são <b>exemplos</b>: use sempre os seus números.</p><div class="box">A calculadora do <b>Ateliê</b>, no app, faz as contas com os valores que você digitar.</div>' },
      { t: 'Quanto custa cada material', h: '<p>Anote o que você pagou em cada item:</p><ul><li>Folhas de feltro (tamanho e preço)</li><li>Meadas e carretéis de linha</li><li>Cola, enchimento, olhinhos</li><li>Embalagem, etiqueta, tag</li></ul><div class="tip">Exemplo de referência: em 2026, uma folha de feltro liso de 50 x 70 cm custava por volta de R$ 6,90 em grandes lojas online.</div>' },
      { t: 'Quanto rende uma folha de feltro', h: '<ol><li>Imprima o molde e veja o tamanho do corpo (a maior peça).</li><li>Conte quantos corpos cabem numa folha.</li><li>Divida o preço da folha por esse número.</li></ol><p>Peças pequenas (rostos, faixas) costumam sair de retalhos e quase não pesam no custo.</p>' },
      { t: 'Custo por dedoche', h: '<div class="formula">Custo do dedoche = feltro + linha + detalhes</div><p>Exemplo: R$ 0,50 de feltro + R$ 0,15 de linha + R$ 0,15 de detalhes = <b>R$ 0,80</b>.</p>' },
      { t: 'Quanto vale a sua hora', h: '<p>Decida quanto quer ganhar por hora de trabalho e cronometre quanto tempo leva para fazer um personagem.</p><div class="formula">Valor do trabalho = horas × valor da hora</div><div class="tip">Cronometre os 3 primeiros e use a média: você fica mais rápida com o tempo.</div>' },
      { t: 'Fórmula do preço de venda', h: '<div class="formula">Preço = (material + embalagem + trabalho) + margem</div><p>A margem (de 10% a 30%, por exemplo) cobre perdas, taxas e o crescimento da sua lojinha.</p>' },
      { t: 'Preço de kit', h: '<p>No kit, some os personagens e a embalagem única. Você pode dar um pequeno desconto em relação às peças avulsas: o cliente sente vantagem e você vende mais de uma vez só.</p>' },
      { t: 'Exemplo prático', h: '<p>Kit com 5 dedoches (valores ilustrativos):</p><ul><li>Material: 5 × R$ 0,80 = R$ 4,00</li><li>Embalagem e tag: R$ 4,00</li><li>Trabalho: 2,5 h × R$ 20 = R$ 50,00</li><li>Margem de 15%: R$ 8,70</li></ul><p><b>Preço sugerido: cerca de R$ 66,70.</b></p><div class="tip">Compare com o que se cobra na sua região e nas lojas online antes de definir.</div>' },
      { t: 'Encomendas e revenda', h: '<ul><li>Peça um sinal (por exemplo, 50%) em encomendas grandes.</li><li>Para lojistas que revendem, ofereça preço de atacado a partir de uma quantidade mínima.</li><li>Combine prazo por escrito.</li></ul>' },
      { t: 'Taxas e frete', h: '<p>Se vender por maquininha, marketplace ou link de pagamento, a taxa sai do seu valor. Inclua a taxa no preço ou cobre o frete à parte.</p>' },
      { t: 'Controle mensal', h: '<p>No fim de cada mês anote: kits produzidos, kits vendidos, gasto com material e valor recebido. O <b>Ateliê</b> do app já guarda esses números para você.</p><div class="box">Os resultados de vendas dependem do seu trabalho, do seu preço e da sua divulgação.</div>' }
    ]
  },
  {
    id: 'b4', titulo: 'Guia de Embalagens e Apresentação', sub: '15 ideias para valorizar seus dedoches', cor: '#9A6B2F',
    paginas: [
      { t: 'Por que a embalagem vende', h: '<p>Dedoche bem embalado vira presente. A embalagem mostra cuidado, protege a peça e ajuda o cliente a lembrar de você.</p>' },
      { t: '1 · Caixa kraft com visor', h: '<p>Caixa de papel kraft com janela de acetato. Mostra o kit inteiro sem abrir.</p><p><b>Quando usar:</b> presépios e kits de 5 ou mais.</p>' },
      { t: '2 · Saquinho de algodão com cruz', h: '<p>Saquinho cru com uma cruz carimbada ou bordada. Rústico e delicado.</p><p><b>Quando usar:</b> lembrancinhas de batizado e catequese.</p>' },
      { t: '3 · Saquinho de organza', h: '<p>Leve, barato e bonito. Feche com fita de cetim.</p><p><b>Quando usar:</b> dedoche avulso em festas.</p>' },
      { t: '4 · Caixa-presépio', h: '<p>Caixa de papelão em formato de casinha, com palha seca no fundo. Os personagens ficam "dentro do estábulo".</p>' },
      { t: '5 · Cartela de papel', h: '<p>Cartão com dois cortes para encaixar o dedoche, com o nome do personagem e a passagem bíblica. Ótimo para expor pendurado.</p>' },
      { t: '6 · Tag com versículo', h: '<p>Tag pendurada com um versículo curto ligado ao personagem. Exemplo para Davi: "O Senhor é o meu pastor" (Sl 23,1).</p>' },
      { t: '7 · Etiqueta da sua marca', h: '<p>Nome da sua lojinha, contato e um símbolo simples (cruz, coração, tesoura). Coloque em todas as peças.</p>' },
      { t: '8 · Cartão "Conheça a história"', h: '<p>Cartão com 3 linhas contando a história e uma pergunta para fazer às crianças. Agrega valor e ajuda pais e catequistas.</p>' },
      { t: '9 · Embalagem para batizado', h: '<p>Tons claros (branco, azul-claro, rosa), fita de cetim e tag com o nome da criança e a data.</p>' },
      { t: '10 · Embalagem para Primeira Eucaristia', h: '<p>Detalhes dourados, cálice ou hóstia desenhados na tag, e o nome do catequizando.</p>' },
      { t: '11 · Embalagem de Natal', h: '<p>Kraft com fita vermelha, estrelinha dourada e um raminho verde. Combine com o Kit Presépio.</p>' },
      { t: '12 · Embalagem de Páscoa', h: '<p>Cesta pequena ou caixa com tons claros e um cartão sobre a Ressurreição.</p>' },
      { t: '13 · Expositor para feira e bazar', h: '<p>Uma tábua com pinos de madeira ou um suporte de garrafas: cada dedoche "veste" um pino. Organize por história.</p>' },
      { t: '14 · Fotos que vendem', h: '<ul><li>Luz natural, perto da janela.</li><li>Fundo neutro (madeira, linho, papel creme).</li><li>Uma foto do kit, uma da peça no dedo e uma da embalagem.</li></ul>' },
      { t: '15 · Modelo de etiqueta para imprimir', h: '<div class="label-demo"><b>Dedoches Bíblicos Artesanais</b><span>Feito à mão com carinho</span><span>Seu nome · (00) 00000-0000</span></div><p>Copie este modelo num editor de texto, troque os dados e imprima em papel adesivo.</p>' }
    ]
  }
];
