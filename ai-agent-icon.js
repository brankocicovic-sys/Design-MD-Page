/**
 * <ai-agent-icon> — Animated AI agent gear-cog icon
 * ShopView Design System
 *
 * Attributes:
 *   size    — display size in px (default: 24)
 *   color   — stroke/fill color (default: currentColor)
 *   state   — "idle" | "thinking" (default: "idle")
 *
 * Usage:
 *   <script src="ai-agent-icon.js"></script>
 *   <ai-agent-icon size="24"></ai-agent-icon>
 *   <ai-agent-icon size="32" state="thinking" color="#fff"></ai-agent-icon>
 */

class AiAgentIcon extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'state'];
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._blinkTimer = null;
    this._spinBusy = false;
  }

  connectedCallback()  { this._render(); }
  disconnectedCallback() { clearTimeout(this._blinkTimer); }
  attributeChangedCallback() { if (this.isConnected) this._render(); }

  get _size()  { return parseFloat(this.getAttribute('size')  ?? '24'); }
  get _color() { return this.getAttribute('color') ?? 'currentColor'; }
  get _state() { return this.getAttribute('state') ?? 'idle'; }

  // ── Gear path ────────────────────────────────────────────────────────────
  // Cubic beziers with tangent-matched control points → G1-continuous joins.
  _buildGear() {
    const cx = 12, cy = 12, Ro = 11.1, Ri = 8.9, n = 8;
    const step = (Math.PI * 2) / n;
    const th   = step * 0.13;   // half-angle of tooth tip
    const sl   = step * 0.20;   // slope width (higher = gentler transition)
    const k    = 0.52;          // bezier tension

    const fmt = (r, a) =>
      `${(cx + r * Math.cos(a)).toFixed(3)} ${(cy + r * Math.sin(a)).toFixed(3)}`;

    const cp = (r, a, dist, dir) => {
      const x = cx + r * Math.cos(a) + dir * dist * (-Math.sin(a));
      const y = cy + r * Math.sin(a) + dir * dist * ( Math.cos(a));
      return `${x.toFixed(3)} ${y.toFixed(3)}`;
    };

    let d = '';
    for (let i = 0; i < n; i++) {
      const m    = i * step - Math.PI / 2;
      const aVL  = m - th - sl;
      const aTL  = m - th;
      const aTR  = m + th;
      const aVR  = m + th + sl;
      const aVLn = (i + 1) * step - Math.PI / 2 - th - sl;
      const di   = Ri * sl * k;
      const do_  = Ro * sl * k;

      if (i === 0) d += `M${fmt(Ri, aVL)}`;
      d += ` C${cp(Ri, aVL, di, +1)} ${cp(Ro, aTL, do_, -1)} ${fmt(Ro, aTL)}`;
      d += ` A${Ro} ${Ro} 0 0 1 ${fmt(Ro, aTR)}`;
      d += ` C${cp(Ro, aTR, do_, +1)} ${cp(Ri, aVR, di, -1)} ${fmt(Ri, aVR)}`;
      d += ` A${Ri} ${Ri} 0 0 1 ${fmt(Ri, aVLn)}`;
    }
    return d + ' Z';
  }

  // ── Render ───────────────────────────────────────────────────────────────
  _render() {
    clearTimeout(this._blinkTimer);
    this._spinBusy = false;

    const size     = this._size;
    const color    = this._color;
    const thinking = this._state === 'thinking';
    const gearD    = this._buildGear();

    this._root.innerHTML = `
      <style>
        :host {
          display: inline-block;
          line-height: 0;
          cursor: pointer;
        }

        svg { display: block; overflow: visible; }

        /* Gear */
        .gear {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .gear.thinking {
          animation: spin-loop 3.6s linear infinite;
        }

        /* Eyes */
        .eye-dot {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: look 6s ease-in-out infinite;
        }
        .eye-dot.thinking {
          animation: pulse 1.1s ease-in-out infinite;
        }
        .eye-l {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .eye-l.blink {
          animation: blink .22s ease-in-out forwards;
        }

        /* Keyframes */
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-loop {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes look {
          0%,  10%  { transform: translateX(0px); }
          22%, 42%  { transform: translateX(-.65px); }
          52%, 72%  { transform: translateX(.65px); }
          82%, 100% { transform: translateX(0px); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1);   opacity: 1; }
          50%     { transform: scale(.54); opacity: .45; }
        }
        @keyframes blink {
          0%   { transform: scaleY(1); }
          38%  { transform: scaleY(.06); }
          100% { transform: scaleY(1); }
        }
      </style>

      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
           style="color:${color}">
        <g class="gear${thinking ? ' thinking' : ''}">
          <path d="${gearD}" stroke="currentColor" stroke-width="2"
                stroke-linejoin="round" stroke-linecap="round" fill="none"/>
        </g>
        <g class="eye-l">
          <circle cx="8.8" cy="12" r="1.3" fill="currentColor"
                  class="eye-dot${thinking ? ' thinking' : ''}"/>
        </g>
        <circle cx="15.2" cy="12" r="1.3" fill="currentColor"
                class="eye-dot${thinking ? ' thinking' : ''}"/>
      </svg>`;

    if (!thinking) {
      this._initHover();
      this._scheduleBlink();
    }
  }

  // ── Hover spin ───────────────────────────────────────────────────────────
  _initHover() {
    const svg  = this._root.querySelector('svg');
    const gear = this._root.querySelector('.gear');

    svg.addEventListener('mouseenter', () => {
      if (this._spinBusy || this._state === 'thinking') return;
      this._spinBusy = true;
      gear.style.animation = 'none';
      gear.getBoundingClientRect(); // force reflow
      gear.style.animation = 'spin-once 1.05s cubic-bezier(0,0,.18,1) forwards';
      gear.addEventListener('animationend', () => {
        gear.style.animation = '';
        this._spinBusy = false;
      }, { once: true });
    });
  }

  // ── Blink scheduler ──────────────────────────────────────────────────────
  _scheduleBlink() {
    this._blinkTimer = setTimeout(() => {
      if (this._state === 'thinking') return;
      const eyeL = this._root.querySelector('.eye-l');
      if (eyeL) {
        eyeL.classList.remove('blink');
        eyeL.getBoundingClientRect();
        eyeL.classList.add('blink');
        eyeL.addEventListener('animationend',
          () => eyeL.classList.remove('blink'), { once: true });
      }
      this._scheduleBlink();
    }, 2000 + Math.random() * 5000);
  }
}

customElements.define('ai-agent-icon', AiAgentIcon);
