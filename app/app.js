/* =========================================================
   app.js — App "Dedoches Bíblicos" (PWA gamificado)
   Progresso salvo no próprio aparelho (localStorage).
   ========================================================= */
(function () {
  const C = window.CONFIG, A = window.APP, PP = window.Puppets;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const brl = (v) => (+v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  PP.defs();

  const CAT = window.CATALOGO;
  const COLS = CAT.map((f) => ({ titulo: f.titulo, personagens: f.itens.map((i) => [i[0], {}]) }));
  const pad = (n) => String(n).padStart(2, '0');
  const cellOf = (ci, pi) => `moldes/cells/f${pad(CAT[ci].folha)}_${pad(pi + 1)}.jpg`;
  const refOf = (ci, pi) => CAT[ci].itens[pi][1];
  const ALL = [];
  COLS.forEach((c, ci) => c.personagens.forEach((p, pi) => ALL.push({ id: `c${ci}p${pi}`, ci, pi, name: p[0], look: p[1] })));
  const byId = Object.fromEntries(ALL.map((x) => [x.id, x]));
  const COL_COLORS = CAT.map((f) => f.cor);
  const COL_ICONS = CAT.map((f) => f.icone);
  const COL_BADGES = ['Natal Feito à Mão', 'Coragem de Herói', 'Fidelidade de Rute', 'Coroa de Sabedoria', 'Família de Abraão', 'Voz dos Profetas', 'Testemunha dos Milagres', 'Presépio Completo', 'Igreja Viva', 'Terra Prometida'];

  /* ---------------- Estado ---------------- */
  const KEY = 'dedoches-app-v1';
  const blank = () => ({ name: '', goal: '', onboarded: false, xp: 0, steps: {}, done: {}, quiz: {}, stitches: {}, badges: {}, streak: 0, lastDay: '', daily: { day: '', steps: 0, quiz: 0, story: 0, claimed: false }, atelier: { feitos: 0, vendidos: 0, preco: 70, custo: 8, meta: 10 } });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || 'null') || {}); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const today = () => new Date().toISOString().slice(0, 10);

  /* ---------------- Níveis ---------------- */
  const LEVELS = [
    ['Aprendiz de Feltro', 0], ['Costureira Iniciante', 120], ['Artesã da Fé', 350], ['Contadora de Histórias', 700],
    ['Mestra dos Dedoches', 1200], ['Guardiã do Presépio', 2000], ['Missionária do Feltro', 3200]
  ];
  const levelOf = (xp) => { let i = 0; LEVELS.forEach((l, k) => { if (xp >= l[1]) i = k; }); return i; };

  /* ---------------- Mascote (SVG) ---------------- */
  function mascot(mood = 'happy', cls = '') {
    const mouth = {
      happy: '<path d="M72 92 Q80 100 88 92" stroke="#7A3B2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      wow: '<ellipse cx="80" cy="94" rx="6" ry="7" fill="#7A3B2E"/><ellipse cx="80" cy="97" rx="3.5" ry="3" fill="#E8867E"/>',
      think: '<path d="M74 95 Q80 92 87 94" stroke="#7A3B2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      wave: '<path d="M70 91 Q80 103 90 91 Z" fill="#7A3B2E"/><path d="M74 96 Q80 100 86 96" fill="#E8867E"/>'
    }[mood] || '';
    const eyes = mood === 'wow'
      ? '<g class="eyes"><circle cx="68" cy="78" r="5" fill="#2A211C"/><circle cx="92" cy="78" r="5" fill="#2A211C"/><circle cx="70" cy="76" r="1.8" fill="#fff"/><circle cx="94" cy="76" r="1.8" fill="#fff"/></g>'
      : mood === 'happy' || mood === 'wave'
        ? '<g class="eyes"><path d="M63 79 Q68 73 73 79" stroke="#2A211C" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M87 79 Q92 73 97 79" stroke="#2A211C" stroke-width="3" fill="none" stroke-linecap="round"/></g>'
        : '<g class="eyes"><circle cx="69" cy="76" r="4" fill="#2A211C"/><circle cx="93" cy="76" r="4" fill="#2A211C"/><circle cx="70.5" cy="74.5" r="1.3" fill="#fff"/><circle cx="94.5" cy="74.5" r="1.3" fill="#fff"/></g>';
    let wool = '';
    [[56, 50], [66, 41], [80, 37], [94, 41], [104, 50], [50, 62], [110, 62]].forEach(([x, y]) => (wool += `<circle cx="${x}" cy="${y}" r="12" fill="#FFFDF7"/>`));
    let bodyWool = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) bodyWool += `<circle cx="${52 + c * 19 + (r % 2) * 9}" cy="${142 + r * 16}" r="7" fill="#fff" opacity=".75"/>`;
    const armR = mood === 'wave'
      ? '<g class="arm-wave"><ellipse cx="128" cy="118" rx="9" ry="20" transform="rotate(-38 128 118)" fill="#F6F0E4"/><circle cx="138" cy="102" r="7" fill="#F3DCC2"/></g>'
      : mood === 'think'
        ? '<ellipse cx="112" cy="122" rx="9" ry="19" transform="rotate(28 112 122)" fill="#F6F0E4"/><circle cx="100" cy="104" r="7" fill="#F3DCC2"/>'
        : '<ellipse cx="126" cy="140" rx="9" ry="20" transform="rotate(-14 126 140)" fill="#F6F0E4"/><circle cx="130" cy="158" r="7" fill="#F3DCC2"/>';
    const extra = mood === 'wow' ? `<g class="m-stars">${PP.star(24, 40, 9, '#E9C979')}${PP.star(140, 34, 7, '#E9C979')}${PP.star(146, 70, 5, '#F1D58E')}</g>` : mood === 'think' ? '<g class="m-think"><circle cx="128" cy="40" r="5" fill="#fff" opacity=".9"/><circle cx="140" cy="26" r="8" fill="#fff" opacity=".9"/><text x="140" y="30" font-size="11" text-anchor="middle" fill="#23457A" font-weight="800">?</text></g>' : '';
    return `<svg class="mascot m-${mood} ${cls}" viewBox="0 0 160 210" role="img" aria-label="Lãzinha, a ovelhinha de feltro">
      <ellipse cx="80" cy="204" rx="40" ry="5" fill="#000" opacity=".12"/>
      <g filter="url(#felt)">
        <g class="m-body">
          <path d="M42 202 L42 136 Q42 108 80 108 Q118 108 118 136 L118 202 Z" fill="#F6F0E4"/>
          <clipPath id="mclip"><path d="M42 202 L42 136 Q42 108 80 108 Q118 108 118 136 L118 202 Z"/></clipPath>
          <g clip-path="url(#mclip)">${bodyWool}<rect x="40" y="190" width="80" height="14" fill="#000" opacity=".08"/></g>
          <path d="M47 198 L47 137 Q47 113 80 113 Q113 113 113 137 L113 198" stroke="#C9A45C" stroke-width="1.6" stroke-dasharray="3.5 3" fill="none"/>
          <ellipse cx="34" cy="140" rx="9" ry="20" transform="rotate(14 34 140)" fill="#F6F0E4"/><circle cx="30" cy="158" r="7" fill="#F3DCC2"/>
          ${armR}
          <path d="M50 116 Q80 132 110 116 L108 126 Q80 140 52 126 Z" fill="#3D63A8"/>
          <path d="M54 121 Q80 134 106 121" stroke="#fff" stroke-width="1.2" stroke-dasharray="2.5 2.5" fill="none" opacity=".8"/>
          <path d="M92 128 L100 152 L90 150 Z" fill="#3D63A8"/>
          <g fill="#D4AF5A"><rect x="77.5" y="128" width="5" height="16" rx="1.2"/><rect x="73" y="132" width="14" height="5" rx="1.2"/></g>
        </g>
        <g class="m-head">
          <ellipse cx="40" cy="78" rx="16" ry="8" transform="rotate(-24 40 78)" fill="#E9D6C4"/><ellipse cx="41" cy="78" rx="9" ry="4" transform="rotate(-24 41 78)" fill="#EBA9A4"/>
          <ellipse cx="120" cy="78" rx="16" ry="8" transform="rotate(24 120 78)" fill="#E9D6C4"/><ellipse cx="119" cy="78" rx="9" ry="4" transform="rotate(24 119 78)" fill="#EBA9A4"/>
          <ellipse cx="80" cy="80" rx="34" ry="32" fill="#F3DCC2"/>
          ${wool}
          ${eyes}
          <circle cx="60" cy="90" r="5.5" fill="#E8867E" opacity=".5"/><circle cx="100" cy="90" r="5.5" fill="#E8867E" opacity=".5"/>
          <ellipse cx="80" cy="86" rx="4" ry="2.6" fill="#B87566"/>
          ${mouth}
          <path d="M50 80 Q50 112 80 112 Q110 112 110 80" stroke="#C9A45C" stroke-width="1.3" stroke-dasharray="3 3" fill="none" opacity=".7"/>
        </g>
      </g>
      ${extra}
    </svg>`;
  }

  /* ---------------- Utilidades de UI ---------------- */
  function toast(html) {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html;
    $('#toasts').appendChild(t); setTimeout(() => t.classList.add('out'), 1900); setTimeout(() => t.remove(), 2400);
  }
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fx = $('#fx'), cols = ['#A3302B', '#3D63A8', '#D4AF5A', '#4E7D5B', '#F1D58E', '#fff'];
    for (let i = 0; i < 46; i++) {
      const s = document.createElement('span');
      s.className = 'cf' + (i % 7 === 0 ? ' cf-x' : '');
      if (i % 7 === 0) s.textContent = i % 2 ? '✝' : '✦';
      s.style.cssText = `--x:${Math.random() * 100}vw;--r:${Math.random() * 720 - 360}deg;--d:${1.6 + Math.random() * 1.4}s;--dl:${Math.random() * .3}s;background:${i % 7 ? cols[i % cols.length] : 'transparent'};color:${cols[i % 3 + 2]}`;
      fx.appendChild(s); setTimeout(() => s.remove(), 3400);
    }
  }
  function modal(html, onClose) {
    const m = $('#modal'); m.innerHTML = `<div class="mbox" role="dialog" aria-modal="true">${html}</div>`; m.hidden = false;
    const close = () => { m.hidden = true; m.innerHTML = ''; onClose && onClose(); };
    m.onclick = (e) => { if (e.target === m || e.target.closest('[data-close]')) close(); };
    return close;
  }
  function vibrate(ms = 18) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }

  /* ---------------- XP, níveis, missões e conquistas ---------------- */
  function addXP(n, why) {
    const before = levelOf(S.xp); S.xp += n; save();
    toast(`<b>+${n} XP</b> ${esc(why || '')}`); vibrate();
    const after = levelOf(S.xp);
    if (after > before) setTimeout(() => {
      confetti();
      modal(`${mascot('wow', 'm-big')}<p class="kick">Subiu de nível!</p><h2>${LEVELS[after][0]}</h2><p>Que alegria, ${esc(S.name || 'artesã')}! Cada ponto que você dá é uma história de fé ganhando vida.</p><button class="btn btn-red" data-close>Continuar</button>`);
    }, 500);
    renderTop();
  }
  function ensureDay() {
    const d = today();
    if (S.daily.day !== d) S.daily = { day: d, steps: 0, quiz: 0, story: 0, claimed: false };
    if (S.lastDay !== d) {
      const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      S.streak = S.lastDay === y ? S.streak + 1 : 1; S.lastDay = d; save();
      if (S.onboarded) setTimeout(() => addXP(5, 'por voltar hoje'), 800);
    }
  }
  const MISSIONS = [['steps', 3, 'Marque 3 passos de costura', '🧵'], ['quiz', 1, 'Acerte 1 pergunta do Quiz da Fé', '📖'], ['story', 1, 'Abra a história de um personagem', '🕊️']];
  const bump = (k) => { ensureDay(); S.daily[k] = (S.daily[k] || 0) + 1; save(); };

  const doneCount = () => Object.keys(S.done).length;
  const colDone = (ci) => COLS[ci].personagens.every((_, pi) => S.done[`c${ci}p${pi}`]);
  const quizRight = () => Object.values(S.quiz).filter(Boolean).length;
  const QUIZ_TOTAL = A.quiz.reduce((a, q) => a + q.length, 0);
  const BADGES = [
    ['primeiro-ponto', '🪡', 'Primeiro Ponto', 'Marcou o primeiro passo', () => Object.keys(S.steps).length > 0],
    ['primeiro', '🐑', 'Primeiro Dedoche', 'Concluiu 1 personagem', () => doneCount() >= 1],
    ['cinco', '🧺', 'Mãos à Obra', 'Concluiu 5 personagens', () => doneCount() >= 5],
    ['vinte', '🎨', 'Ateliê Animado', 'Concluiu 20 personagens', () => doneCount() >= 20],
    ['cinquenta', '🏅', 'Meio Caminho', 'Concluiu 50 personagens', () => doneCount() >= 50],
    ['cem', '👑', 'Coleção Completa', 'Concluiu os 100 moldes', () => doneCount() >= 100],
    ...COLS.map((c, ci) => [`col${ci}`, COL_ICONS[ci], COL_BADGES[ci], `Folha ${CAT[ci].folha} · ${c.titulo}`, () => colDone(ci)]),
    ['quiz5', '📖', 'Ouvinte da Palavra', 'Acertou 5 perguntas', () => quizRight() >= 5],
    ['quizall', '🎓', 'Sabedoria', 'Acertou todo o Quiz da Fé', () => quizRight() >= QUIZ_TOTAL],
    ['pontos', '✂️', 'Escola de Pontos', 'Praticou os 3 pontos', () => Object.keys(S.stitches).length >= 3],
    ['streak3', '🔥', 'Constância', '3 dias seguidos', () => S.streak >= 3],
    ['streak7', '🕯️', 'Perseverança', '7 dias seguidos', () => S.streak >= 7],
    ['venda1', '💰', 'Primeira Venda', 'Registrou 1 kit vendido', () => S.atelier.vendidos >= 1],
    ['venda10', '🏪', 'Lojinha da Fé', 'Registrou 10 kits vendidos', () => S.atelier.vendidos >= 10]
  ];
  function checkBadges() {
    const fresh = BADGES.filter((b) => !S.badges[b[0]] && b[4]());
    fresh.forEach((b) => (S.badges[b[0]] = today()));
    if (fresh.length) {
      save(); const b = fresh[fresh.length - 1];
      setTimeout(() => { confetti(); modal(`<div class="badge-big">${b[1]}</div><p class="kick">Nova conquista!</p><h2>${esc(b[2])}</h2><p>${esc(b[3])}</p><button class="btn btn-red" data-close>Amém! Continuar</button>`); }, 700);
    }
  }

  /* ---------------- Visual do personagem ---------------- */
  const avatar = (x) => `<img src="${esc(cellOf(x.ci, x.pi))}" alt="" class="av-cell" loading="lazy">`;
  const palette = (look) => {
    const keys = ['robe', 'cloak', 'veil', 'sash', 'headC', 'hair'];
    const set = []; keys.forEach((k) => { const v = look[k]; if (v && !set.includes(v)) set.push(v); });
    const P = PP.P, H = { dark: '#3B2A20', brown: '#6B4528', black: '#2A211C', auburn: '#8E4A2B', blond: '#D4A95A', grey: '#B9B3AB', white: '#ECE8E0' };
    const nameOf = { blue: 'Azul', sky: 'Azul-claro', red: 'Vermelho', wine: 'Vinho', green: 'Verde', olive: 'Oliva', mustard: 'Mostarda', brown: 'Marrom', tan: 'Bege', cream: 'Creme', purple: 'Roxo', grey: 'Cinza', orange: 'Laranja', teal: 'Verde-água', pink: 'Rosa', white: 'Branco', gold: 'Dourado', navy: 'Azul-marinho', dark: 'Castanho', black: 'Preto', auburn: 'Ruivo', blond: 'Loiro' };
    const out = set.slice(0, 4).map((v) => [P[v] || H[v] || v, nameOf[v] || v]);
    if (!look.animal) out.push(['#E2AE86', 'Pele']);
    return out;
  };

  /* ---------------- Barra superior ---------------- */
  function renderTop() {
    const li = levelOf(S.xp), cur = LEVELS[li][1], nxt = LEVELS[li + 1] ? LEVELS[li + 1][1] : cur + 1000;
    const pct = Math.min(100, ((S.xp - cur) / (nxt - cur)) * 100);
    $('#top').innerHTML = `
      <div class="lvl"><span class="lvl-n">${li + 1}</span><div><b>${LEVELS[li][0]}</b><div class="xpbar"><i style="width:${pct}%"></i></div><small>${S.xp} XP · faltam ${Math.max(0, nxt - S.xp)} para o próximo nível</small></div></div>
      <div class="chips"><span title="Dias seguidos">🔥 ${S.streak}</span><span title="Dedoches concluídos">🐑 ${doneCount()}</span></div>`;
  }

  /* ---------------- Telas ---------------- */
  const next = () => ALL.find((x) => !S.done[x.id]) || ALL[0];
  const TIPS = {
    ensinar: 'Dica para a catequese: comece pelo Presépio e use os dedoches na hora de contar a história. As crianças lembram muito mais!',
    familia: 'Dica para a família: deixe as crianças escolherem o próximo personagem. Fazer junto já é um momento de fé.',
    vender: 'Dica para vender: termine um kit completo antes de anunciar. Foto bonita do kit pronto vende mais que peça solta!'
  };
  const goalTip = () => TIPS[S.goal] || 'Um passo de cada vez: hoje, um personagem. Amanhã, outro. Em pouco tempo você terá um presépio inteiro!';

  function daysToChristmas() { const n = new Date(), y = n.getMonth() === 11 && n.getDate() > 25 ? n.getFullYear() + 1 : n.getFullYear(); return Math.ceil((new Date(y, 11, 25) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5); }

  function renderHome() {
    ensureDay();
    const n = next(), d = S.daily, allOk = MISSIONS.every(([k, t]) => (d[k] || 0) >= t);
    const presepio = COLS[7].personagens.filter((_, pi) => S.done[`c7p${pi}`]).length, dx = daysToChristmas();
    const pct = doneCount();
    $('#view').innerHTML = `
      <section class="hello">
        <div class="hello-m">${mascot(S.daily.claimed ? 'wow' : 'wave')}</div>
        <div class="bubble"><b>Olá, ${esc(S.name || 'artesã')}!</b><p>${esc(goalTip())}</p></div>
      </section>

      <section class="card next-card">
        <p class="kick">Continue de onde parou</p>
        <div class="next-row"><div class="next-av">${avatar(n)}</div>
          <div><b>${esc(n.name)}</b><span>Folha ${CAT[n.ci].folha} · ${esc(COLS[n.ci].titulo)}</span>
          <div class="mini-steps">${[0, 1, 2, 3, 4].map((k) => `<i class="${S.steps[n.id + '-' + k] ? 'on' : ''}"></i>`).join('')}</div></div></div>
        <button class="btn btn-red btn-block" data-open="${n.id}">Fazer agora · +80 XP</button>
      </section>

      <section class="card">
        <div class="row-sb"><p class="kick">Missões de hoje</p><span class="pill">${MISSIONS.filter(([k, t]) => (d[k] || 0) >= t).length}/3</span></div>
        ${MISSIONS.map(([k, t, label, ic]) => { const v = Math.min(t, d[k] || 0); return `<div class="mission ${v >= t ? 'ok' : ''}"><span class="mi">${ic}</span><div><b>${label}</b><div class="mbar"><i style="width:${(v / t) * 100}%"></i></div></div><span class="mv">${v >= t ? '✓' : `${v}/${t}`}</span></div>`; }).join('')}
        <button class="btn ${allOk && !d.claimed ? 'btn-gold glow' : 'btn-ghost'} btn-block" id="claim" ${allOk && !d.claimed ? '' : 'disabled'}>${d.claimed ? 'Bênção do dia recebida ✓' : 'Receber bênção do dia · +40 XP'}</button>
      </section>

      <section class="card xmas">
        <div class="xm-star">${PP.star(30, 30, 26, '#F1D58E').replace('<polygon', '<svg viewBox="0 0 60 60"><polygon') + '</svg>'}</div>
        <div><p class="kick light">Especial de Natal</p><b>${dx === 0 ? 'Feliz Natal!' : `Faltam ${dx} dias para o Natal`}</b>
        <span>Seu presépio de dedoches: ${presepio}/10 personagens</span><div class="xbar"><i style="width:${(presepio / 10) * 100}%"></i></div></div>
      </section>

      <section class="grid2">
        <div class="card stat"><div class="ring" style="--p:${pct}"><span>${pct}</span></div><b>de 100 dedoches</b></div>
        <div class="card stat"><div class="big">${COLS.filter((_, ci) => colDone(ci)).length}<small>/10</small></div><b>coleções completas</b></div>
      </section>

      <section class="grid2">
        <button class="card tile" data-tab="escola"><span>✂️</span><b>Escola de Pontos</b><small>3 pontos básicos</small></button>
        <button class="card tile" data-tab="escola" data-goto="quiz"><span>📖</span><b>Quiz da Fé</b><small>${quizRight()}/${QUIZ_TOTAL} acertos</small></button>
      </section>`;
    const cl = $('#claim'); if (cl && !cl.disabled) cl.onclick = () => { S.daily.claimed = true; save(); confetti(); addXP(40, 'bênção do dia'); renderHome(); };
  }

  function renderPath() {
    const cur = next().id;
    $('#view').innerHTML = `<h1 class="ttl">Trilha dos 100 Dedoches</h1><p class="sub">Toque num personagem para abrir o passo a passo. Todos estão liberados, a ordem é só uma sugestão.</p>` +
      COLS.map((c, ci) => {
        const n = c.personagens.length, ok = c.personagens.filter((_, pi) => S.done[`c${ci}p${pi}`]).length;
        return `<section class="unit" style="--uc:${COL_COLORS[ci]}">
          <header class="unit-h"><div><small>Folha ${CAT[ci].folha} de 10</small><b>${esc(c.titulo)}</b><div class="ubar"><i style="width:${(ok / n) * 100}%"></i></div></div><span class="u-ic">${colDone(ci) ? '🏆' : COL_ICONS[ci]}</span><em>${ok}/${n}</em></header>
          <div class="nodes">${c.personagens.map((p, pi) => {
            const id = `c${ci}p${pi}`, x = byId[id], dn = S.done[id], st = [0, 1, 2, 3, 4].filter((k) => S.steps[id + '-' + k]).length;
            const off = Math.round(Math.sin(pi * 0.9) * 32);
            return `<button class="node ${dn ? 'done' : ''} ${id === cur ? 'cur' : ''}" style="--off:${off}%;--st:${st * 72}deg" data-open="${id}" aria-label="${esc(p[0])}${dn ? ' (concluído)' : ''}">
              <span class="node-av">${avatar(x)}</span>${dn ? '<span class="node-ok">✓</span>' : ''}<span class="node-n">${esc(p[0].replace(/ \(.*\)/, ''))}</span>
              ${id === cur ? `<span class="here">${mascot('happy')}</span>` : ''}</button>`;
          }).join('')}</div></section>`;
      }).join('');
    const c = $('.node.cur'); if (c) setTimeout(() => c.scrollIntoView({ block: 'center', behavior: 'smooth' }), 120);
  }

  /* ---------------- Lição (passo a passo) ---------------- */
  const STEPS = [
    ['Separe os materiais', null, ['Feltro nas cores indicadas no molde', 'Linha de costura ou de bordado', 'Agulha de mão e alfinetes', 'Tesoura bem afiada', 'Giz ou caneta para tecido', 'Enchimento e cola de tecido (opcionais)'], 'Guarde os retalhos! Pedacinhos que sobram viram rostos, cabelos e detalhes.'],
    ['Imprima o molde', 0, ['Abra a página do personagem no PDF', 'Imprima em tamanho real (100%), sem "ajustar à página"', 'Recorte as peças de papel'], 'Antes de cortar o feltro, encoste o molde do corpo no dedo de quem vai usar para conferir o tamanho.'],
    ['Recorte o feltro', 1, ['Prenda o molde no feltro com alfinetes', 'Contorne com giz e corte por dentro da linha', 'Corte a quantidade indicada de cada peça (1x, 2x…)'], 'Nas curvas, corte com a pontinha da tesoura, girando o feltro. Fica bem redondinho!'],
    ['Monte e costure', 2, ['Aplique primeiro o rosto e o cabelo', 'Depois as roupas e os acessórios', 'Una frente e costas com ponto caseado, deixando a base aberta para o dedo'], 'Comece a costura pelo lado de dentro: assim o nó fica escondido.'],
    ['Finalize e conte a história', 3, ['Borde ou cole os olhinhos e a boca', 'Teste no dedo e dê o acabamento', 'Leia a passagem e conte a história!'], 'Pronto! Agora chame as crianças: o personagem está esperando para entrar em cena.']
  ];

  function openLesson(id) {
    const x = byId[id], cell = cellOf(x.ci, x.pi), ref = refOf(x.ci, x.pi), h = A.historias[x.ci] || ['', ''], printUrl = `imprimir.html#f${pad(CAT[x.ci].folha)}_${pad(x.pi + 1)}`;
    bump('story'); renderTop();
    const sh = $('#sheet');
    const body = () => {
      const stepsDone = STEPS.map((_, k) => !!S.steps[id + '-' + k]), nDone = stepsDone.filter(Boolean).length;
      return `
      <header class="sh-h"><button class="ic-btn" data-x aria-label="Voltar">←</button><div><small>Folha ${CAT[x.ci].folha} · ${esc(COLS[x.ci].titulo)}</small><b>${esc(x.name)}</b></div><span class="sh-xp">${nDone}/5</span></header>
      <div class="sh-body">
        <div class="mold-card" style="--uc:${COL_COLORS[x.ci]}">
          <button class="mold-img" data-zoom="${esc(cell)}" aria-label="Ampliar o molde de ${esc(x.name)}"><img src="${esc(cell)}" alt="Molde de ${esc(x.name)}"><span>🔍 Ampliar</span></button>
          ${S.done[id] ? '<span class="done-stamp">Concluído ✓</span>' : ''}
          <div class="mold-info"><p class="kick">Molde ${String(x.ci * 10 + x.pi + 1).padStart(3, '0')} · Folha ${CAT[x.ci].folha}</p><b>${esc(x.name)}</b><span>📖 ${esc(ref)}</span>
            <a class="btn btn-red btn-block" href="${esc(printUrl)}" target="_blank" rel="noopener">🖨️ Imprimir este molde</a>
</div>
        </div>

        <div class="prog"><div class="pbar"><i style="width:${nDone * 20}%"></i></div><span>${nDone === 5 ? 'Tudo pronto!' : `Passo ${Math.min(5, nDone + 1)} de 5`}</span></div>
        <ol class="lsteps">${STEPS.map(([t, img, items, tip], k) => `
          <li class="ls ${stepsDone[k] ? 'ok' : ''} ${!stepsDone[k] && stepsDone.slice(0, k).every(Boolean) ? 'now' : ''}">
            <div class="ls-h"><span class="ls-n">${stepsDone[k] ? '✓' : k + 1}</span><b>${t}</b></div>
            <div class="ls-b">
              ${img !== null && A.passos[img] ? `<img class="ls-img" src="${esc(A.passos[img])}" alt="Exemplo: ${t}" loading="lazy">` : ''}
              <ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
              <div class="tip">${mascot('happy', 'm-tiny')}<p><b>Dica da Lãzinha:</b> ${esc(tip)}</p></div>
              <button class="btn ${stepsDone[k] ? 'btn-ghost' : 'btn-green'} btn-block" data-step="${k}">${stepsDone[k] ? 'Feito ✓ (toque para desmarcar)' : 'Marcar como feito · +10 XP'}</button>
            </div></li>`).join('')}</ol>

        <div class="card story" style="--uc:${COL_COLORS[x.ci]}">
          <p class="kick">Hora da história</p>
          <p class="ref">📖 ${esc(ref)}</p>
          <p>${esc(h[0])}</p>
          <div class="ask"><b>Pergunte às crianças:</b> ${esc(h[1])}</div>
        </div>
      </div>`;
    };
    const paint = () => {
      sh.innerHTML = body();
      $$('[data-x]', sh).forEach((b) => (b.onclick = closeSheet));
      $$('[data-step]', sh).forEach((b) => (b.onclick = () => {
        const k = +b.dataset.step, key = id + '-' + k;
        if (S.steps[key]) { delete S.steps[key]; save(); paint(); return; }
        S.steps[key] = 1; bump('steps'); addXP(10, STEPS[k][0].toLowerCase());
        if (STEPS.every((_, j) => S.steps[id + '-' + j]) && !S.done[id]) {
          S.done[id] = today(); save(); confetti();
          setTimeout(() => { addXP(30, 'dedoche concluído'); modal(`${mascot('wow', 'm-big')}<p class="kick">Dedoche concluído!</p><h2>${esc(x.name)} ganhou vida!</h2><p>${esc(h[1])}</p><div class="mbtns"><button class="btn btn-ghost" data-close>Ficar aqui</button><button class="btn btn-red" data-close data-next>Próximo personagem →</button></div>`); $('[data-next]') && ($('[data-next]').onclick = () => { setTimeout(() => openLesson(next().id), 50); }); checkBadges(); }, 350);
        }
        save(); checkBadges(); const sc = sh.scrollTop; paint(); sh.scrollTop = sc;
      }));
      $$('[data-zoom]', sh).forEach((b) => (b.onclick = () => modal(`<img class="zoom" src="${esc(b.dataset.zoom)}" alt="Molde de ${esc(x.name)}"><button class="btn btn-ghost" data-close>Fechar</button>`)));
    };
    paint(); sh.hidden = false; requestAnimationFrame(() => sh.classList.add('in')); sh.scrollTop = 0;
  }
  function closeSheet() { const sh = $('#sheet'); sh.classList.remove('in'); setTimeout(() => { sh.hidden = true; sh.innerHTML = ''; }, 260); render(); }

  /* ---------------- Escola: pontos + quiz ---------------- */
  const STITCH = [
    ['caseado', 'Ponto caseado', 'Une a frente e as costas do dedoche e deixa a borda com acabamento bonito.', 'M14 70 V40 M14 70 H44 V40 M44 70 H74 V40 M74 70 H104 V40 M104 70 H134 V40 M134 70 H164 V40 M164 70 H194 V40 M194 70 H224 V40', ['Passe a agulha de trás para frente, perto da borda', 'Antes de puxar, deixe a linha por baixo da agulha', 'Puxe com carinho: os pontos ficam como uma escadinha']],
    ['atras', 'Ponto atrás', 'Linha firme e contínua. Ótimo para bocas, contornos e costuras fortes.', 'M14 55 H44 M44 55 H74 M74 55 H104 M104 55 H134 M134 55 H164 M164 55 H194 M194 55 H224', ['Dê um ponto para frente', 'Volte a agulha até o fim do ponto anterior', 'Repita: cada ponto "encosta" no outro']],
    ['corrido', 'Ponto corrido', 'O mais simples de todos: decora roupas e alinhava as peças.', 'M14 55 H32 M44 55 H62 M74 55 H92 M104 55 H122 M134 55 H152 M164 55 H182 M194 55 H212', ['Entre e saia do feltro em linha reta', 'Deixe espaços iguais entre os pontos', 'Use linha colorida para enfeitar mantos e túnicas']]
  ];
  let quizState = null;
  function renderEscola(goto) {
    $('#view').innerHTML = `
      <h1 class="ttl">Escola da Lãzinha</h1><p class="sub">Aprenda os pontos básicos e teste o que você sabe das histórias.</p>
      <section id="pontos"><p class="kick sec-k">✂️ Escola de Pontos</p>
      ${STITCH.map(([k, t, d, path, how]) => `<article class="card stitch ${S.stitches[k] ? 'ok' : ''}">
        <div class="st-demo"><svg viewBox="0 0 240 100" aria-hidden="true">
          <rect x="4" y="30" width="232" height="66" rx="8" fill="#3D63A8"/><rect x="4" y="30" width="232" height="66" rx="8" fill="url(#none)" opacity=".2"/>
          <path d="${path}" stroke="#F1D58E" stroke-width="3.4" stroke-linecap="round" fill="none" pathLength="100" class="draw"/>
          <g class="needle"><path d="M0 0 L22 -3 L22 3 Z" fill="#C9CCD1"/><circle cx="18" cy="0" r="1.6" fill="#3D63A8"/><animateMotion dur="4s" repeatCount="indefinite" path="${path.replace(/M/g, 'L').replace(/^L/, 'M')}"/></g>
        </svg></div>
        <h3>${t}</h3><p>${d}</p><ol>${how.map((h) => `<li>${h}</li>`).join('')}</ol>
        <button class="btn ${S.stitches[k] ? 'btn-ghost' : 'btn-green'} btn-block" data-stitch="${k}" ${S.stitches[k] ? 'disabled' : ''}>${S.stitches[k] ? 'Praticado ✓' : 'Já pratiquei! · +20 XP'}</button></article>`).join('')}
      </section>
      <section id="quiz"><p class="kick sec-k">📖 Quiz da Fé</p>
        <div class="qgrid">${A.quiz.map((qs, ci) => { const ok = qs.filter((_, qi) => S.quiz[`${ci}-${qi}`]).length; return `<button class="card qcol ${ok === qs.length ? 'ok' : ''}" data-quiz="${ci}" style="--uc:${COL_COLORS[ci]}"><span>${COL_ICONS[ci]}</span><b>${esc(COLS[ci].titulo)}</b><small>${ok}/${qs.length} ${ok === qs.length ? '⭐' : ''}</small></button>`; }).join('')}</div>
      </section>`;
    $$('[data-stitch]').forEach((b) => (b.onclick = () => { S.stitches[b.dataset.stitch] = today(); save(); addXP(20, 'ponto praticado'); checkBadges(); renderEscola('pontos'); }));
    $$('[data-quiz]').forEach((b) => (b.onclick = () => playQuiz(+b.dataset.quiz)));
    if (goto) setTimeout(() => { const el = $('#' + goto); el && el.scrollIntoView({ behavior: 'smooth' }); }, 60);
  }
  function playQuiz(ci) {
    quizState = { ci, qi: 0, hits: 0 };
    const step = () => {
      const qs = A.quiz[ci], q = qs[quizState.qi];
      if (!q) {
        const all = quizState.hits === qs.length;
        if (all) confetti();
        return modal(`${mascot(all ? 'wow' : 'happy', 'm-big')}<p class="kick">Quiz concluído</p><h2>${quizState.hits} de ${qs.length} acertos</h2><p>${all ? 'Perfeito! Você conhece bem essa história.' : 'Muito bem! Leia a passagem com calma e tente de novo.'}</p><button class="btn btn-red" data-close>Voltar</button>`, () => renderEscola('quiz'));
      }
      modal(`<p class="kick">${esc(COLS[ci].titulo)} · ${quizState.qi + 1}/${qs.length}</p>
        <div class="q-m">${mascot('think', 'm-mid')}</div><h2 class="q-t">${esc(q[0])}</h2>
        <div class="opts">${q[1].map((o, i) => `<button class="opt" data-o="${i}">${esc(o)}</button>`).join('')}</div><div class="q-fb" id="qfb"></div>`);
      $$('.opt').forEach((b) => (b.onclick = () => {
        const i = +b.dataset.o, right = i === q[2], key = `${ci}-${quizState.qi}`;
        $$('.opt').forEach((o) => { o.disabled = true; if (+o.dataset.o === q[2]) o.classList.add('right'); });
        if (!right) b.classList.add('wrong');
        if (right) { quizState.hits++; if (!S.quiz[key]) { S.quiz[key] = 1; bump('quiz'); save(); addXP(15, 'resposta certa'); checkBadges(); } vibrate(30); }
        $('#qfb').innerHTML = `<p><b>${right ? 'Isso mesmo!' : 'Quase!'}</b> ${esc(q[3])}</p><button class="btn btn-red btn-block" id="qn">${quizState.qi + 1 < qs.length ? 'Próxima' : 'Ver resultado'}</button>`;
        $('#qn').onclick = () => { quizState.qi++; step(); };
      }));
    };
    step();
  }

  /* ---------------- Ateliê de vendas ---------------- */
  function renderAtelie() {
    const a = S.atelier, lucro = a.vendidos * (a.preco - a.custo), metaP = Math.min(100, (a.vendidos / Math.max(1, a.meta)) * 100);
    $('#view').innerHTML = `
      <h1 class="ttl">Meu Ateliê</h1><p class="sub">Anote sua produção e suas vendas. As contas usam só os números que você digitar.</p>
      <section class="card at">
        <div class="cnt"><span>Kits produzidos</span><div><button data-d="feitos" data-v="-1" aria-label="Menos">−</button><b>${a.feitos}</b><button data-d="feitos" data-v="1" aria-label="Mais">+</button></div></div>
        <div class="cnt"><span>Kits vendidos</span><div><button data-d="vendidos" data-v="-1" aria-label="Menos">−</button><b>${a.vendidos}</b><button data-d="vendidos" data-v="1" aria-label="Mais">+</button></div></div>
        <div class="fields">
          <label>Preço do kit (R$)<input type="number" inputmode="decimal" min="0" step="1" data-f="preco" value="${a.preco}"></label>
          <label>Custo do material por kit (R$)<input type="number" inputmode="decimal" min="0" step="0.5" data-f="custo" value="${a.custo}"></label>
          <label>Meta de vendas no mês<input type="number" inputmode="numeric" min="1" step="1" data-f="meta" value="${a.meta}"></label>
        </div>
      </section>
      <section class="card at-res">
        <div class="res"><span>Gasto com material</span><b>${brl(a.vendidos * a.custo)}</b></div>
        <div class="res hi"><span>Sobra das vendas</span><b>${brl(lucro)}</b></div>
        <p class="kick">Meta do mês</p><div class="meta"><i style="width:${metaP}%"></i><span>${a.vendidos}/${a.meta} kits</span></div>
        <small>Custo sugerido de R$ 8 por kit de 5 dedoches (feltro, linha, detalhes e embalagem, em preços de varejo de 2026). Ajuste com os seus valores.</small>
      </section>
      <section class="card"><p class="kick">Onde oferecer seus kits</p>
        <ul class="sell">
          <li><span>⛪</span><div><b>Bazar e feira da paróquia</b><small>Leve um kit montado para as pessoas verem de perto.</small></div></li>
          <li><span>📚</span><div><b>Catequistas</b><small>Personagens para os encontros: ofereça por coleção.</small></div></li>
          <li><span>📱</span><div><b>Status e grupos do WhatsApp</b><small>Poste a foto do kit pronto, com o preço e a história.</small></div></li>
          <li><span>🎁</span><div><b>Datas religiosas</b><small>Natal, Páscoa, batizado e Primeira Comunhão.</small></div></li>
        </ul></section>`;
    $$('[data-d]').forEach((b) => (b.onclick = () => {
      const k = b.dataset.d, v = +b.dataset.v, before = a[k]; a[k] = Math.max(0, a[k] + v); save();
      if (k === 'vendidos' && v > 0) { confetti(); addXP(15, 'venda registrada'); } else if (k === 'feitos' && v > 0 && a.feitos > before) addXP(5, 'kit produzido');
      checkBadges(); renderAtelie();
    }));
    $$('[data-f]').forEach((i) => (i.onchange = () => { a[i.dataset.f] = Math.max(0, parseFloat(i.value.replace(',', '.')) || 0); save(); renderAtelie(); }));
  }

  /* ---------------- Liberação por código (link da Wiapy) ---------------- */
  const sha = async (t) => { try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join(''); } catch (e) { return ''; } };
  const unlocked = (k) => !!(S.unlocks && S.unlocks[k]);
  async function tryCode(raw, silent) {
    const code = String(raw || '').trim().toUpperCase();
    if (!code) return false;
    const h = await sha(code);
    const k = Object.keys(A.acessos).find((key) => A.acessos[key] === h);
    if (!k) { if (!silent) toast('<b>Código não reconhecido</b>'); return false; }
    S.unlocks = Object.assign({}, S.unlocks, { [k]: today(), basico: (S.unlocks && S.unlocks.basico) || today() }); save();
    if (k === 'basico' || !S.onboarded) { $('#gate') && ($('#gate').hidden = true); boot(); if (k === 'basico') return true; }
    confetti();
    modal(`${mascot('wow', 'm-big')}<p class="kick">Acesso liberado!</p><h2>${k === 'premium' ? 'Kit Premium + bônus' : 'A Bíblia em Cena'}</h2><p>Já está tudo na aba <b>Extras</b>.</p><button class="btn btn-red" data-close data-gox>Abrir Extras</button>`);
    const g = $('[data-gox]'); if (g) g.onclick = () => { tab = 'extras'; render(); };
    return true;
  }
  async function readHashCode() {
    const m = (location.hash || '').match(/acesso=([A-Za-z0-9-]+)/);
    if (m) { await tryCode(decodeURIComponent(m[1]), false); try { history.replaceState(null, '', location.pathname); } catch (e) {} }
  }

  /* ---------------- Extras: bônus e A Bíblia em Cena ---------------- */
  function codeBox() { return `<div class="card codebox"><p class="kick">Tem um código de acesso?</p><div class="cb-row"><input id="codein" placeholder="Ex.: PREMIUM-XXXXXXXX" autocapitalize="characters" aria-label="Código de acesso"><button class="btn btn-blue" id="codebtn">Liberar</button></div><small>O código vem no link de acesso que você recebeu por e-mail após a compra.</small></div>`; }
  function renderExtras() {
    const prem = unlocked('premium'), cena = unlocked('cena'), B = window.BONUS || [], CE = window.CENA;
    $('#view').innerHTML = `<h1 class="ttl">Extras</h1><p class="sub">Materiais complementares liberados pela sua compra.</p>
      <p class="kick sec-k">🎁 Bônus do Kit Premium ${prem ? '' : '<span class="pill lock">bloqueado</span>'}</p>
      <div class="xgrid">${B.map((b, i) => `<button class="xcard ${prem ? '' : 'locked'}" data-bonus="${i}"><span class="xcov">${A.bonusCapas[i] ? `<img src="${esc(A.bonusCapas[i])}" alt="">` : ''}</span><b>${esc(b.titulo)}</b><small>${prem ? `${b.paginas.length} páginas` : '🔒 Kit Premium'}</small></button>`).join('')}</div>
      <p class="kick sec-k">🎭 Complemento ${cena ? '' : '<span class="pill lock">bloqueado</span>'}</p>
      <button class="card cena-card ${cena ? '' : 'locked'}" data-cena><span class="cena-ic">🎭</span><div><b>${esc(CE.titulo)}</b><span>${esc(CE.sub)}</span><small>${cena ? `${CE.roteiros.length} roteiros para encenar` : '🔒 Complemento opcional da compra'}</small></div></button>
      ${prem && cena ? '' : codeBox()}`;
    $$('[data-bonus]').forEach((b) => (b.onclick = () => unlocked('premium') ? openReader(B[+b.dataset.bonus]) : lockedMsg('premium')));
    $('[data-cena]').onclick = () => unlocked('cena') ? openCena() : lockedMsg('cena');
    const cb = $('#codebtn'); if (cb) cb.onclick = async () => { if (await tryCode($('#codein').value)) renderExtras(); };
  }
  function lockedMsg(k) {
    modal(`${mascot('think', 'm-mid')}<h2>${k === 'premium' ? 'Exclusivo do Kit Premium' : 'Complemento A Bíblia em Cena'}</h2><p>${k === 'premium' ? 'Os 4 guias são liberados para quem comprou o Kit Premium.' : 'Os roteiros são liberados para quem adicionou A Bíblia em Cena na compra.'} Se você comprou, abra o link de acesso que chegou no seu e-mail ou digite o código aqui na aba Extras.</p><button class="btn btn-red" data-close>Entendi</button>`);
  }
  function openSheet(html, bind) {
    const sh = $('#sheet'); sh.innerHTML = html; sh.hidden = false; requestAnimationFrame(() => sh.classList.add('in')); sh.scrollTop = 0;
    $$('[data-x]', sh).forEach((b) => (b.onclick = closeSheet)); bind && bind(sh);
  }
  function openReader(b) {
    let i = 0;
    const page = () => `<header class="sh-h" style="background:${b.cor}"><button class="ic-btn" data-x aria-label="Voltar">←</button><div><small>Bônus · ${i + 1} de ${b.paginas.length}</small><b>${esc(b.titulo)}</b></div></header>
      <div class="sh-body reader"><div class="rd-dots">${b.paginas.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
      <article class="rd-page" style="--bc:${b.cor}"><p class="kick">${esc(b.sub)}</p><h2>${esc(b.paginas[i].t)}</h2>${b.paginas[i].h}</article>
      <div class="rd-nav"><button class="btn btn-ghost" data-pv ${i === 0 ? 'disabled' : ''}>← Anterior</button><button class="btn btn-red" data-nx>${i === b.paginas.length - 1 ? 'Concluir ✓' : 'Próxima →'}</button></div>
      <details class="rd-idx"><summary>Índice</summary><ol>${b.paginas.map((p, k) => `<li><button data-go="${k}">${esc(p.t)}</button></li>`).join('')}</ol></details></div>`;
    const paint = () => openSheet(page(), (sh) => {
      $('[data-pv]', sh).onclick = () => { i = Math.max(0, i - 1); paint(); };
      $('[data-nx]', sh).onclick = () => { if (i < b.paginas.length - 1) { i++; paint(); } else { if (!S.read) S.read = {}; if (!S.read[b.id]) { S.read[b.id] = today(); save(); addXP(25, 'bônus lido'); } closeSheet(); } };
      $$('[data-go]', sh).forEach((g) => (g.onclick = () => { i = +g.dataset.go; paint(); }));
    });
    paint();
  }
  function openCena() {
    const CE = window.CENA;
    openSheet(`<header class="sh-h" style="background:#6E4E8C"><button class="ic-btn" data-x aria-label="Voltar">←</button><div><small>Complemento</small><b>${esc(CE.titulo)}</b></div></header>
      <div class="sh-body"><div class="cena-hero">🎭<p>${esc(CE.intro)}</p></div>
      <div class="card"><p class="kick">Como usar</p><ol class="cu">${CE.comoUsar.map((c) => `<li>${esc(c)}</li>`).join('')}</ol></div>
      <div class="rlist">${CE.roteiros.map((r, k) => `<button class="card rbtn" data-r="${k}"><span class="rn">${String(k + 1).padStart(2, '0')}</span><div><b>${esc(r.t)}</b><small>📖 ${esc(r.ref)} · ${r.pers.length} personagens</small></div>${S.cena && S.cena[k] ? '<i>✓</i>' : ''}</button>`).join('')}</div></div>`,
      (sh) => $$('[data-r]', sh).forEach((b) => (b.onclick = () => openRoteiro(+b.dataset.r))));
  }
  function openRoteiro(k) {
    const r = window.CENA.roteiros[k];
    const find = (n) => ALL.find((x) => x.name === n || x.name.startsWith(n + ',') || n.startsWith(x.name));
    openSheet(`<header class="sh-h" style="background:#6E4E8C"><button class="ic-btn" data-back aria-label="Voltar">←</button><div><small>Roteiro ${k + 1} · ${esc(r.ref)}</small><b>${esc(r.t)}</b></div></header>
      <div class="sh-body roteiro">
        <div class="card"><p class="kick">Personagens</p><div class="rpers">${r.pers.map((n) => { const x = find(n); return `<span>${x ? `<img src="${esc(cellOf(x.ci, x.pi))}" alt="">` : ''}${esc(n)}</span>`; }).join('')}</div><p class="rcen"><b>Cenário:</b> ${esc(r.cenario)}</p></div>
        <div class="script">${r.cenas.map(([q, f]) => `<div class="line ${q.startsWith('Narrador') ? 'narr' : ''}"><b>${esc(q)}</b><p>${esc(f)}</p></div>`).join('')}</div>
        <div class="card msg"><p class="kick">Mensagem</p><p>${esc(r.msg)}</p></div>
        <div class="card"><p class="kick">Perguntas para as crianças</p><ol class="cu">${r.perg.map((q) => `<li>${esc(q)}</li>`).join('')}</ol></div>
        <button class="btn btn-green btn-block" data-done>${S.cena && S.cena[k] ? 'Encenado ✓' : 'Encenamos esta história! · +20 XP'}</button>
      </div>`, (sh) => {
      $('[data-back]', sh).onclick = () => openCena();
      $('[data-done]', sh).onclick = () => { if (!S.cena) S.cena = {}; if (!S.cena[k]) { S.cena[k] = today(); save(); confetti(); addXP(20, 'história encenada'); } openCena(); };
    });
  }

  /* ---------------- Perfil ---------------- */
  let installEvt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; });
  function renderPerfil() {
    const li = levelOf(S.xp), prem = unlocked('premium');
    $('#view').innerHTML = `
      <section class="prof">${mascot('happy', 'm-mid')}<div><input id="pname" value="${esc(S.name)}" placeholder="Seu nome" aria-label="Seu nome"><small>${LEVELS[li][0]} · ${S.xp} XP</small></div></section>
      <section class="card"><p class="kick">Seus níveis</p><ol class="ladder">${LEVELS.map((l, k) => `<li class="${k <= li ? 'on' : ''} ${k === li ? 'cur' : ''}"><span>${k + 1}</span><b>${l[0]}</b><small>${l[1]} XP</small></li>`).join('')}</ol></section>
      <section class="card"><div class="row-sb"><p class="kick">Conquistas</p><span class="pill">${Object.keys(S.badges).length}/${BADGES.length}</span></div>
        <div class="badges">${BADGES.map((b) => `<div class="bdg ${S.badges[b[0]] ? 'on' : ''}" title="${esc(b[3])}"><span>${S.badges[b[0]] ? b[1] : '🔒'}</span><b>${esc(b[2])}</b></div>`).join('')}</div></section>
      <section class="card"><div class="row-sb"><p class="kick">Seus acessos</p></div>
        <ul class="acc"><li class="ok">✓ 100 moldes e passo a passo</li><li class="${prem ? 'ok' : ''}">${prem ? '✓' : '🔒'} Bônus do Kit Premium</li><li class="${unlocked('cena') ? 'ok' : ''}">${unlocked('cena') ? '✓' : '🔒'} A Bíblia em Cena</li></ul>
        <button class="btn btn-ghost btn-block" data-tab="extras">Abrir Extras</button></section>
      <section class="card"><p class="kick">App</p>
        <button class="btn btn-blue btn-block" id="inst">📲 Instalar na tela inicial</button>
        ${A.suporte ? `<p class="sup">Suporte: ${esc(A.suporte)}</p>` : ''}
        <button class="btn btn-ghost btn-block" id="reset">Recomeçar progresso</button></section>`;
    $('#pname').onchange = (e) => { S.name = e.target.value.trim(); save(); };
    $('#inst').onclick = async () => {
      if (installEvt) { installEvt.prompt(); installEvt = null; return; }
      modal(`${mascot('think', 'm-mid')}<h2>Instalar o app</h2><p><b>iPhone:</b> no Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início".</p><p><b>Android:</b> no Chrome, toque nos três pontinhos e em "Instalar app".</p><button class="btn btn-red" data-close>Entendi</button>`);
    };
    $('#reset').onclick = () => {
      modal(`<h2>Recomeçar do zero?</h2><p>Seu XP, passos e conquistas serão apagados deste aparelho.</p><div class="mbtns"><button class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-red" id="rs">Recomeçar</button></div>`);
      $('#rs').onclick = () => { S = blank(); save(); $('#modal').hidden = true; boot(); };
    };
  }

  /* ---------------- Navegação ---------------- */
  let tab = 'inicio';
  const VIEWS = { inicio: renderHome, trilha: renderPath, escola: renderEscola, extras: renderExtras, atelie: renderAtelie, perfil: renderPerfil };
  function render(goto) {
    renderTop(); VIEWS[tab](goto);
    $$('.tab').forEach((t) => t.setAttribute('aria-current', t.dataset.tab === tab ? 'page' : 'false'));
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]'); if (o) { openLesson(o.dataset.open); return; }
    const t = e.target.closest('[data-tab]'); if (t) { tab = t.dataset.tab; window.scrollTo(0, 0); render(t.dataset.goto); }
  });

  /* ---------------- Boas-vindas ---------------- */
  function onboarding() {
    const ob = $('#onb'); ob.hidden = false;
    const s1 = () => { ob.innerHTML = `<div class="ob">${mascot('wave', 'm-big')}<h1>Oi! Eu sou a Lãzinha 🐑</h1><p>Vou te acompanhar na confecção dos <b>100 moldes de dedoches bíblicos</b>, passo a passo, sem pressa.</p><label class="ob-l">Como posso te chamar?<input id="obn" placeholder="Seu nome" autocomplete="given-name"></label><button class="btn btn-red btn-block" id="ob1">Continuar</button></div>`; $('#ob1').onclick = () => { S.name = ($('#obn').value || '').trim(); s2(); }; };
    const s2 = () => { ob.innerHTML = `<div class="ob">${mascot('think', 'm-mid')}<h1>O que te trouxe aqui${S.name ? ', ' + esc(S.name) : ''}?</h1><div class="goals">
        <button data-g="ensinar"><span>⛪</span><b>Ensinar na catequese</b><small>Personagens para os encontros</small></button>
        <button data-g="familia"><span>👨‍👩‍👧</span><b>Brincar em família</b><small>Histórias com filhos e netos</small></button>
        <button data-g="vender"><span>🧺</span><b>Vender meus kits</b><small>Renda extra com o feltro</small></button></div></div>`;
      $$('[data-g]', ob).forEach((b) => (b.onclick = () => { S.goal = b.dataset.g; s3(); })); };
    const s3 = () => { ob.innerHTML = `<div class="ob">${mascot('wow', 'm-big')}<h1>Sua primeira missão: o Presépio!</h1><p>Cada passo marcado vale <b>XP</b>. Termine personagens, suba de nível e ganhe conquistas. O Natal está chegando, vamos começar pela folha do <b>Natal</b>?</p><button class="btn btn-red btn-block" id="ob3">Começar · +20 XP</button></div>`;
      $('#ob3').onclick = () => { S.onboarded = true; ob.hidden = true; ensureDay(); save(); confetti(); addXP(20, 'boas-vindas'); render(); }; };
    s1();
  }

  function gate() {
    const g = $('#gate'); g.hidden = false;
    g.innerHTML = `<div class="ob">${mascot('think', 'm-mid')}<h1>Área exclusiva para compradores</h1><p>Este app é liberado para quem comprou o <b>Kit Básico</b> ou o <b>Kit Premium</b>. O link de acesso chega no seu e-mail logo após a compra.</p><label class="ob-l">Já comprou? Digite o código do seu e-mail<input id="gcode" placeholder="Ex.: BASICO-XXXXXXXX" autocapitalize="characters"></label><button class="btn btn-red btn-block" id="gbtn">Entrar</button><a class="btn btn-ghost btn-block" href="../">Conhecer o produto</a></div>`;
    $('#gbtn').onclick = async () => { if (await tryCode($('#gcode').value)) { g.hidden = true; } };
  }
  function boot() {
    tab = 'inicio';
    if (!unlocked('basico')) { renderTop(); $('#view').innerHTML = ''; gate(); return; }
    if (!S.onboarded) { renderTop(); $('#view').innerHTML = ''; onboarding(); } else { ensureDay(); render(); }
  }
  readHashCode().then(() => boot());
  window.addEventListener('hashchange', readHashCode);

  /* PWA: service worker (só funciona publicado em https, fora de iframes) */
  try { if ('serviceWorker' in navigator && location.protocol === 'https:' && window.top === window.self) navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {}
})();
