  // ---------- helpers ----------
  const LS_KEY = document.body.dataset.storageKey || 'pt_lesson';
  function norm(s){
    return (s||'').toLowerCase().trim()
      .normalize('NFD').replace(/[̀-ͯ]/g,'') // strip accents
      .replace(/\s+/g,' ');
  }
  function load(){ try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch(e){ return {}; } }
  function save(state){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
  let state = load();

  // Total points = all text inputs + matching pairs + MC questions + writing(1)
  function totalPoints(){
    let t = 0;
    document.querySelectorAll('.exercise[data-ex] input[type="text"]').forEach(()=>t++);
    t += document.querySelectorAll('#match2 .match-col[data-side="pt"] .match-item').length; // 6
    t += document.querySelectorAll('.q[data-mc]').length; // MC
    t += 1; // writing
    return t;
  }
  function earnedPoints(){
    let e = 0;
    for (const k in state){ if(k.startsWith('pt:')&&state[k]) e++; }
    for (const k in state){ if(k.startsWith('mc:')&&state[k]) e++; }
    if (state['match']) e += state['match'];
    if (state['writing']) e += 1;
    return e;
  }
  function refreshScore(){
    const tot = totalPoints();
    const earned = Math.min(earnedPoints(), tot);
    document.getElementById('scoreNum').textContent = earned + ' / ' + tot;
    document.getElementById('progressFill').style.transform = 'scaleX(' + (tot? earned/tot : 0) + ')';
  }

  // ---------- text exercises ----------
  function checkText(ex){
    const box = document.querySelector('.exercise[data-ex="'+ex+'"]');
    const inputs = box.querySelectorAll('input[type="text"]');
    let ok = 0;
    inputs.forEach((inp,i)=>{
      const accepted = inp.dataset.a.split('|').map(norm);
      const val = norm(inp.value);
      const id = 'pt:'+ex+':'+i;
      if (val && accepted.includes(val)){
        inp.classList.add('correct'); inp.classList.remove('incorrect');
        state[id]=true; ok++;
      } else {
        inp.classList.add('incorrect'); inp.classList.remove('correct');
        state[id]=false;
        const hint = inp.closest('.q').querySelector('.hint');
        if(hint) hint.classList.add('show');
      }
    });
    save(state); refreshScore();
    const pill = document.getElementById('res'+ex);
    pill.textContent = ok+' / '+inputs.length+' certas';
    pill.className = 'result-pill show ' + (ok===inputs.length?'good':'partial');
  }
  function toggleReveal(ex){
    document.querySelectorAll('.exercise[data-ex="'+ex+'"] .reveal').forEach(r=>r.classList.toggle('show'));
  }

  // ---------- matching ----------
  let selected = null;
  function setupMatch(){
    const wrap = document.getElementById('match2');
    wrap.querySelectorAll('.match-item').forEach(item=>{
      item.addEventListener('click', ()=>{
        if(item.classList.contains('matched')) return;
        const side = item.parentElement.dataset.side;
        if(!selected){ selected = item; item.classList.add('selected'); return; }
        if(selected === item){ item.classList.remove('selected'); selected=null; return; }
        const sameSide = selected.parentElement.dataset.side === side;
        if(sameSide){ selected.classList.remove('selected'); selected=item; item.classList.add('selected'); return; }
        // attempt match
        if(selected.dataset.key === item.dataset.key){
          selected.classList.add('matched'); item.classList.add('matched');
          selected.classList.remove('selected');
          countMatches();
        } else {
          const a=selected, b=item;
          a.classList.add('incorrect'); b.classList.add('incorrect');
          setTimeout(()=>{ a.classList.remove('incorrect','selected'); b.classList.remove('incorrect'); }, 700);
        }
        selected=null;
      });
    });
  }
  function countMatches(){
    const pairs = document.querySelectorAll('#match2 .match-col[data-side="pt"] .match-item.matched').length;
    state['match'] = pairs; save(state); refreshScore();
    const total = document.querySelectorAll('#match2 .match-col[data-side="pt"] .match-item').length;
    const pill = document.getElementById('res2');
    pill.textContent = pairs+' / '+total+' ligações';
    pill.className = 'result-pill show ' + (pairs===total?'good':'partial');
  }

  // ---------- multiple choice ----------
  function checkMC(ex){
    const box = document.querySelector('.exercise[data-ex="'+ex+'"]');
    const qs = box.querySelectorAll('.q[data-mc]');
    let ok=0;
    qs.forEach(q=>{
      const correct = q.dataset.correct;
      const chosen = q.querySelector('input[type="radio"]:checked');
      q.querySelectorAll('.choice').forEach(c=>c.classList.remove('correct','incorrect'));
      const id='mc:'+q.dataset.mc;
      if(chosen){
        const label = chosen.closest('.choice');
        if(chosen.value===correct){ label.classList.add('correct'); state[id]=true; ok++; }
        else {
          label.classList.add('incorrect'); state[id]=false;
          // highlight the right one
          q.querySelector('input[value="'+correct+'"]').closest('.choice').classList.add('correct');
        }
      } else { state[id]=false; }
    });
    save(state); refreshScore();
    const pill=document.getElementById('res'+ex);
    pill.textContent = ok+' / '+qs.length+' certas';
    pill.className='result-pill show '+(ok===qs.length?'good':'partial');
  }

  // ---------- writing ----------
  function saveWriting(){
    const txt = document.getElementById('writing').value.trim();
    state['writingText'] = txt;
    state['writing'] = txt.length > 40; // counts as done if substantial
    save(state); refreshScore();
    const pill=document.getElementById('res5');
    if(state['writing']){ pill.textContent='Texto guardado ✓'; pill.className='result-pill show good'; }
    else { pill.textContent='Escreve um pouco mais!'; pill.className='result-pill show partial'; }
  }

  // ---------- restore ----------
  function restore(){
    // text inputs
    document.querySelectorAll('.exercise[data-ex]').forEach(box=>{
      const ex = box.dataset.ex;
      box.querySelectorAll('input[type="text"]').forEach((inp,i)=>{
        const id='pt:'+ex+':'+i;
        if(state[id]===true){ inp.classList.add('correct'); }
      });
    });
    // writing
    if(state['writingText']) document.getElementById('writing').value = state['writingText'];
    refreshScore();
  }

  document.addEventListener('DOMContentLoaded', ()=>{ setupMatch(); restore(); });

  function resetAll(){
    if(!confirm('Recomeçar esta aula? A tua pontuação e respostas serão apagadas.')) return;
    localStorage.removeItem(LS_KEY); state={};
    location.reload();
  }

  // ---------- section jump-nav ----------
  (function(){
    const nav = document.getElementById('sectionNav');
    if (!nav) return;
    const sections = Array.from(document.querySelectorAll('.wrap > section'));
    const links = [];
    sections.forEach((sec, i) => {
      const h2 = sec.querySelector('.card > h2');
      if (!h2) return;
      const id = sec.id || ('sec-' + (i + 1));
      sec.id = id;
      const num = h2.querySelector('.num');
      // Use the heading text without the leading number badge for the label.
      let label = h2.textContent.trim();
      if (num) label = label.replace(num.textContent.trim(), '').trim();
      const a = document.createElement('a');
      a.className = 'section-nav-link';
      a.href = '#' + id;
      a.innerHTML = (num ? '<span class="sn-num">' + num.textContent.trim() + '</span>' : '') +
        '<span class="sn-label">' + label + '</span>';
      nav.appendChild(a);
      links.push({ a, sec });
    });
    if (!links.length) { nav.remove(); return; }

    // Highlight the section currently in view.
    if ('IntersectionObserver' in window) {
      const visible = new Set();
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        let current = null;
        for (const l of links) { if (visible.has(l.sec.id)) { current = l.sec.id; break; } }
        links.forEach(l => l.a.classList.toggle('active', l.sec.id === current));
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      links.forEach(l => io.observe(l.sec));
    }
  })();

  // ---------- homework lightbox ----------
  (function(){
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const pages = Array.from(document.querySelectorAll('#hwGallery .hw-page'));
    if (!pages.length) return;
    const img = document.getElementById('lbImg');
    const cap = document.getElementById('lbCap');
    let idx = 0, lastFocus = null;

    function show(i){
      idx = (i + pages.length) % pages.length;
      const btn = pages[idx];
      img.src = btn.dataset.src;
      img.alt = btn.querySelector('img').alt;
      cap.textContent = btn.dataset.cap;
    }
    function open(i){
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('lbClose').focus();
    }
    function close(){
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    pages.forEach((btn, i) => btn.addEventListener('click', () => open(i)));
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', () => show(idx - 1));
    document.getElementById('lbNext').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
  })();
