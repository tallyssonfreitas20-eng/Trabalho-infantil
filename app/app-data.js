/* =========================================================
   app-data.js — CONFIGURAÇÃO E CONTEÚDO DO APP
   ========================================================= */
window.APP = {
  nome: 'Dedoches Bíblicos',

  /* LIBERAÇÃO DE CONTEÚDO
     O link de entrega de cada produto na Wiapy traz um código:
       Kit Premium ........ /app/#acesso=<código premium>
       A Bíblia em Cena ... /app/#acesso=<código cena>
     Aqui ficam só os "hashes" (impressões digitais) dos códigos.
     Os códigos verdadeiros NÃO ficam no site. */
  acessos: {
    basico: 'e9cf5518a77c0559c1f11691b465fac41c2cd3ba2ad491c29daa25a0ba1a9af8',
    premium: '46f95c1e78aa084031c045edf4aafbd767888bcce76db072894d13c8add0bda4',
    cena: '9d4324d646db5632c169be0e028b305c84f33e836d35acbc6da801c7eed141c3'
  },

  /* PDF com as 10 folhas completas */
  pdfFolhas: 'moldes/MOLDES_DEDOCHES_BIBLICOS.pdf',

  bonusCapas: ['img/bonus/bonus1.jpg', 'img/bonus/bonus2.jpg', 'img/bonus/bonus3.jpg', 'img/bonus/bonus4.jpg'],
  suporte: '',
  passos: ['img/passos/passo1.jpg', 'img/passos/passo2.jpg', 'img/passos/passo3.jpg', 'img/passos/passo4.jpg'],

  /* Resumo e pergunta para as crianças, por folha */
  historias: [
    ['Jesus nasceu em Belém e foi deitado numa manjedoura. Os animais lembram o cuidado de Deus com toda a criação, da arca de Noé à estrela que guiou os Magos.', 'Qual animal você colocaria perto do Menino Jesus? Por quê?'],
    ['Moisés, Davi, Elias, Daniel e Ester confiaram em Deus em momentos difíceis. Cada um mostra que a coragem nasce da fé.', 'Quando você precisa de coragem, a quem pode pedir ajuda?'],
    ['Rute ficou ao lado de Noemi, Ester arriscou a vida pelo seu povo e Neemias reconstruiu os muros de Jerusalém. Deus age por meio de pessoas fiéis.', 'Como você pode ser fiel a alguém, como Rute foi com Noemi?'],
    ['Salomão pediu a Deus sabedoria, Daniel foi protegido na cova dos leões e Zacarias e Isabel receberam a alegria do nascimento de João Batista.', 'Se você pudesse pedir uma coisa a Deus, como Salomão, o que pediria?'],
    ['Abraão confiou na promessa de Deus. Sua família cresceu com Isaque e Jacó, e José, vendido pelos irmãos, os perdoou no Egito.', 'Por que é importante perdoar, como José fez?'],
    ['Débora e Gideão guiaram o povo, Naamã foi curado quando obedeceu, e Ana e Simeão esperaram com fé até ver o Menino Jesus no Templo.', 'Como Ana e Simeão mostraram paciência e fé?'],
    ['Jesus curou doentes, chamou Zaqueu, devolveu a vida à filha de Jairo e a Lázaro. Cada milagre mostra o seu amor por cada pessoa.', 'Qual milagre de Jesus você gostaria de contar para alguém?'],
    ['No presépio estão Maria, José, os pastores, o anjo e os Magos que seguiram a estrela até Belém para adorar o Menino Jesus.', 'Quem recebeu primeiro a notícia do nascimento de Jesus?'],
    ['Depois da ressurreição de Jesus, Paulo, Barnabé, Lucas, Lídia, Priscila e Áquila levaram o Evangelho a muitas cidades.', 'Como você pode falar de Jesus a um amigo?'],
    ['Moisés guiou o povo para fora do Egito com Arão e Miriã. Josué e Calebe confiaram que Deus cumpriria a sua promessa.', 'O que significa confiar numa promessa de Deus?']
  ],

  /* QUIZ DA FÉ — [pergunta, [opções], índice da correta, explicação] por folha */
  quiz: [
    [['Em que cidade Jesus nasceu?', ['Nazaré', 'Belém', 'Jerusalém'], 1, 'Jesus nasceu em Belém (Lc 2,4-7).'],
     ['Qual anjo anunciou a Maria que ela seria a mãe de Jesus?', ['Gabriel', 'Miguel', 'Rafael'], 0, 'O anjo Gabriel (Lc 1,26-38).']],
    [['Com o que Davi venceu Golias?', ['Uma espada', 'Uma funda e uma pedra', 'Um arco'], 1, 'Com uma funda e uma pedra (1Sm 17,49).'],
     ['Qual rei pediu a Deus sabedoria para governar?', ['Salomão', 'Faraó', 'Saul'], 0, 'Salomão (1Rs 3,9).']],
    [['O que Rute prometeu a Noemi?', ['Voltar para a sua terra', 'Ficar com ela e seguir o seu Deus', 'Ir morar em Jerusalém sozinha'], 1, '"Aonde fores, irei" (Rt 1,16).'],
     ['Quem liderou a reconstrução dos muros de Jerusalém?', ['Neemias', 'Jonas', 'Sansão'], 0, 'Neemias (Ne 2,17-18).']],
    [['Quem visitou Salomão para conhecer a sua sabedoria?', ['A rainha de Sabá', 'Ester', 'Débora'], 0, 'A rainha de Sabá (1Rs 10,1).'],
     ['Quem eram os pais de João Batista?', ['Abraão e Sara', 'Zacarias e Isabel', 'José e Maria'], 1, 'Zacarias e Isabel (Lc 1,13).']],
    [['Qual filho de Jacó ganhou uma túnica especial do pai?', ['Benjamim', 'José', 'Isaque'], 1, 'José (Gn 37,3).'],
     ['Com quem Isaque se casou?', ['Raquel', 'Leia', 'Rebeca'], 2, 'Com Rebeca (Gn 24,67).']],
    [['Qual juíza atendia o povo debaixo de uma palmeira?', ['Rute', 'Débora', 'Ana'], 1, 'Débora (Jz 4,4-5).'],
     ['Quantas vezes Naamã mergulhou no rio Jordão?', ['Três', 'Sete', 'Dez'], 1, 'Sete vezes (2Rs 5,14).']],
    [['Em que árvore Zaqueu subiu para ver Jesus?', ['Oliveira', 'Figueira', 'Sicômoro'], 2, 'Num sicômoro (Lc 19,4).'],
     ['Quem Jesus ressuscitou em Betânia?', ['Lázaro', 'Jairo', 'Bartimeu'], 0, 'Lázaro, irmão de Marta e Maria (Jo 11).']],
    [['O que guiou os Magos até Jesus?', ['Um anjo', 'Uma estrela', 'Um pastor'], 1, 'Uma estrela (Mt 2,9-10).'],
     ['Que presentes os Magos ofereceram?', ['Ouro, incenso e mirra', 'Pão, vinho e azeite', 'Ovelhas e cordeiros'], 0, 'Ouro, incenso e mirra (Mt 2,11).']],
    [['O que Lídia vendia?', ['Peixes', 'Tecidos de púrpura', 'Pães'], 1, 'Púrpura (At 16,14).'],
     ['Qual era o trabalho de Priscila e Áquila?', ['Pescadores', 'Fabricantes de tendas', 'Pastores'], 1, 'Faziam tendas, como Paulo (At 18,3).']],
    [['Quem pegou o pandeiro e cantou depois da travessia do mar?', ['Miriã', 'Ester', 'Sara'], 0, 'Miriã, irmã de Arão (Ex 15,20).'],
     ['Quais espiões confiaram que o povo podia entrar na terra prometida?', ['Josué e Calebe', 'Arão e Moisés', 'Balaão e Jó'], 0, 'Josué e Calebe (Nm 14,6-9).']]
  ]
};
