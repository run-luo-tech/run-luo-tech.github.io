(() => {
  // API host used by the provider's current official embed script.
  const endpoint = 'https://bsz.iirose.cn/api';
  const production = location.hostname === 'run-luo-tech.github.io';
  const card = document.querySelector('#visitor-welcome');
  const total = document.querySelector('#visit-total');
  const prefix = document.querySelector('#visit-prefix');
  const unit = document.querySelector('#visit-unit');
  const title = document.querySelector('#visitor-title');
  const message = document.querySelector('#visitor-message');
  const note = document.querySelector('#visitor-note');
  const close = document.querySelector('#visitor-close');
  const replay = document.querySelector('#visitor-replay');
  const canvas = document.querySelector('#welcome-fireworks');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let count = null;
  let finished = false;
  let frame = 0;
  let dismissTimer;
  const english = () => document.documentElement.lang === 'en';

  function render() {
    const en = english();
    title.textContent = count ? (en ? `Hello, visitor #${count.toLocaleString('en-US')}!` : `欢迎，访客 #${count.toLocaleString('zh-CN')}！`) : (en ? 'So glad you stopped by!' : '很高兴，在这里遇见你！');
    message.textContent = en ? 'Thanks for visiting Larry-Tech. Come back for more little creations!' : '感谢你来到 Larry-Tech，欢迎持续关注，一起期待下一个小作品！';
    note.textContent = count ? (en ? 'Your visit number · Repeat visits also count' : '这是本次访问序号 · 再次访问也会计数') : (en ? 'A little welcome, just for you.' : '送你一场小烟花，愿今天有好心情。');
    const unavailable = production && finished && !count;
    total.textContent = !production ? (en ? 'Local preview' : '本地预览') : count ? count.toLocaleString(en ? 'en-US' : 'zh-CN') : (unavailable ? (en ? 'Visit counter temporarily disconnected' : '访问计数暂未连接') : '…');
    prefix.hidden = unavailable;
    unit.hidden = unavailable || !production;
    close.setAttribute('aria-label', en ? 'Close welcome' : '关闭欢迎卡片');
  }

  function stopFireworks() {
    cancelAnimationFrame(frame);
    canvas.hidden = true;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  }

  function fireworks() {
    stopFireworks();
    if (reducedMotion.matches || document.hidden) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.hidden = false;
    const width = innerWidth;
    const height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);
    const colors = ['#743bf2', '#ff8d62', '#ffca52', '#ab79ff', '#45bfa5'];
    const bursts = [
      {x: width * .22, y: height * .28, delay: 0},
      {x: width * .76, y: height * .22, delay: 450},
      {x: width * .52, y: height * .4, delay: 950}
    ];
    const particles = bursts.flatMap(burst => Array.from({length: 38}, (_, i) => {
      const angle = i / 38 * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      return {...burst, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color: colors[i % colors.length]};
    }));
    const started = performance.now();
    function draw(now) {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const age = (now - started - p.delay) / 1000;
        if (age < 0 || age > 1.65) continue;
        ctx.globalAlpha = Math.max(0, 1 - age / 1.65);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + p.vx * age, p.y + p.vy * age + 55 * age * age, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      if (now - started < 2800) frame = requestAnimationFrame(draw);
      else stopFireworks();
    }
    frame = requestAnimationFrame(draw);
  }

  function dismiss() {
    clearTimeout(dismissTimer);
    card.hidden = true;
    stopFireworks();
    if (card.contains(document.activeElement)) replay.focus();
  }
  function show() {
    clearTimeout(dismissTimer);
    card.hidden = false;
    fireworks();
    dismissTimer = setTimeout(() => {
      if (!card.matches(':hover') && !card.contains(document.activeElement)) dismiss();
    }, 14000);
  }
  close.addEventListener('click', dismiss);
  replay.addEventListener('click', show);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopFireworks(); });
  reducedMotion.addEventListener('change', stopFireworks);
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});

  async function registerVisit() {
    // Preview never increments production totals. No client-side fake counters.
    if (!production) {
      total.textContent = english() ? 'Local preview' : '本地预览';
      show();
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      // The shared service persists PVs. Exactly one POST per page load; no retries.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'x-bsz-referer': 'https://run-luo-tech.github.io/'},
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Counter unavailable');
      const payload = await response.json();
      const value = payload.data?.site_pv;
      if (!payload.success || !Number.isSafeInteger(value) || value < 1) throw new Error('Invalid counter');
      count = value;
    } catch {
      // The welcome works even when the counter is blocked or unavailable.
    } finally {
      clearTimeout(timeout);
      finished = true;
      render();
      show();
    }
  }
  render();
  registerVisit();
})();
