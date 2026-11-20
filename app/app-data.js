/* =========================================================
   app-data.js — CONFIGURAÇÃO E CONTEÚDO DO APP
   Edite aqui: plano, links dos PDFs, suporte, histórias e quiz.
   (A lista dos 100 personagens vem de config.js)
   ========================================================= */
window.APP = {
  nome: 'Dedoches Bíblicos',

  /* Plano padrão. O link também pode escolher: ...#basico ou ...#premium */
  plano: 'premium',

  /* Links dos PDFs de cada coleção (Google Drive, Hotmart, etc.).
     Vazio = o botão "Abrir molde em PDF" não aparece. */
  linksMoldes: Array(10).fill('moldes/MOLDES_DEDOCHES_BIBLICOS.pdf'),

  /* Links dos PDFs dos bônus (só no Premium) */
  linksBonus: ['', '', '', ''],
  bonusCapas: ['img/bonus/bonus1.jpg', 'img/bonus/bonus2.jpg', 'img/bonus/bonus3.jpg', 'img/bonus/bonus4.jpg'],

  /* Contato de suporte (vazio = oculto) */
  suporte: '',

  /* Imagens reais por personagem: card (miniatura) e page (página do molde) */
  imgs: {
    c0p0: { card: 'img/cards/maria.jpg', page: 'img/moldes/maria.jpg' },
    c0p1: { card: 'img/cards/jose.jpg', page: 'img/moldes/jose.jpg' },
    c0p2: { card: 'img/cards/menino-jesus.jpg', page: 'img/moldes/menino-jesus.jpg' },
    c0p3: { card: 'img/cards/anjo-gabriel.jpg', page: 'img/moldes/anjo-gabriel.jpg' },
    c0p4: { card: 'img/cards/pastor.jpg' },
    c0p5: { card: 'img/cards/melchior.jpg' },
    c0p6: { card: 'img/cards/gaspar.jpg' },
    c0p7: { card: 'img/cards/baltazar.jpg' },
    c1p0: { card: 'img/cards/noe.jpg', page: 'img/moldes/noe.jpg' },
    c2p0: { page: 'img/moldes/abraao.jpg' },
    c2p1: { page: 'img/moldes/sara.jpg' },
    c3p0: { card: 'img/cards/moises.jpg' },
    c3p3: { card: 'img/cards/farao.jpg' },
    c4p2: { card: 'img/cards/davi.jpg' },
    c4p3: { card: 'img/cards/golias.jpg' },
    c5p0: { card: 'img/cards/jonas.jpg' },
    c5p3: { card: 'img/cards/daniel.jpg' },
    c6p0: { page: 'img/moldes/jesus.jpg' },
    c6p1: { card: 'img/cards/pedro.jpg' },
    c6p9: { card: 'img/cards/maria-madalena.jpg' },
    c8p6: { card: 'img/cards/anjo-sepulcro.jpg' },
    c9p0: { card: 'img/cards/paulo.jpg' }
  },
  passos: ['img/passos/passo1.jpg', 'img/passos/passo2.jpg', 'img/passos/passo3.jpg', 'img/passos/passo4.jpg'],

  /* Passagem bíblica de cada personagem (mesma ordem de config.js) */
  refs: [
    ['Lc 1,26-38', 'Mt 1,18-25', 'Lc 2,1-20', 'Lc 1,26-38', 'Lc 2,8-20', 'Mt 2,1-12', 'Mt 2,1-12', 'Mt 2,1-12', 'Lc 2,1-7', 'Lc 1,39-45', 'Lc 1,5-25', 'Lc 2,25-35', 'Tradição do presépio', 'Tradição do presépio (Is 1,3)', 'Lc 2,8-20'],
    ['Gn 6,9-22', 'Gn 7,1-7', 'Gn 6,10', 'Gn 6,10', 'Gn 6,10', 'Gn 8,8-12', 'Gn 7,1-16', 'Gn 7,1-16'],
    ['Gn 12,1-9', 'Gn 21,1-7', 'Gn 22,1-19', 'Gn 24', 'Gn 28,10-22', 'Gn 25,27-34', 'Gn 37', 'Gn 43–45', 'Gn 41', 'Gn 39'],
    ['Ex 3', 'Ex 15,20-21', 'Ex 4,14-16', 'Ex 5', 'Ex 2,5-10', 'Ex 2,16-22', 'Js 1,1-9', 'Ex 14', 'Ex 12'],
    ['1Sm 3', '1Sm 16,1-13', '1Sm 17', '1Sm 17', '1Sm 10', '1Sm 18,1-4', '1Rs 18', '2Rs 2'],
    ['Jn 1–2', 'Jn 2', 'Jn 3,6-10', 'Dn 6', 'Dn 6', 'Dn 3', 'Dn 3', 'Dn 3'],
    ['Mc 1,14-20', 'Mt 16,13-19', 'Jo 1,40-42', 'Mc 1,19-20', 'Jo 19,25-27', 'Jo 1,43-46', 'Jo 20,24-29', 'Mt 9,9-13', 'Mt 26,14-16', 'Jo 20,11-18', 'Lc 10,38-42', 'Jo 11,1-44'],
    ['Lc 10,25-37', 'Lc 10,25-37', 'Lc 10,25-37', 'Lc 10,25-37', 'Lc 15,11-32', 'Lc 15,11-32', 'Lc 15,11-32', 'Jo 9,1-12', 'Mc 2,1-12', 'Jo 6,1-14'],
    ['Jo 18,28-40', 'Mc 15,39', 'Jo 19,1-3', 'Lc 23,26', 'Mt 27,15-26', 'Mc 16,1-8', 'Mt 28,1-7'],
    ['At 9,1-19', 'At 6,8–7,60', 'At 10', 'At 9,10-19', 'At 4,36-37', 'At 16,25-34', 'At 16,1-5', 'Tt 1,4-5', 'At 18,1-3', 'At 18,1-3', 'At 16,13-15', 'At 8,26-40', 'At 15,13-21']
  ],

  /* Resumo da história e pergunta para as crianças, por coleção */
  historias: [
    ['Deus enviou o anjo Gabriel a Maria, e Jesus nasceu em Belém, numa manjedoura. Pastores e Magos vieram adorá-lo.', 'Que presente você daria ao Menino Jesus?'],
    ['Noé confiou em Deus, construiu a arca e salvou sua família e os animais. Depois, Deus fez uma aliança com o arco-íris.', 'Como Noé mostrou que confiava em Deus?'],
    ['Abraão deixou sua terra porque Deus o chamou. Sua família cresceu e, no Egito, José perdoou os irmãos que o tinham vendido.', 'Por que é importante perdoar, como José fez?'],
    ['Moisés foi salvo das águas do rio Nilo e chamado por Deus para libertar o povo da escravidão no Egito.', 'Quem cuida de nós quando sentimos medo?'],
    ['Davi, um jovem pastor, venceu o gigante Golias confiando em Deus. Profetas como Samuel e Elias levaram a Palavra ao povo.', 'Que "gigante" você pode vencer com a ajuda de Deus?'],
    ['Jonas fugiu da missão, mas Deus lhe deu uma nova chance. Daniel continuou rezando, e Deus o protegeu na cova dos leões.', 'Por que Daniel continuou rezando, mesmo sendo proibido?'],
    ['Jesus chamou pescadores e amigos para segui-lo. Eles caminharam com Ele e aprenderam a amar como Ele ama.', 'O que significa seguir Jesus no dia a dia?'],
    ['Com parábolas e milagres, Jesus ensinou a misericórdia: o Bom Samaritano, o pai que perdoa e o menino que partilhou seus pães.', 'Quem precisa da sua ajuda hoje?'],
    ['Jesus entregou a sua vida por amor e, no terceiro dia, ressuscitou. As mulheres encontraram o sepulcro vazio.', 'Por que a Páscoa é uma festa de alegria?'],
    ['Depois de Pentecostes, os primeiros cristãos anunciaram Jesus por toda parte. Paulo, que perseguia a Igreja, tornou-se apóstolo.', 'Como você pode falar de Jesus a um amigo?']
  ],

  /* QUIZ DA FÉ — [pergunta, [opções], índice da correta, explicação] por coleção */
  quiz: [
    [['Qual anjo anunciou a Maria que ela seria a mãe de Jesus?', ['Rafael', 'Gabriel', 'Miguel'], 1, 'Foi o anjo Gabriel (Lc 1,26-38).'],
     ['Em que cidade Jesus nasceu?', ['Nazaré', 'Jerusalém', 'Belém'], 2, 'Jesus nasceu em Belém (Lc 2,4-7).'],
     ['O que guiou os Magos até Jesus?', ['Uma estrela', 'Um anjo no caminho', 'Um pastor'], 0, 'Eles seguiram uma estrela (Mt 2,9-10).']],
    [['Qual ave voltou para a arca com um ramo de oliveira?', ['O corvo', 'A pomba', 'A águia'], 1, 'Foi a pomba (Gn 8,11).'],
     ['Quantos filhos Noé tinha?', ['Dois', 'Três', 'Cinco'], 1, 'Sem, Cam e Jafé (Gn 6,10).']],
    [['Qual era o nome da esposa de Abraão?', ['Rebeca', 'Raquel', 'Sara'], 2, 'Sara, mãe de Isaac (Gn 21,1-3).'],
     ['Qual filho de Jacó ganhou uma túnica especial do pai?', ['José', 'Benjamim', 'Esaú'], 0, 'José (Gn 37,3).']],
    [['Quem Deus escolheu para libertar o povo do Egito?', ['Josué', 'Moisés', 'Aarão'], 1, 'Moisés (Ex 3,10).'],
     ['Que mar se abriu para o povo passar?', ['Mar Vermelho', 'Mar Morto', 'Mar da Galileia'], 0, 'O Mar Vermelho (Ex 14).']],
    [['Com o que Davi venceu Golias?', ['Uma espada', 'Uma funda e uma pedra', 'Um arco'], 1, 'Com uma funda e uma pedra (1Sm 17,49).'],
     ['Que profeta ungiu Davi como rei?', ['Samuel', 'Elias', 'Eliseu'], 0, 'Samuel (1Sm 16,13).']],
    [['Quem foi engolido por um grande peixe?', ['Daniel', 'Jonas', 'Elias'], 1, 'Jonas (Jn 2,1).'],
     ['Para onde Daniel foi lançado?', ['Para a fornalha', 'Para a prisão', 'Para a cova dos leões'], 2, 'Para a cova dos leões (Dn 6,17).']],
    [['Qual era a profissão de Pedro antes de seguir Jesus?', ['Pescador', 'Carpinteiro', 'Pastor'], 0, 'Pedro era pescador (Mt 4,18).'],
     ['Que discípulo só acreditou depois de ver Jesus ressuscitado?', ['João', 'Tomé', 'André'], 1, 'Tomé (Jo 20,24-29).'],
     ['Quem Jesus ressuscitou em Betânia?', ['Lázaro', 'Mateus', 'Filipe'], 0, 'Lázaro, irmão de Marta e Maria (Jo 11).']],
    [['Na parábola, quem cuidou do homem ferido?', ['O sacerdote', 'O levita', 'O samaritano'], 2, 'O samaritano (Lc 10,33-34).'],
     ['Quantos pães o menino ofereceu a Jesus?', ['Três', 'Cinco', 'Sete'], 1, 'Cinco pães e dois peixes (Jo 6,9).']],
    [['Quem ajudou Jesus a carregar a cruz?', ['Simão de Cirene', 'Pedro', 'Um soldado'], 0, 'Simão de Cirene (Lc 23,26).'],
     ['Quem a multidão pediu que fosse solto no lugar de Jesus?', ['Barrabás', 'Pilatos', 'Judas'], 0, 'Barrabás (Mt 27,21).']],
    [['Em que caminho Paulo encontrou Jesus?', ['De Belém', 'De Damasco', 'De Emaús'], 1, 'No caminho de Damasco (At 9,3).'],
     ['O que Lídia vendia?', ['Pães', 'Tecidos de púrpura', 'Peixes'], 1, 'Ela vendia púrpura (At 16,14).']]
  ]
};
