/* =========================================================
   main.js — monta a página a partir de config.js
   Cada espaço de imagem (.slot) mostra a FOTO configurada
   ou, se estiver vazio, uma ilustração demonstrativa.
   ========================================================= */
(function () {
  const C = window.CONFIG;
  const { defs, puppet, patternPage } = window.Puppets;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ch = (ci, pi) => C.colecoes[ci].personagens[pi];
  const pup = ([name, look], o = {}) => puppet(look, { title: name, ...o });
  const row = (list, cls = '') => `<div class="pp-row ${cls}">${list.map((p) => pup(ch(...p), { plain: true })).join('')}</div>`;
  defs();

  /* ---------- Ícones ---------- */
  const I = {
    church: '<path d="M12 2v5M10 4h4"/><path d="M5 21V12l7-5 7 5v9"/><path d="M10 21v-5a2 2 0 0 1 4 0v5"/><path d="M3 21h18"/>',
    family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M3 20v-2a5 5 0 0 1 10 0v2"/><path d="M14 20v-1.5a3.5 3.5 0 0 1 7 0V20"/>',
    needle: '<path d="M20 4 6 18"/><path d="M18 3.5a1.8 1.8 0 0 1 2.5 2.5"/><path d="M6 18c-2 1-3.5 0-3-2s3-2 4-4 0-4-2-4"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M2 9h20M12 9v12"/><path d="M12 9S9 3 6.5 4.5 9 9 12 9zm0 0s3-6 5.5-4.5S15 9 12 9z"/>',
    people: '<circle cx="12" cy="6" r="2.6"/><circle cx="5" cy="9" r="2.1"/><circle cx="19" cy="9" r="2.1"/><path d="M7.5 20v-3a4.5 4.5 0 0 1 9 0v3M1.5 19v-1.5A3.5 3.5 0 0 1 6 14.2M22.5 19v-1.5A3.5 3.5 0 0 0 18 14.2"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
  };
  const icon = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;

  /* ---------- Espaços de imagem ---------- */
  function fill(el, src, alt, fallback) {
    if (!el) return;
    if (src) { el.classList.add('has-photo'); el.innerHTML = `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`; }
    else el.innerHTML = `<div class="ill">${fallback}</div><span class="ill-note">Ilustração demonstrativa</span>`;
    if (C.mostrarNomesDasImagens && el.dataset.label) el.insertAdjacentHTML('beforeend', `<span class="slot-name">${esc(el.dataset.label)}</span>`);
  }

  // Ilustrações de apoio
  const felt = `<svg viewBox="0 0 400 400" aria-hidden="true">
    <rect width="400" height="400" fill="#EFE3CC"/>
    <g transform="rotate(-8 200 200)">
      <rect x="40" y="70" width="190" height="140" rx="6" fill="#3D63A8"/><rect x="70" y="120" width="190" height="140" rx="6" fill="#B5413A"/>
      <rect x="100" y="170" width="190" height="140" rx="6" fill="#4E7D5B"/><rect x="130" y="220" width="190" height="140" rx="6" fill="#F7F2E8"/>
    </g>
    <g transform="translate(225 40) rotate(10)"><rect width="150" height="200" rx="4" fill="#fff" stroke="#e6dccb"/>
      <path d="M30 170 V80 Q30 55 60 55 Q90 55 90 80 V170Z" fill="none" stroke="#8C6B46" stroke-width="2" stroke-dasharray="6 4"/>
      <circle cx="118" cy="70" r="20" fill="none" stroke="#8C6B46" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="75" y="192" font-size="11" text-anchor="middle" fill="#6B6158" font-family="Inter,sans-serif">MOLDE · MARIA</text></g>
    <g transform="translate(60 300) rotate(-25)" fill="none" stroke="#5B5550" stroke-width="6"><circle cx="0" cy="0" r="16"/><circle cx="0" cy="44" r="16"/><path d="M14 8 L110 40 M14 36 L110 4"/></g>
  </svg>`;
  const scene = (list, bg = '#E8D6B3') => `<div class="scene" style="background:${bg}">${row(list)}<div class="shelf"></div></div>`;

  /* ---------- 1. Hero ---------- */
  fill($('[data-slot="hero"]'), C.imagens.hero, 'Dedoches bíblicos em feltro',
    `<div class="hero-ill"><div class="hero-page">${patternPage('Maria')}</div>${scene([[0, 5], [0, 1], [0, 0], [0, 2], [0, 3], [1, 0], [4, 2]], 'transparent')}</div>`);

  /* ---------- 2. Carrossel de coleções ---------- */
  const mq = (list, cls) => { const items = list.map((g) => `<figure class="${cls}"><img src="${esc(g.img)}" alt="Molde ${esc(g.nome)}" loading="lazy"></figure>`).join(''); return items + items; };
  $('#mq-pages').innerHTML = mq(C.carrosselPaginas, 'mq-page');
  $('#mq-cards').innerHTML = mq(C.carrosselCartoes, 'mq-card');
  $$('#mq-pages figure:nth-child(n+' + (C.carrosselPaginas.length + 1) + '), #mq-cards figure:nth-child(n+' + (C.carrosselCartoes.length + 1) + ')').forEach((f) => f.setAttribute('aria-hidden', 'true'));

  $('#all-list').innerHTML = (window.CATALOGO || []).map((f) => `<div><h4>Folha ${f.folha} · ${esc(f.titulo)} <small>${f.itens.length}</small></h4><p>${f.itens.map((i) => esc(i[0])).join(' · ')}</p></div>`).join('');

  /* ---------- 3. Antes e depois ---------- */
  $('#ba2').innerHTML = (C.imagens.antesDepois || []).map((src, i) => `<figure><img src="${esc(src)}" alt="Antes: peças cortadas do molde. Depois: dedoche pronto para encenar" loading="lazy"></figure>`).join('');

  /* ---------- 4. Passos ---------- */
  const passos = [
    ['Imprima o molde', 'Escolha o personagem e imprima no tamanho indicado.', `<div class="mini-page">${patternPage('José')}</div>`],
    ['Recorte o feltro', 'Transfira as peças para o feltro e recorte.', felt],
    ['Monte e costure', 'Siga as instruções de montagem à mão.', `<div class="mini-one">${puppet({ robe: 'cream', hair: 'brown' }, { plain: true, title: 'Estrutura-base' })}${pup(ch(0, 0), { plain: true })}</div>`],
    ['Use ou venda', 'Conte histórias, presenteie ou monte kits.', `<div class="mini-box">${row([[0, 1], [0, 0], [0, 2]])}<span>Kit Natal</span></div>`]
  ];
  $('#steps').innerHTML = passos.map(([t, d], i) => C.imagens.passos[i]
    ? `<li><img src="${esc(C.imagens.passos[i])}" alt="Passo ${i + 1}: ${t}. ${d}" loading="lazy"></li>`
    : `<li class="no-img"><span class="num">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('');

  /* ---------- 6. Aprenda a lucrar ---------- */
  const pfCards = ['menino-jesus', 'maria', 'jose', 'anjo-gabriel', 'pastor'];
  $('#pf-pups').innerHTML = pfCards.map((n, i) => `<span class="pf-pup" style="--i:${i}"><img src="${esc('assets/pf/' + n + '.jpg')}" alt=""></span>`).join('');
  const countUp = (el) => { const to = +el.dataset.to, t0 = performance.now(), dur = 1400; const tick = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const prof = $('#contas');
  const startProfit = () => { if (prof.classList.contains('go')) return; prof.classList.add('go'); $$('.count', prof).forEach(countUp); };
  if ('IntersectionObserver' in window) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { startProfit(); o.disconnect(); } }, { threshold: 0.25 }).observe(prof); else startProfit();
  const CUSTO_KIT = 8;
  const sim = () => { const q = +$('#s-qtd').value, pr = +$('#s-preco').value; $('#s-qtd-v').textContent = q; $('#s-preco-v').textContent = brl(pr).replace(',00', ''); $('#s-custo').textContent = brl(q * CUSTO_KIT).replace(',00', ''); $('#s-lucro').textContent = brl(q * (pr - CUSTO_KIT)).replace(',00', ''); $('#s-lucro').classList.remove('pop'); void $('#s-lucro').offsetWidth; $('#s-lucro').classList.add('pop'); };
  ['#s-qtd', '#s-preco'].forEach((id) => $(id).addEventListener('input', sim)); sim();

  /* ---------- 7. Para quem é ---------- */
  const who = [
    ['church', 'É catequista ou serve na paróquia', 'Personagens para encontros, encenações e atividades infantis.'],
    ['family', 'Quer ensinar a fé aos filhos', 'Histórias de Jesus contadas com brincadeira em família.'],
    ['needle', 'É artesã e quer renda extra', 'Kits religiosos para vender a famílias, catequistas e comunidades.', true],
    ['gift', 'É avó ou procura presentes religiosos', 'Lembranças afetivas para netos, batizados e Primeira Comunhão.'],
    ['people', 'Participa de grupo ou comunidade', 'Encontros infantis e ações de evangelização.']
  ];
  const fotos = C.fotosPublico || [];
  if (fotos.length) {
    const order = fotos.length === 3 ? [0, 1, 2] : fotos.map((_, i) => i);
    const sparks = Array.from({ length: 14 }, (_, i) => `<span class="spark ${i % 3 ? 'st' : 'cx'}" style="--x:${(i * 7.3 + 4) % 96}%;--d:${8 + (i % 5) * 2.2}s;--dl:-${(i * 1.7) % 12}s;--s:${0.6 + (i % 4) * 0.25}">${i % 3 ? '✦' : '✝'}</span>`).join('');
    const dove = `<svg class="dove" viewBox="0 0 64 40" aria-hidden="true"><path d="M4 26c8-2 14-8 20-8 4 0 6 2 9 2 3-4 9-14 22-16-6 5-9 11-11 16 5 0 10 2 16 6-8 0-14-1-19 1-5 3-11 7-21 7C11 34 6 30 4 26z" fill="#fff"/><circle cx="27" cy="22" r="1.4" fill="#23457A"/><path d="M20 23l-5 1 5 1z" fill="#E9C979"/></svg>`;
    $('#faith-art').innerHTML = `<div class="fa-rays" aria-hidden="true"></div><div class="fa-sparks" aria-hidden="true">${sparks}</div>${dove}
      <div class="fa-arches">${order.map((i, k) => `<figure class="arch arch-${k}"><div class="arch-frame"><div class="arch-in"><img src="${esc(fotos[i].img)}" alt="Dedoches bíblicos em feltro: ${esc(fotos[i].legenda)}" loading="lazy"></div></div><figcaption>${esc(fotos[i].legenda)}</figcaption></figure>`).join('')}</div>
      <p class="fa-verse">“Deixai vir a mim as criancinhas”<span>Marcos 10,14</span></p>`;
  }
  $('#who').innerHTML = who.map(([i, t, d, star]) => `<div class="who-card${star ? ' star' : ''}"><span class="who-ico">${icon(i)}</span><div><strong>${t}</strong><span>${d}</span></div></div>`).join('');

  /* ---------- Depoimentos (só reais) ---------- */
  if (C.depoimentos && C.depoimentos.length) {
    $('#depoimentos').hidden = false;
    $('#dep-row').innerHTML = C.depoimentos.map((d) => `<figure class="dep">${d.foto ? `<img src="${esc(d.foto)}" alt="Depoimento de ${esc(d.nome)}" loading="lazy">` : ''}${d.texto ? `<blockquote>“${esc(d.texto)}”</blockquote>` : ''}<figcaption>${esc(d.nome || '')}${d.local ? ' · ' + esc(d.local) : ''}</figcaption></figure>`).join('');
  }

  /* ---------- 8. Kit digital ---------- */
  fill($('[data-slot="kitDigital"]'), C.imagens.kitDigital, 'Moldes em PDF',
    `<div class="pdf-stack"><div class="pdf p3"></div><div class="pdf p2"></div><div class="pdf p1">${patternPage('Maria')}</div></div>${row([[0, 0], [1, 0], [6, 0]], 'pdf-pups')}`);

  /* ---------- CTA final ---------- */
  if (C.imagens.final) $('#final-img').innerHTML = `<img src="${esc(C.imagens.final)}" alt="Prévia de 16 moldes da coleção" loading="lazy">`;

  /* ---------- 9. Bônus ---------- */
  $('#bonus-grid').innerHTML = C.bonus.map((b, i) => `
    <article class="bonus">
      <div class="bonus-img${b.capa ? ' has-photo' : ''}" style="--bc:${b.cor}">
        ${b.capa ? `<img src="${esc(b.capa)}" alt="Capa do Bônus ${i + 1}: ${esc(b.titulo)}" loading="lazy">` : `
        <div class="book"><span class="book-tag">Bônus ${i + 1}</span><span class="book-ico">${icon(b.icone, 30)}</span><strong>${esc(b.titulo)}</strong></div>
        <span class="bonus-badge">🎁 Bônus ${i + 1}</span>`}
      </div>
      <div class="bonus-body"><span class="bonus-n">🎁 Bônus ${i + 1}</span><h3>${esc(b.titulo)}</h3><p>${esc(b.desc)}</p><span class="incl">Exclusivo do Kit Premium</span></div>
    </article>`).join('');
  $('#plan-bonuses').innerHTML = C.bonus.map((b, i) => `<li>
      <span class="mini-book" style="--bc:${b.cor}">${b.capa ? `<img src="${esc(b.capa)}" alt="">` : `<span class="mb-tag">Bônus ${i + 1}</span>${icon(b.icone, 18)}<b>${esc(b.titulo)}</b>`}</span>
      <span class="pb-txt"><strong>Bônus ${i + 1} · ${esc(b.titulo)}</strong><span>${esc(b.desc)}</span></span></li>`).join('');

  /* ---------- Preço / textos ---------- */
  const P = C.planos;
  const split = (v) => v.toFixed(2).split('.');
  ['basico', 'premium'].forEach((k) => { const [i, c] = split(P[k].preco); $(`[data-price="${k}-int"]`).textContent = i; $(`[data-price="${k}-cents"]`).textContent = ',' + c; });
  const bind = { produto: C.produto, precoNota: C.precoNota, formasPagamento: C.formasPagamento, precoMin: brl(Math.min(P.basico.preco, P.premium.preco)), diferenca: brl(Math.round((P.premium.preco - P.basico.preco) * 100) / 100) };
  $$('[data-bind]').forEach((el) => (el.textContent = bind[el.dataset.bind] ?? ''));
  $('#garantia-texto').textContent = C.garantia.texto;
  $('#year').textContent = new Date().getFullYear();
  $('#seal').innerHTML = `<svg viewBox="0 0 160 160" role="img" aria-label="Garantia de ${C.garantia.dias} dias">
    <defs><path id="sealArc" d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0"/></defs>
    <circle cx="80" cy="80" r="76" fill="#D4AF5A"/><circle cx="80" cy="80" r="68" fill="#23457A"/>
    <circle cx="80" cy="80" r="62" fill="none" stroke="#E9D8B0" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text font-family="Inter, sans-serif" font-size="10" font-weight="800" fill="#E9D8B0"><textPath href="#sealArc" textLength="358" lengthAdjust="spacing">GARANTIA · SATISFAÇÃO · GARANTIA · SATISFAÇÃO ·</textPath></text>
    <text x="80" y="92" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="52" font-weight="700" fill="#fff">${C.garantia.dias}</text>
    <text x="80" y="112" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="800" letter-spacing="3" fill="#E9D8B0">DIAS</text></svg>`;

  /* ---------- FAQ ---------- */
  $('#faq-list').innerHTML = C.faq.map(([q, a]) => `<details class="qa"><summary>${esc(q)}<i aria-hidden="true">+</i></summary><p>${esc(a)}</p></details>`).join('');

  /* ---------- Rodapé ---------- */
  const links = [];
  if (C.emailSuporte) links.push(`Suporte: <a href="mailto:${esc(C.emailSuporte)}">${esc(C.emailSuporte)}</a>`);
  if (C.linkPrivacidade) links.push(`<a href="${esc(C.linkPrivacidade)}">Política de privacidade</a>`);
  if (C.linkTermos) links.push(`<a href="${esc(C.linkTermos)}">Termos de uso</a>`);
  $('#f-links').innerHTML = links.join(' · ');

  /* ---------- Checkout (um link por plano) ---------- */
  const withUtm = (url) => { try { const u = new URL(url); if (C.repassarUTMs) new URLSearchParams(location.search).forEach((v, k) => { if (/^(utm_|src|sck|fbclid|gclid)/.test(k)) u.searchParams.set(k, v); }); return u.toString(); } catch (e) { return url; } };
  ['basico', 'premium'].forEach((k) => {
    const btn = $(`[data-plan="${k}"]`), warn = $(`[data-warn="${k}"]`);
    if (P[k].checkoutUrl) { btn.href = withUtm(P[k].checkoutUrl); btn.rel = 'noopener'; }
    else {
      warn.hidden = false;
      btn.addEventListener('click', (e) => { e.preventDefault(); warn.classList.add('pulse'); setTimeout(() => warn.classList.remove('pulse'), 900); });
    }
  });

})();
