/* =========================================================
   puppets.js — Ilustrações demonstrativas de dedoches em feltro (SVG)
   ---------------------------------------------------------
   Cada personagem é descrito por um "look" (ver config.js).
   São ILUSTRAÇÕES do estilo, não fotos dos moldes finais.
   Para usar fotos reais, preencha os campos de imagem em config.js.
   ========================================================= */
(function () {
  const P = {
    blue: '#3D63A8', sky: '#8FB3DA', red: '#B5413A', wine: '#7E2E3A', green: '#4E7D5B',
    olive: '#8C8A4B', mustard: '#D9A845', brown: '#8A5A3B', tan: '#C9A27A', cream: '#EFE3CC',
    purple: '#6E4E8C', grey: '#8D8A86', orange: '#D9773E', teal: '#3E8A86', pink: '#D98C95',
    white: '#F7F2E8', gold: '#D4AF5A', navy: '#2A4372'
  };
  const HAIR = { dark: '#3B2A20', brown: '#6B4528', black: '#2A211C', auburn: '#8E4A2B', blond: '#D4A95A', grey: '#B9B3AB', white: '#ECE8E0' };
  const SKIN = { a: '#F4D2B4', b: '#E2AE86', c: '#B97B55', d: '#8A5638' };
  const col = (v, d) => (v ? P[v] || HAIR[v] || v : d);

  const TUBE = 'M30 204 L30 110 Q30 86 60 86 Q90 86 90 110 L90 204 Z';
  const STITCH = 'M35 199 L35 111 Q35 91 60 91 Q85 91 85 111 L85 199';

  /* Definições globais (filtro de textura de feltro + máscara do corpo) */
  function defs() {
    if (document.getElementById('pp-defs')) return;
    const d = document.createElement('div');
    d.innerHTML = `<svg id="pp-defs" width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <filter id="felt" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="4" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.8 0.48" result="na"/>
          <feComposite in="na" in2="d" operator="in" result="nt"/>
          <feMerge><feMergeNode in="d"/><feMergeNode in="nt"/></feMerge>
        </filter>
        <clipPath id="pp-tube"><path d="${TUBE}"/></clipPath>
      </defs></svg>`;
    document.body.prepend(d.firstChild);
  }

  const star = (cx, cy, r, fill) => {
    let pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
  };

  /* Itens que o personagem segura (mão direita em ~97,150) */
  function item(t) {
    switch (t) {
      case 'staff': return `<path d="M101 206 L101 98 Q101 80 88 83" stroke="#7A5232" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      case 'spear': return `<path d="M101 206 L101 70" stroke="#7A5232" stroke-width="3.5" stroke-linecap="round"/><polygon points="101,54 95,72 107,72" fill="#B9B6B0"/>`;
      case 'scroll': return `<g transform="translate(87 134)"><rect width="20" height="24" rx="2" fill="#F3E7CC"/><rect x="-2" y="-2" width="24" height="4.5" rx="2" fill="#B88A55"/><rect x="-2" y="21.5" width="24" height="4.5" rx="2" fill="#B88A55"/><path d="M4 7h12M4 12h12M4 17h8" stroke="#B9A27A" stroke-width="1.3"/></g>`;
      case 'gift': return `<g transform="translate(86 130)"><rect y="6" width="22" height="18" rx="2" fill="${P.gold}"/><rect x="-1" y="2" width="24" height="6" rx="1.5" fill="#E9CB7A"/><rect x="9" y="2" width="4" height="22" fill="${P.red}"/></g>`;
      case 'star': return star(100, 126, 11, P.gold);
      case 'sling': return `<path d="M97 150 Q110 170 103 187" stroke="#6B4A2E" stroke-width="1.8" fill="none"/><circle cx="103" cy="189" r="4.5" fill="#9B9590"/>`;
      case 'bread': return `<g transform="translate(82 136)"><path d="M0 8 Q13 24 26 8 Z" fill="#A8743F"/><ellipse cx="8" cy="7" rx="6" ry="4" fill="#E2B572"/><ellipse cx="17" cy="6" rx="6" ry="4" fill="#D9A55E"/><path d="M14 2 q6 -4 12 0 q-6 4 -12 0z" fill="${P.sky}"/></g>`;
      case 'key': return `<g transform="translate(92 120)" fill="${P.gold}"><circle cx="7" cy="6" r="6"/><circle cx="7" cy="6" r="2.5" fill="#fff" opacity=".7"/><rect x="5.5" y="10" width="3.5" height="24"/><rect x="9" y="27" width="6" height="3"/><rect x="9" y="31" width="4" height="3"/></g>`;
      case 'cross': return `<g fill="#8A5A3B"><rect x="98" y="110" width="5" height="50" rx="1.5"/><rect x="89" y="122" width="23" height="5" rx="1.5"/></g>`;
      case 'fish': return `<g transform="translate(86 140)"><path d="M0 8 Q10 -2 20 8 Q10 18 0 8Z" fill="${P.sky}"/><path d="M19 8 L27 2 L27 14Z" fill="${P.sky}"/><circle cx="6" cy="7" r="1.5" fill="#2A211C"/></g>`;
      case 'lamp': return `<g transform="translate(86 140)"><path d="M0 6 Q12 18 24 6 Z" fill="#C6874A"/><path d="M22 4 q4 -3 6 2" stroke="#C6874A" stroke-width="3" fill="none"/><path d="M2 2 q-2 -8 2 -12 q3 6 -2 12z" fill="#F3B13F"/></g>`;
      case 'heart': return `<path d="M100 146 C92 138 88 130 94 126 C98 123 100 127 100 129 C100 127 102 123 106 126 C112 130 108 138 100 146Z" fill="${P.red}"/>`;
      case 'jar': return `<g transform="translate(90 128)"><rect x="3" y="0" width="8" height="5" rx="1" fill="#C9A27A"/><path d="M1 5 Q-3 22 7 28 Q17 22 13 5Z" fill="#F4EEE2"/></g>`;
      case 'bag': return `<g transform="translate(88 140)"><path d="M3 6 Q-2 22 10 22 Q22 22 17 6Z" fill="#A87A45"/><path d="M4 6 Q10 0 16 6" stroke="#6B4A2E" stroke-width="2" fill="none"/></g>`;
      case 'tambourine': return `<g transform="translate(98 132)"><circle r="12" fill="#E6C996" stroke="#A87A45" stroke-width="3"/><circle cx="-8" cy="-8" r="2.5" fill="${P.gold}"/><circle cx="8" cy="-8" r="2.5" fill="${P.gold}"/><circle cx="0" cy="12" r="2.5" fill="${P.gold}"/></g>`;
      case 'branch': return `<g transform="translate(88 134)"><path d="M0 14 Q10 6 22 0" stroke="#6B7A3A" stroke-width="2" fill="none"/><ellipse cx="8" cy="7" rx="4" ry="2" fill="#7D9A4A" transform="rotate(-30 8 7)"/><ellipse cx="15" cy="3" rx="4" ry="2" fill="#7D9A4A" transform="rotate(-30 15 3)"/></g>`;
      default: return '';
    }
  }

  function animalHead(s, skin) {
    const t = s.animal;
    const eyes = (y = 66) => `<circle cx="51" cy="${y}" r="2.8" fill="#2A211C"/><circle cx="69" cy="${y}" r="2.8" fill="#2A211C"/><circle cx="52" cy="${y - 1}" r=".9" fill="#fff"/><circle cx="70" cy="${y - 1}" r=".9" fill="#fff"/>`;
    const head = (c) => `<circle cx="60" cy="68" r="26" fill="${c}"/>`;
    switch (t) {
      case 'sheep': {
        let wool = '';
        [[38, 50], [48, 42], [60, 39], [72, 42], [82, 50], [36, 62], [84, 62]].forEach(([x, y]) => (wool += `<circle cx="${x}" cy="${y}" r="9" fill="#FBF8F1"/>`));
        return `<ellipse cx="30" cy="70" rx="10" ry="5" fill="#E9D6C4" transform="rotate(-20 30 70)"/><ellipse cx="90" cy="70" rx="10" ry="5" fill="#E9D6C4" transform="rotate(20 90 70)"/>${head('#F1E3D1')}${wool}${eyes(70)}<path d="M56 80 Q60 84 64 80" stroke="#7A5A48" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
      }
      case 'ox':
        return `<path d="M40 52 Q24 48 22 32 Q32 42 44 44Z" fill="#F1E3C8"/><path d="M80 52 Q96 48 98 32 Q88 42 76 44Z" fill="#F1E3C8"/><ellipse cx="32" cy="64" rx="10" ry="5" fill="#7A4D31" transform="rotate(-15 32 64)"/><ellipse cx="88" cy="64" rx="10" ry="5" fill="#7A4D31" transform="rotate(15 88 64)"/>${head(skin)}${eyes(62)}<ellipse cx="60" cy="82" rx="16" ry="10" fill="#E3C9A8"/><circle cx="54" cy="82" r="2.2" fill="#6B4A2E"/><circle cx="66" cy="82" r="2.2" fill="#6B4A2E"/>`;
      case 'donkey':
        return `<ellipse cx="45" cy="34" rx="6.5" ry="19" fill="${skin}" transform="rotate(-16 45 34)"/><ellipse cx="45" cy="36" rx="3" ry="12" fill="#E3B3B0" transform="rotate(-16 45 36)"/><ellipse cx="75" cy="34" rx="6.5" ry="19" fill="${skin}" transform="rotate(16 75 34)"/><ellipse cx="75" cy="36" rx="3" ry="12" fill="#E3B3B0" transform="rotate(16 75 36)"/>${head(skin)}<path d="M52 44 q8 -6 16 0 q-8 6 -16 0z" fill="#5B5550"/>${eyes(64)}<ellipse cx="60" cy="82" rx="15" ry="10" fill="#DAD4CD"/><circle cx="55" cy="82" r="2" fill="#5B5550"/><circle cx="65" cy="82" r="2" fill="#5B5550"/>`;
      case 'dove':
        return `${head('#FBF8F1')}${eyes(66)}<polygon points="55,75 65,75 60,84" fill="#E39A3B"/>`;
      case 'giraffe':
        return `<path d="M48 46 L46 28" stroke="#C78F3A" stroke-width="4" stroke-linecap="round"/><circle cx="46" cy="27" r="4" fill="#8A5A3B"/><path d="M72 46 L74 28" stroke="#C78F3A" stroke-width="4" stroke-linecap="round"/><circle cx="74" cy="27" r="4" fill="#8A5A3B"/><ellipse cx="32" cy="58" rx="9" ry="4.5" fill="${skin}" transform="rotate(-25 32 58)"/><ellipse cx="88" cy="58" rx="9" ry="4.5" fill="${skin}" transform="rotate(25 88 58)"/>${head(skin)}<circle cx="44" cy="58" r="4" fill="#B5733A"/><circle cx="76" cy="54" r="3.5" fill="#B5733A"/>${eyes(64)}<ellipse cx="60" cy="82" rx="14" ry="9" fill="#F1D8A2"/><circle cx="55" cy="81" r="1.8" fill="#6B4A2E"/><circle cx="65" cy="81" r="1.8" fill="#6B4A2E"/>`;
      case 'bear':
        return `<circle cx="40" cy="46" r="10" fill="${skin}"/><circle cx="40" cy="46" r="5" fill="#C99A6E"/><circle cx="80" cy="46" r="10" fill="${skin}"/><circle cx="80" cy="46" r="5" fill="#C99A6E"/>${head(skin)}${eyes(64)}<ellipse cx="60" cy="80" rx="12" ry="9" fill="#D7B48A"/><ellipse cx="60" cy="77" rx="4.5" ry="3" fill="#3B2A20"/><path d="M56 84 Q60 87 64 84" stroke="#3B2A20" stroke-width="1.6" fill="none"/>`;
      case 'fish':
        return `<path d="M60 44 L50 28 L72 34Z" fill="#2E6798"/><path d="M34 70 L18 60 L20 82Z" fill="#2E6798"/><path d="M86 70 L102 60 L100 82Z" fill="#2E6798"/>${head(skin)}<circle cx="50" cy="64" r="7" fill="#fff"/><circle cx="70" cy="64" r="7" fill="#fff"/><circle cx="51" cy="65" r="3.5" fill="#2A211C"/><circle cx="71" cy="65" r="3.5" fill="#2A211C"/><ellipse cx="60" cy="82" rx="9" ry="5" fill="#2A4E78"/><circle cx="44" cy="78" r="3.5" fill="#E88E86" opacity=".5"/><circle cx="76" cy="78" r="3.5" fill="#E88E86" opacity=".5"/>`;
    }
    return head(skin);
  }

  const ANIMAL_BODY = { sheep: '#F6F1E7', ox: '#8A5A3B', donkey: '#9A948E', dove: '#F7F3EA', giraffe: '#E0B354', bear: '#7A5236', fish: '#3E7FB8' };

  function puppet(s = {}, o = {}) {
    const skin = SKIN[s.skin || 'b'];
    const isA = !!s.animal;
    const robe = isA ? ANIMAL_BODY[s.animal] : col(s.robe, P.tan);
    const hairC = col(s.hair, HAIR.dark);
    const filt = o.plain ? '' : ' filter="url(#felt)"';
    const lightStitch = 'rgba(255,255,255,.62)';
    let back = '', inBody = '', arms = '', headSvg = '', top = '';

    if (s.halo) back += `<circle cx="60" cy="64" r="35" fill="none" stroke="${P.gold}" stroke-width="4.5"/><circle cx="60" cy="64" r="35" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>`;
    if (s.wings || s.animal === 'dove') {
      const w = s.animal === 'dove' ? '#E9E4DA' : '#FFFFFF';
      back += `<path d="M34 112 Q2 92 6 140 Q12 162 34 152Z" fill="${w}"/><path d="M86 112 Q118 92 114 140 Q108 162 86 152Z" fill="${w}"/>
      <path d="M30 122 Q16 124 12 136 M30 134 Q18 138 16 148 M90 122 Q104 124 108 136 M90 134 Q102 138 104 148" stroke="#D9D2C4" stroke-width="1.4" fill="none"/>`;
    }
    if (s.item === 'staff' || s.item === 'spear') back += item(s.item);

    // ---- detalhes dentro do corpo
    if (s.stripes) {
      const cs = s.stripes.map((c) => col(c));
      cs.forEach((c, i) => (inBody += `<rect x="20" y="${92 + i * 23}" width="80" height="23" fill="${c}"/>`));
    }
    if (s.cloak) inBody += `<path d="M30 204 L30 110 Q30 88 50 86 L46 204Z M90 204 L90 110 Q90 88 70 86 L74 204Z" fill="${col(s.cloak)}"/>`;
    if (s.sash) inBody += `<path d="M24 116 L96 154 L96 166 L24 128Z" fill="${col(s.sash)}"/>`;
    if (s.belt) inBody += `<rect x="20" y="148" width="80" height="8" fill="${col(s.belt)}"/>`;
    if (s.collar) inBody += `<ellipse cx="60" cy="94" rx="30" ry="14" fill="${col(s.collar)}"/><ellipse cx="60" cy="92" rx="22" ry="8" fill="${robe}" opacity=".0"/><path d="M34 98 Q60 112 86 98" stroke="#fff" stroke-width="1.2" fill="none" stroke-dasharray="2 3" opacity=".7"/>`;
    if (s.baby) inBody += `<path d="M24 118 L96 168 M24 168 L96 118" stroke="#DCCBAA" stroke-width="7"/>`;
    if (s.armor) inBody += `<rect x="20" y="100" width="80" height="46" fill="#A7A39C"/><path d="M30 112h60M30 124h60M30 136h60" stroke="#8C8880" stroke-width="2"/>`;
    if (isA) {
      if (s.animal === 'giraffe') [[44, 120], [72, 130], [52, 160], [78, 172], [40, 186]].forEach(([x, y]) => (inBody += `<circle cx="${x}" cy="${y}" r="7" fill="#B5733A"/>`));
      else if (s.animal === 'fish') for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) inBody += `<path d="M${28 + c * 18 + (r % 2) * 9} ${112 + r * 18} q9 10 18 0" stroke="#7FB0DA" stroke-width="1.8" fill="none"/>`;
      else if (s.animal === 'sheep') for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) inBody += `<circle cx="${30 + c * 20 + (r % 2) * 10}" cy="${104 + r * 20}" r="7" fill="#fff" opacity=".7"/>`;
      else inBody += `<ellipse cx="60" cy="160" rx="18" ry="30" fill="#fff" opacity=".22"/>`;
    }
    inBody += `<rect x="20" y="192" width="80" height="14" fill="#000" opacity=".1"/>`;

    // ---- braços
    if (!isA && !s.baby) {
      const armC = s.cloak ? col(s.cloak) : s.armor ? '#A7A39C' : robe;
      arms = `<ellipse cx="27" cy="130" rx="7.5" ry="19" transform="rotate(14 27 130)" fill="${armC}"/><ellipse cx="93" cy="130" rx="7.5" ry="19" transform="rotate(-14 93 130)" fill="${armC}"/>`;
      if (s.item && s.item !== 'staff' && s.item !== 'spear') arms += item(s.item);
      arms += `<circle cx="23" cy="148" r="5.5" fill="${skin}"/><circle cx="97" cy="148" r="5.5" fill="${skin}"/>`;
    } else if (s.animal === 'dove' && s.item) arms += item(s.item);

    // ---- cabeça
    if (isA) {
      headSvg = animalHead(s, s.animal === 'ox' ? '#8A5A3B' : s.animal === 'donkey' ? '#9A948E' : s.animal === 'giraffe' ? '#E0B354' : s.animal === 'bear' ? '#7A5236' : s.animal === 'fish' ? '#3E7FB8' : skin);
    } else {
      const hs = s.hairStyle || (s.head === 'veil' ? 'none' : 'short');
      if (hs === 'long') headSvg += `<path d="M33 66 Q33 40 60 40 Q87 40 87 66 L89 110 Q79 115 74 102 L46 102 Q41 115 31 110 Z" fill="${hairC}"/>`;
      headSvg += `<circle cx="60" cy="68" r="${s.baby ? 23 : 26}" fill="${skin}"/>`;
      // rosto
      headSvg += `<circle cx="51" cy="70" r="2.7" fill="#2A211C"/><circle cx="69" cy="70" r="2.7" fill="#2A211C"/><circle cx="52" cy="69" r=".9" fill="#fff"/><circle cx="70" cy="69" r=".9" fill="#fff"/><circle cx="45.5" cy="77.5" r="4" fill="#E8867E" opacity=".45"/><circle cx="74.5" cy="77.5" r="4" fill="#E8867E" opacity=".45"/>`;
      if (!s.beard) headSvg += `<path d="M55 80 Q60 85 65 80" stroke="#7A3B2E" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
      // cabelo
      if (hs === 'short' || hs === 'long') headSvg += `<path d="M34 68 Q33 41 60 41 Q87 41 86 68 Q83 56 72 52 Q62 60 46 55 Q38 60 34 68Z" fill="${hairC}"/>`;
      if (hs === 'curly') [[38, 58], [44, 48], [53, 43], [63, 42], [73, 46], [81, 54], [84, 64], [36, 68]].forEach(([x, y]) => (headSvg += `<circle cx="${x}" cy="${y}" r="7.5" fill="${hairC}"/>`));
      if (hs === 'bald') headSvg += `<path d="M34 76 Q31 62 37 55 L41 76Z M86 76 Q89 62 83 55 L79 76Z" fill="${hairC}"/>`;
      // barba
      const bc = col(s.beardColor, hairC);
      if (s.beard === 'short') headSvg += `<path d="M36 72 Q36 97 60 99 Q84 97 84 72 Q80 84 72 86 Q66 81 60 83 Q54 81 48 86 Q40 84 36 72Z" fill="${bc}"/>`;
      if (s.beard === 'long') headSvg += `<path d="M36 72 Q33 106 60 122 Q87 106 84 72 Q80 84 72 86 Q66 81 60 83 Q54 81 48 86 Q40 84 36 72Z" fill="${bc}"/><path d="M52 96 Q56 106 54 114 M68 96 Q64 106 66 114" stroke="#000" stroke-width="1" opacity=".12" fill="none"/>`;
      // cobertura de cabeça
      const hc = col(s.headC, P.cream);
      if (s.head === 'veil') top += `<path d="M27 124 Q22 62 60 36 Q98 62 93 124 L84 124 Q86 66 60 50 Q34 66 36 124Z" fill="${col(s.veil, P.blue)}"/><path d="M38 120 Q37 70 60 54 Q83 70 82 120" stroke="${lightStitch}" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>`;
      if (s.head === 'cloth') top += `<path d="M29 104 Q24 60 60 38 Q96 60 91 104 L84 104 Q86 66 60 52 Q34 66 36 104Z" fill="${hc}"/><path d="M35 57 Q60 45 85 57" stroke="${col(s.band, P.brown)}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      if (s.head === 'nemes') top += `<path d="M28 108 Q22 58 60 38 Q98 58 92 108 L84 108 Q86 64 60 52 Q34 64 36 108Z" fill="${P.gold}"/><path d="M30 70h8M29 82h8M29 94h8M82 70h8M83 82h8M83 94h8M40 50 Q60 40 80 50" stroke="${P.navy}" stroke-width="3.5" fill="none"/>`;
      if (s.head === 'band') top += `<path d="M34 58 Q60 47 86 58" stroke="${hc}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      if (s.head === 'turban') top += `<path d="M32 62 Q29 32 60 31 Q91 32 88 62 Q60 50 32 62Z" fill="${hc}"/><path d="M36 52 Q60 40 84 52 M40 42 Q60 34 80 42" stroke="#000" stroke-width="1.2" opacity=".15" fill="none"/>`;
      if (s.head === 'crown') top += `<path d="M39 52 L39 34 L48 43 L54 29 L60 41 L66 29 L72 43 L81 34 L81 52 Z" fill="${P.gold}"/><circle cx="60" cy="47" r="3" fill="${P.red}"/><circle cx="47" cy="48" r="2.2" fill="${P.blue}"/><circle cx="73" cy="48" r="2.2" fill="${P.green}"/>`;
      if (s.head === 'helmet') top += `<path d="M32 66 Q32 36 60 36 Q88 36 88 66 L82 66 Q80 52 60 52 Q40 52 38 66Z" fill="#A7A39C"/><path d="M32 66 L34 84 L40 80 L38 64Z M88 66 L86 84 L80 80 L82 64Z" fill="#8F8B84"/>${s.crest ? `<path d="M40 40 Q60 12 80 40 Q60 30 40 40Z" fill="${P.red}"/>` : ''}`;
    }

    const label = o.title ? `<title>${o.title}</title>` : '';
    return `<svg class="pp" viewBox="0 0 120 214" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.title || 'Ilustração de dedoche'}">${label}
      <ellipse cx="60" cy="207" rx="34" ry="5" fill="#000" opacity=".12"/>
      <g${filt}>
        ${back}
        <path d="${TUBE}" fill="${robe}"/>
        <g clip-path="url(#pp-tube)">${inBody}</g>
        <path d="${STITCH}" stroke="${lightStitch}" stroke-width="1.3" stroke-dasharray="3.2 3" fill="none"/>
        ${arms}
        ${headSvg}
        ${top}
        ${s.item === 'star' && isA ? item('star') : ''}
      </g></svg>`;
  }

  /* Página de molde ilustrativa (mostra como é um molde em PDF) */
  function patternPage(name = 'Maria') {
    const dash = 'stroke="#8C6B46" stroke-width="1.6" stroke-dasharray="6 4" fill="none"';
    return `<svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exemplo ilustrativo de página de molde">
      <rect width="300" height="420" rx="6" fill="#FFFDF8"/>
      <rect x="14" y="14" width="272" height="44" rx="6" fill="#23457A"/>
      <text x="28" y="34" font-family="Fraunces, Georgia, serif" font-size="15" fill="#fff" font-weight="700">Molde 01 · ${name}</text>
      <text x="28" y="50" font-family="Nunito, sans-serif" font-size="9" fill="#E9D8B0">Coleção O Nascimento de Jesus</text>
      <text x="272" y="40" text-anchor="end" font-family="Nunito, sans-serif" font-size="9" fill="#fff">Imprimir em 100%</text>
      <path d="M40 300 L40 140 Q40 104 80 104 Q120 104 120 140 L120 300 Z" ${dash}/>
      <text x="80" y="210" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#6B6158" font-weight="700">CORPO</text>
      <text x="80" y="224" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" fill="#A3302B">corte 2x</text>
      <circle cx="210" cy="140" r="40" ${dash}/>
      <text x="210" y="138" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#6B6158" font-weight="700">CABEÇA</text>
      <text x="210" y="152" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" fill="#A3302B">corte 2x</text>
      <path d="M160 300 Q154 220 210 196 Q266 220 260 300 L246 300 Q248 232 210 214 Q172 232 174 300Z" ${dash}/>
      <text x="210" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#6B6158" font-weight="700">MANTO</text>
      <text x="210" y="284" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" fill="#A3302B">corte 1x</text>
      <ellipse cx="66" cy="350" rx="12" ry="26" ${dash}/><ellipse cx="102" cy="350" rx="12" ry="26" ${dash}/>
      <text x="84" y="392" text-anchor="middle" font-family="Nunito, sans-serif" font-size="9" fill="#6B6158" font-weight="700">BRAÇOS · corte 4x</text>
      <rect x="150" y="320" width="122" height="70" rx="6" fill="#F6EEDD"/>
      <text x="160" y="338" font-family="Nunito, sans-serif" font-size="9" fill="#2B2622" font-weight="700">Cores sugeridas</text>
      <circle cx="166" cy="356" r="7" fill="#3D63A8"/><circle cx="186" cy="356" r="7" fill="#F7F2E8" stroke="#ddd"/><circle cx="206" cy="356" r="7" fill="#E2AE86"/><circle cx="226" cy="356" r="7" fill="#D4AF5A"/>
      <text x="160" y="380" font-family="Nunito, sans-serif" font-size="8" fill="#6B6158">Feltro · costura à mão</text>
    </svg>`;
  }

  window.Puppets = { defs, puppet, patternPage, star, P };
})();
