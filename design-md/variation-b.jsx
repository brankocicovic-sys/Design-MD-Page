// Variation A - Editorial Dossier - v2
// Long-scroll editorial layout. Sticky TOC. Large display type. Generous whitespace.

const VA_TOKENS = {
  blue: '#257CFF', blueHover: '#1752C0', blueDark: '#0868A7',
  ink: '#0F111A', text: '#202939', muted: '#4B5565', soft: '#697586',
  line: '#E3E8EF', strongLine: '#CDD5DF',
  bg: '#FFFFFF', bgWarm: '#FFFAEB', bgCool: '#E9F5FF', bgGrey: '#F8FAFC',
};

// ElevenLabs-inspired card: 8px radius, hairline border, soft surface with subtle inner highlight
const VA_CARD = {
  background: '#FFFFFF',
  border: `1px solid ${VA_TOKENS.line}`,
  borderRadius: 8,
  boxShadow: '0 1px 0 rgba(15,17,26,0.02), 0 1px 2px rgba(15,17,26,0.04)',
};

function VAContainer({ children, narrow }) {
  return <div style={{ maxWidth: narrow ? 860 : 1280, margin: '0 auto', padding: '0 64px' }}>{children}</div>;
}

function VAEyebrow({ children, color = VA_TOKENS.blue }) {
  return <div style={{
    fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
    color, fontFamily: 'var(--sv-font-ui)',
  }}>{children}</div>;
}

function VAHeader({ density }) {
  return (
    <header style={{
      borderBottom: `1px solid ${VA_TOKENS.line}`, background: VA_TOKENS.bg,
      position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'saturate(150%) blur(8px)',
    }}>
      <VAContainer>
        <div style={{ height: density === 'compact' ? 56 : 64, display: 'flex', alignItems: 'center', gap: 32 }}>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}
            aria-label="Back to top"
            style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, cursor: 'pointer' }}
          >
            <img src="logo-primary-light.svg" alt="Shopview" style={{ height: 22 }} />
          </a>
          <nav style={{ display: 'flex', gap: 24, marginLeft: 'auto', fontSize: 13, color: VA_TOKENS.muted, fontWeight: 500 }}>
            <a style={{ color: 'inherit' }} href="#logo">Logo</a>
            <a style={{ color: 'inherit' }} href="#color">Color</a>
            <a style={{ color: 'inherit' }} href="#type">Type</a>
            <a style={{ color: 'inherit' }} href="#space">Space</a>
            <a style={{ color: 'inherit' }} href="#icons">Icons</a>
            <a style={{ color: 'inherit' }} href="#components">Components</a>
          </nav>
          <span style={{ fontSize: 12, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>v1.0 · May 2026</span>
        </div>
      </VAContainer>
    </header>
  );
}

function VAHeroSearch() {
  const QUERY = 'WO-1041';
  const [phase, setPhase] = React.useState(0);
  const [cursorVis, setCursorVis] = React.useState(true);

  // Cursor blink
  React.useEffect(() => {
    const t = setInterval(() => setCursorVis(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Phase delays (ms before advancing to next phase)
  const delays = [1200, 120,120,120,120,120,120,120, 350, 160, 160, 200, 260, 200, 260, 200, 260, 200, 2800];

  React.useEffect(() => {
    const delay = delays[phase] ?? 1200;
    const t = setTimeout(() => setPhase(p => (p >= delays.length - 1 ? 0 : p + 1)), delay);
    return () => clearTimeout(t);
  }, [phase]);

  // Derived visual state
  const typed    = phase >= 1 ? QUERY.slice(0, Math.min(phase, 7)) : '';
  const showCursor = phase < 9;
  const showTabs = phase >= 9;
  const showS1   = phase >= 10;
  const showR1   = phase >= 11;
  const showS2   = phase >= 12;
  const showR2   = phase >= 13;
  const showS3   = phase >= 14;
  const showR3   = phase >= 15;
  const showS4   = phase >= 16;
  const showR4   = phase >= 17;

  const appear = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(6px)',
    transition: 'opacity 240ms ease, transform 240ms ease',
    pointerEvents: visible ? 'auto' : 'none',
  });

  // Icons — using design system icon files (same as global search component)
  const grey500Filter = 'brightness(0) saturate(100%) invert(45%) sepia(12%) saturate(600%) hue-rotate(179deg) brightness(97%) contrast(85%)';
  const SearchIco = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={typed ? '#364152' : '#9AA4B2'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
  const WOIco    = () => <img src="../preview/icons/work-order-20.svg" width="20" height="20" alt="" style={{ display: 'block', filter: grey500Filter }} />;
  const UserIco  = () => <img src="../preview/icons/user-20.svg"       width="20" height="20" alt="" style={{ display: 'block', filter: grey500Filter }} />;
  const PartsIco = () => <img src="../preview/icons/settings-20.svg"   width="20" height="20" alt="" style={{ display: 'block', filter: grey500Filter }} />;
  const AssetIco = () => <img src="../preview/icons/truck-20.svg"      width="20" height="20" alt="" style={{ display: 'block', filter: grey500Filter }} />;

  const EntityBox = ({ children }) => (
    <div style={{ width: 36, height: 36, borderRadius: 12, background: '#EEF2F6', border: '1px solid #E3E8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{children}</div>
  );

  const Hl = ({ text }) => {
    if (!typed) return <>{text}</>;
    const lo = text.toLowerCase(), q = typed.toLowerCase();
    const idx = lo.indexOf(q);
    if (idx === -1) return <>{text}</>;
    return <>{text.slice(0, idx)}<span style={{ background: '#FEDF89', borderRadius: 2 }}>{text.slice(idx, idx + typed.length)}</span>{text.slice(idx + typed.length)}</>;
  };

  const SBadge = ({ label, type = 'neutral' }) => {
    const s = { success: { background: '#EDFCF2', border: '1px solid #73E2A3', color: '#087443' }, info: { background: '#E9F5FF', border: '1px solid #82C1FB', color: '#175CD3' }, warning: { background: '#FFFCF5', border: '1px solid #FEDF89', color: '#B54708' }, neutral: { background: '#EEF2F6', border: '1px solid #CDD5DF', color: '#373A41' } }[type] || {};
    return <span style={{ fontSize: 11, fontWeight: 500, height: 20, padding: '0 7px', borderRadius: 9999, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', ...s }}>{label}</span>;
  };

  const SectionLbl = ({ label }) => (
    <div style={{ padding: '6px 16px 2px', fontSize: 11, fontWeight: 600, color: '#697586', letterSpacing: '0.03em' }}>{label}</div>
  );

  const Row = ({ icon, title, badge, badgeType, meta }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px', borderRadius: 10, minHeight: 48 }}>
      <EntityBox>{icon}</EntityBox>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0F111A', lineHeight: '18px' }}><Hl text={title} /></span>
          {badge && <SBadge label={badge} type={badgeType} />}
        </div>
        {meta && <div style={{ fontSize: 12, color: '#697586', lineHeight: '16px' }}>{meta}</div>}
      </div>
    </div>
  );

  const tabLabels = ['All', 'Work Orders', 'Customers', 'Assets', 'Parts'];

  return (
    <div style={{ background: '#fff', border: '4px solid #EEF2F6', borderRadius: 14, boxShadow: '0 8px 8px -4px rgba(16,24,40,0.03), 0 20px 24px -4px rgba(16,24,40,0.08)', overflow: 'hidden', fontFamily: 'var(--sv-font-ui)', width: '100%' }}>
      {/* Search header */}
      <div style={{ height: 50, background: '#fff', borderBottom: '1px solid #EEF2F6', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
        <SearchIco />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: typed ? '#0F111A' : '#9AA4B2', display: 'flex', alignItems: 'center', gap: 0 }}>
          {typed || 'Search or ask a question'}
          {showCursor && (
            <span style={{ display: 'inline-block', width: 1.5, height: 14, background: '#257CFF', marginLeft: 1, opacity: cursorVis ? 1 : 0, verticalAlign: 'middle', transition: 'opacity 80ms' }} />
          )}
        </span>
      </div>

      {/* Results body */}
      <div style={{ minHeight: 220, paddingBottom: 6 }}>
        {/* Filter tabs */}
        <div style={{ ...appear(showTabs), display: 'flex', gap: 2, padding: '10px 8px 4px', flexWrap: 'wrap' }}>
          {tabLabels.map((l, i) => (
            <button key={l} style={{ height: 26, padding: '0 10px', border: 0, background: i === 0 ? '#EEF2F6' : 'transparent', borderRadius: 6, fontSize: 13, fontWeight: 500, color: i === 0 ? '#0F111A' : '#697586', cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
          ))}
        </div>

        <div style={appear(showS1)}><SectionLbl label="Work orders (1)" /></div>
        <div style={{ padding: '0 8px', ...appear(showR1) }}>
          <Row icon={<WOIco />} title="WO-1041 Fisquare Farms" badge="In Progress" badgeType="info" meta="M. Diaz · Apr 27, 2026" />
        </div>

        <div style={appear(showS2)}><SectionLbl label="Customers (1)" /></div>
        <div style={{ padding: '0 8px', ...appear(showR2) }}>
          <Row icon={<UserIco />} title="Fisquare Farms" meta="923 Ross Islands, X1T 2B1" />
        </div>

        <div style={appear(showS3)}><SectionLbl label="Parts (1)" /></div>
        <div style={{ padding: '0 8px', ...appear(showR3) }}>
          <Row icon={<PartsIco />} title="Lube Filter · FL-1A" meta="WO-1041 · qty 2 · $18.40 ea" />
        </div>

        <div style={appear(showS4)}><SectionLbl label="Assets (1)" /></div>
        <div style={{ padding: '0 8px', ...appear(showR4) }}>
          <Row icon={<AssetIco />} title="2019 Freightliner M2 106" badge="On Site" badgeType="success" meta="Fisquare Farms · 1FD0W5HY2EEA05499" />
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: 38, background: '#F8FAFC', borderTop: '1px solid #EEF2F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', gap: 14 }}>
          {[['↑↓', 'Navigate'], ['↵', 'Select']].map(([k, lbl]) => (
            <div key={k} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <kbd style={{ fontSize: 10, fontWeight: 600, color: '#697586', background: '#E3E8EF', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--sv-font-ui)' }}>{k}</kbd>
              <span style={{ fontSize: 11, color: '#697586' }}>{lbl}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#697586' }}>Close</span>
          <kbd style={{ fontSize: 10, fontWeight: 600, color: '#697586', background: '#E3E8EF', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--sv-font-ui)' }}>esc</kbd>
        </div>
      </div>
    </div>
  );
}

function VAHero() {
  return (
    <section style={{ padding: '120px 0 96px', background: VA_TOKENS.bg }}>
      <VAContainer>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>
          <div>
            <VAEyebrow>Shopview Design System · Edition 01</VAEyebrow>
            <h1 style={{
              fontFamily: 'var(--sv-font-display)', fontSize: 88, lineHeight: 0.96,
              fontWeight: 700, letterSpacing: '-0.035em', color: VA_TOKENS.ink, margin: '24px 0 0',
              textWrap: 'balance',
            }}>
              The system<br/>
              that runs the<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 700, color: VA_TOKENS.blue }}>shop floor.</em>
            </h1>
            <p style={{
              fontSize: 19, lineHeight: 1.55, color: VA_TOKENS.muted, marginTop: 32, maxWidth: 560,
              textWrap: 'pretty',
            }}>
              A reference document for the visual and verbal language of Shopview - built for the people who service semi-trucks, tractors, trailers, and fleet vehicles. Functional, not friendly. Direct, not decorative.
            </p>
          </div>
          <VAHeroSearch />
        </div>
      </VAContainer>
    </section>
  );
}

function VASectionHead({ n, kicker, title, lede, id }) {
  return (
    <div id={id} style={{ paddingTop: 96, paddingBottom: 32 }}>
      <VAContainer>
        <VAEyebrow>{n} · {kicker}</VAEyebrow>
        <h2 style={{
          fontFamily: 'var(--sv-font-display)', fontSize: 56, lineHeight: 1.0,
          fontWeight: 600, letterSpacing: '-0.025em', color: VA_TOKENS.ink, margin: '12px 0 0',
        }}>{title}</h2>
        {lede && <p style={{ fontSize: 17, lineHeight: 1.6, color: VA_TOKENS.muted, margin: '20px 0 0', maxWidth: 640 }}>{lede}</p>}
      </VAContainer>
    </div>
  );
}

// 02. Logo
function VALogo() {
  return (
    <section>
      <VASectionHead n="01" id="logo" kicker="Mark & Wordmark" title="One blue. One mark."
        lede="The wordmark sets in Inter Display 800 italic with a custom symbol replacing the 'o'. Brand blue #257CFF is the only fill." />
      <VAContainer>
        <div>
          <div style={{
            background: VA_TOKENS.bgGrey, border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8,
            padding: '80px 64px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="logo-primary-light.svg" alt="Shopview wordmark" style={{ width: 420 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
              {[
                { bg: VA_TOKENS.bg, label: 'On surface · #FFFFFF', note: 'Default' },
                { bg: VA_TOKENS.bgGrey, label: 'On grey-25 · #F8FAFC', note: 'Subdued' },
                { bg: VA_TOKENS.blue, label: 'On brand · #257CFF', note: 'Inverse - wordmark white', invert: true },
              ].map((o, i) => (
                <div key={i} style={{
                  ...VA_CARD, background: o.bg,
                  padding: 32, display: 'flex', flexDirection: 'column', gap: 24,
                  height: 200, justifyContent: 'space-between',
                }}>
                  <img src="symbol-primary.svg" alt="" style={{ height: 36, width: 36, filter: o.invert ? 'brightness(0) invert(1)' : 'none' }} />
                  <div>
                    <div style={{ fontSize: 12, color: o.invert ? '#fff' : VA_TOKENS.muted, fontFamily: 'var(--sv-font-mono)' }}>{o.label}</div>
                    <div style={{ fontSize: 12, color: o.invert ? 'rgba(255,255,255,0.7)' : VA_TOKENS.soft, marginTop: 4 }}>{o.note}</div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </VAContainer>
    </section>
  );
}

// 02. Color
function VAColor() {
  const groups = [
    {
      label: 'Brand',
      cols: 4,
      swatches: [
        { name: 'primary (Blue)', hex: '#257CFF', desc: 'Shopview Blue - primary CTA, links, active states.', fg: '#ffffff' },
        { name: 'primary-active', hex: '#1752C0', desc: 'Hover / press state for primary.', fg: '#ffffff' },
      ],
    },
    {
      label: 'Surface',
      cols: 4,
      swatches: [
        { name: 'canvas', hex: '#FFFFFF', desc: 'Default page and card surface.' },
        { name: 'canvas-soft', hex: '#F8FAFC', desc: 'Off-white page floor, subtle band.' },
        { name: 'canvas-sub', hex: '#EEF2F6', desc: 'Side panel and sub-sidebar.' },
      ],
    },
    {
      label: 'Text',
      cols: 4,
      swatches: [
        { name: 'ink', hex: '#0F111A', desc: 'Headings, high-contrast text.', fg: '#ffffff' },
        { name: 'body', hex: '#202939', desc: 'Default body copy.', fg: '#ffffff' },
        { name: 'muted', hex: '#4B5565', desc: 'Secondary text, helper copy.', fg: '#ffffff' },
      ],
    },
    {
      label: 'Border',
      cols: 4,
      swatches: [
        { name: 'hairline', hex: '#E3E8EF', desc: 'Default 1px container border.' },
        { name: 'divider', hex: '#CDD5DF', desc: 'Strong dividers, input borders.' },
      ],
    },
    {
      label: 'Semantic',
      cols: 4,
      swatches: [
        { name: 'success', hex: '#36B360', desc: 'Paid, Completed, Approved.', fg: '#ffffff' },
        { name: 'warning', hex: '#EC9E00', desc: 'Authorization Required, Awaiting.', fg: '#ffffff' },
        { name: 'error', hex: '#EF4444', desc: 'Overdue, destructive actions.', fg: '#ffffff' },
        { name: 'info', hex: '#257CFF', desc: 'Tips, sync notifications.', fg: '#ffffff' },
      ],
    },
  ];

  const Swatch = ({ s }) => (
    <div style={{
      background: '#FFFFFF',
      border: `1px solid ${VA_TOKENS.line}`,
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        background: s.hex,
        height: 100,
        borderBottom: s.hex.toLowerCase() === '#ffffff' ? `1px solid ${VA_TOKENS.line}` : 'none',
      }} />
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'var(--sv-font-ui)', fontSize: 16, fontWeight: 600, color: VA_TOKENS.ink, letterSpacing: '-0.005em' }}>{s.name}</div>
        <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 14, color: VA_TOKENS.soft }}>{s.hex.toLowerCase()}</div>
        <div style={{ fontFamily: 'var(--sv-font-ui)', fontSize: 14, lineHeight: 1.45, color: VA_TOKENS.text, marginTop: 2 }}>{s.desc}</div>
      </div>
    </div>
  );

  return (
    <section>
      <VASectionHead n="02" id="color" kicker="Palette & Tokens" title="Blue-led, slate-structured."
        lede="One action blue. A slate-grey ladder for structure. Four semantic colors for status - never for decoration." />
      <VAContainer>
        <div style={{
          background: '#F2F3F5',
          border: `1px solid ${VA_TOKENS.line}`,
          borderRadius: 16,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}>
          {groups.map(g => (
            <div key={g.label}>
              <div style={{
                fontFamily: 'var(--sv-font-ui)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: VA_TOKENS.ink,
                marginBottom: 20,
              }}>{g.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${g.cols}, 1fr)`, gap: 20 }}>
                {g.swatches.map(s => <Swatch key={s.name} s={s} />)}
              </div>
            </div>
          ))}
        </div>
      </VAContainer>
    </section>
  );
}

// 04. Typography
function VAType() {
  const scale = [
    ['H1', 'Display 600', '30 / 38', 'Page titles'],
    ['H2', 'Display 600', '24 / 32', 'Section titles'],
    ['H3', 'UI 500', '20 / 28', 'Subsection'],
    ['H4', 'UI 600', '16 / 24', 'Card titles'],
    ['Body 1', 'UI 400', '14 / 20', 'Default body'],
    ['Body 2', 'UI 500', '12 / 16', 'Labels, meta'],
    ['Caption', 'UI 600', '10 / 14', 'Eyebrows, micro'],
  ];
  return (
    <section>
      <VASectionHead n="03" id="type" kicker="Type System" title="Inter, two cuts."
        lede="Inter at 18pt for UI and body. Inter Display at 28pt for headlines where the tighter optical cut reads better at scale." />
      <VAContainer>
        <div>
          <div style={{
            ...VA_CARD, padding: '64px 48px',
          }}>
            <div style={{ fontFamily: 'var(--sv-font-display)', fontSize: 180, lineHeight: 0.9, fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.05em', color: VA_TOKENS.blue }}>Aa</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, marginTop: 32, paddingTop: 32, borderTop: `1px solid ${VA_TOKENS.line}` }}>
              <div>
                <div style={{ fontSize: 12, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>UI · 18pt</div>
                <div style={{ fontFamily: 'var(--sv-font-ui)', fontSize: 48, fontWeight: 600, color: VA_TOKENS.ink, marginTop: 24 }}>Inter</div>
                <div style={{ fontSize: 13, color: VA_TOKENS.muted, marginTop: 24 }}>The grotesque that runs every screen.</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>Display · 28pt</div>
                <div style={{ fontFamily: 'var(--sv-font-display)', fontSize: 48, fontWeight: 700, color: VA_TOKENS.ink, marginTop: 24 }}>Inter Display</div>
                <div style={{ fontSize: 13, color: VA_TOKENS.muted, marginTop: 24 }}>For H1/H2 only - tighter aperture at scale.</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, ...VA_CARD, overflow: 'hidden' }}>
            {scale.map(([n, w, lh, use], i) => (
              <div key={n} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 140px 120px 1fr',
                alignItems: 'baseline', gap: 24, padding: '20px 28px',
                borderTop: i ? `1px solid ${VA_TOKENS.line}` : 'none',
              }}>
                <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.blue }}>{n}</div>
                <div style={{
                  fontFamily: i < 2 ? 'var(--sv-font-display)' : 'var(--sv-font-ui)',
                  fontSize: parseInt(lh.split('/')[0]),
                  lineHeight: `${parseInt(lh.split('/')[1])}px`,
                  fontWeight: parseInt(w.split(' ')[1]),
                  color: VA_TOKENS.ink,
                }}>Fleet service & repairs</div>
                <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>{w}</div>
                <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>{lh}</div>
                <div style={{ fontSize: 12, color: VA_TOKENS.muted }}>{use}</div>
              </div>
            ))}
          </div>
        </div>
      </VAContainer>
    </section>
  );
}

// 05. Spacing
function VASpacing() {
  const scale = [
    [1, 4], [2, 8], [3, 12], [4, 16], [5, 20], [6, 24], [8, 32], [10, 40],
    [12, 48], [16, 64], [20, 80], [24, 96],
  ];
  const radii = [
    ['xs', 4, 'Inputs (compact)'],
    ['sm', 6, 'Inline tags'],
    ['md', 8, 'Buttons, inputs, cards'],
    ['lg', 12, 'Large cards, modals'],
    ['xl', 16, 'Modal outer'],
    ['pill', 999, 'Badges, toggles'],
  ];
  return (
    <section>
      <VASectionHead n="04" id="space" kicker="Grid & Geometry" title="Built on a 4-pixel grid."
        lede="Every spacing token is a multiple of 4. Radii follow the same logic - 8px is the workhorse." />
      <VAContainer>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <div style={{ ...VA_CARD, padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: VA_TOKENS.ink, margin: '0 0 20px' }}>Spacing scale</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {scale.map(([n, px]) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 60px', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>space-{n}</span>
                    <div style={{ height: 8, background: VA_TOKENS.bgCool, position: 'relative' }}>
                      <div style={{ height: '100%', width: px, background: VA_TOKENS.blue }} />
                    </div>
                    <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.text, textAlign: 'right' }}>{px}px</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...VA_CARD, padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: VA_TOKENS.ink, margin: '0 0 20px' }}>Radii</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {radii.map(([n, r, use]) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 60px', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, background: VA_TOKENS.blue, borderRadius: r === 999 ? 999 : r }} />
                    <div>
                      <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.text }}>radius-{n}</div>
                      <div style={{ fontSize: 12, color: VA_TOKENS.soft, marginTop: 2 }}>{use}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft, textAlign: 'right' }}>{r === 999 ? '∞' : `${r}px`}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </VAContainer>
    </section>
  );
}

// 05. Iconography
const _svgIconCache = {};

function SVGIcon({ file, size }) {
  const [svg, setSvg] = React.useState(_svgIconCache[file] || null);
  React.useEffect(() => {
    if (_svgIconCache[file]) { setSvg(_svgIconCache[file]); return; }
    fetch(file).then(r => r.ok ? r.text() : Promise.reject()).then(txt => {
      let t = txt.replace(/(<svg[^>]*)\s+width="[^"]*"/i, '$1').replace(/(<svg[^>]*)\s+height="[^"]*"/i, '$1');
      _svgIconCache[file] = t; setSvg(t);
    }).catch(() => {});
  }, [file]);
  if (!svg) return <img src={file} alt="" style={{ width: size, height: size, display: 'block' }} />;
  return (
    <div style={{ width: size, height: size, lineHeight: 0, overflow: 'visible', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg.replace(/<svg/, `<svg width="${size}" height="${size}" style="overflow:visible;display:block"`) }}
    />
  );
}

function ConstructionFrame({ size, children }) {
  const PAD = 9; // breathing room between icon and frame
  const TOTAL = size + PAD * 2;
  const T = 8;   // tick length
  const C = 'rgba(154,164,178,0.55)';
  const tick = s => <div style={{ position: 'absolute', background: C, ...s }} />;
  return (
    <div style={{ position: 'relative', width: TOTAL, height: TOTAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, border: '1px solid ' + C, pointerEvents: 'none' }} />
      {tick({ top: -T, left: 0, width: '1px', height: T })}
      {tick({ top: 0, left: -T, width: T, height: '1px' })}
      {tick({ top: -T, right: 0, width: '1px', height: T })}
      {tick({ top: 0, right: -T, width: T, height: '1px' })}
      {tick({ bottom: -T, left: 0, width: '1px', height: T })}
      {tick({ bottom: 0, left: -T, width: T, height: '1px' })}
      {tick({ bottom: -T, right: 0, width: '1px', height: T })}
      {tick({ bottom: 0, right: -T, width: T, height: '1px' })}
      {children}
    </div>
  );
}

function VAIcons() {
  const iconShowcase = [
    { name: 'Done',       file: '../preview/icons/fig-check-verified.svg' },
    { name: 'Asset',      file: '../preview/icons/truck-20.svg' },
    { name: 'Work Order', file: '../preview/icons/work-order-20.svg' },
    { name: 'Clock In',   file: '../preview/icons/fig-clock.svg' },
    { name: 'Technician', file: '../preview/icons/tool-16.svg' },
    { name: 'Edit',       file: '../preview/icons/fig-edit-2.svg' },
  ];
  const SIZES = [24, 20, 16];
  const CELL = 54; const GAP = 10;
  const gridCols = `28px repeat(${iconShowcase.length}, ${CELL}px)`;
  const FRAMED = new Set(['0-1', '1-1', '2-1']); // Truck column, all three sizes

  return (
    <section>
      <VASectionHead n="05" id="icons" kicker="Iconography" title="Outlined. 1.3-2px stroke."
        lede="Icons are line-only with rounded joins, sized at 16, 20 or 24px." />
      <VAContainer>
        <div style={{
          background: '#F2F3F5', border: `1px solid ${VA_TOKENS.line}`,
          borderRadius: 16, overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 340,
        }}>

          {/* Left: info panel */}
          <div style={{ padding: '52px', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontFamily: 'var(--sv-font-display)', fontSize: 42, fontWeight: 700,
              color: VA_TOKENS.ink, lineHeight: 1.04, letterSpacing: '-0.028em',
            }}>UI Icons</div>

            <p style={{ fontSize: 14, lineHeight: 1.65, color: VA_TOKENS.muted, margin: '20px 0 0' }}>
              Custom icons built for the shop floor.{' '}
              <strong style={{ color: VA_TOKENS.text }}>150+ icons</strong>{' '}
              across 9 semantic categories - legible at every size.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {['Outlined', '1.3-2px stroke', '24×24', '20×20', '16×16'].map(tag => (
                <span key={tag} style={{
                  padding: '4px 10px', border: '1px solid #CACFD6', borderRadius: 999,
                  fontSize: 12, fontWeight: 500, color: '#4B5565',
                  background: '#F2F3F5', lineHeight: '18px',
                }}>{tag}</span>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', gap: 12 }}>
              <a href="../preview/icons.html" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: VA_TOKENS.blue, color: '#fff',
                padding: '9px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14,
                textDecoration: 'none', fontFamily: 'var(--sv-font-ui)',
              }}>View Icons →</a>
            </div>
          </div>

          {/* Right: icon grid with dot background */}
          <div style={{
            backgroundColor: '#fff',
            backgroundImage: 'radial-gradient(circle, rgba(154,164,178,0.35) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            borderLeft: `1px solid ${VA_TOKENS.line}`,
            padding: '52px 48px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: GAP, overflow: 'visible',
          }}>
            {SIZES.map((sz, si) => (
              <div key={sz} style={{ display: 'grid', gridTemplateColumns: gridCols, gap: GAP, alignItems: 'center', overflow: 'visible' }}>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, color: VA_TOKENS.soft, textAlign: 'right', paddingRight: 2, lineHeight: 1 }}>{sz}</span>
                {iconShowcase.map(({ name, file }, ii) => {
                  const framed = FRAMED.has(`${si}-${ii}`);
                  const iconEl = <SVGIcon file={file} size={sz} />;
                  return (
                    <div key={name} style={{ width: CELL, height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                      {framed ? <ConstructionFrame size={sz}>{iconEl}</ConstructionFrame> : iconEl}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Name labels */}
            <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: GAP, marginTop: 4 }}>
              <div />
              {iconShowcase.map(({ name }) => (
                <div key={name} style={{ textAlign: 'center', fontSize: 10, color: VA_TOKENS.soft, lineHeight: 1.3, fontFamily: 'var(--sv-font-mono)' }}>{name}</div>
              ))}
            </div>

            {/* Bracket label */}
            <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: GAP, marginTop: 2 }}>
              <div />
              <div style={{ gridColumn: `2 / ${iconShowcase.length + 2}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 1, background: VA_TOKENS.strongLine }} />
                <span style={{ fontSize: 10, color: VA_TOKENS.soft, fontStyle: 'italic', whiteSpace: 'nowrap', fontFamily: 'var(--sv-font-ui)' }}>24 · 20 · 16px</span>
                <div style={{ flex: 1, height: 1, background: VA_TOKENS.strongLine }} />
              </div>
            </div>
          </div>

        </div>
      </VAContainer>
    </section>
  );
}

// Buttons comprehensive showcase
function VAButtonsShowcase() {
  const baseBtn = {
    borderRadius: 8, fontWeight: 600, display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', gap: 6, fontFamily: 'var(--sv-font-ui)', border: '1px solid transparent',
    cursor: 'pointer', transition: 'none', outline: 'none',
    // md size default
    height: 36, padding: '0 14px', fontSize: 14,
  };

  const Caret = () => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 5.25L7 8.75l3.5-3.5" />
    </svg>
  );

  const SubLabel = ({ children }) => (
    <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, color: VA_TOKENS.soft, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
      {children}
    </div>
  );

  const ColHead = ({ children }) => (
    <div style={{ padding: '9px 0', fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {children}
    </div>
  );

  // variant × state table data
  const variantRows = [
    {
      name: 'Primary',
      note: 'Main CTA - one per view',
      states: [
        { bg: '#257CFF', color: '#fff', borderColor: 'transparent', shadow: '0px 2px 2px 0px #D8ECFF' },
        { bg: '#1752C0', color: '#fff', borderColor: 'transparent', shadow: '0px 2px 2px 0px #D8ECFF' },
        { bg: '#257CFF', color: '#fff', borderColor: 'transparent', shadow: '0 0 0 4px rgba(37,124,255,0.24), 0px 2px 2px 0px #D8ECFF' },
        { bg: '#BEDFFF', color: '#fff', borderColor: 'transparent', shadow: '0px 2px 2px 0px #D8ECFF', dim: true },
      ],
    },
    {
      name: 'Secondary',
      note: 'Supporting actions',
      states: [
        { bg: '#fff', color: '#344054', borderColor: '#D0D5DD', shadow: '0 1px 2px rgba(16,24,40,0.05)' },
        { bg: '#EEF2F6', color: '#1D2939', borderColor: '#D0D5DD', shadow: '0 1px 2px rgba(16,24,40,0.05)' },
        { bg: '#fff', color: '#344054', borderColor: '#D0D5DD', shadow: '0 0 0 4px #F2F4F7, 0 1px 2px rgba(16,24,40,0.05)' },
        { bg: '#fff', color: '#D0D5DD', borderColor: '#EAECF0', shadow: '0 1px 2px rgba(16,24,40,0.05)', dim: true },
      ],
    },
    {
      name: 'Tertiary',
      note: 'Low-priority text actions',
      states: [
        { bg: 'transparent', color: '#344054', borderColor: 'transparent' },
        { bg: '#EEF2F6', color: '#1D2939', borderColor: 'transparent' },
        { bg: 'transparent', color: '#344054', borderColor: 'transparent', shadow: '0 0 0 4px #F2F4F7' },
        { bg: 'transparent', color: '#D0D5DD', borderColor: 'transparent', dim: true },
      ],
    },
  ];

  const stateHeads = ['Default', 'Hover', 'Focus', 'Disabled'];

  const splitVariants = [
    {
      name: 'Split · Primary',
      states: [
        { bg: '#257CFF', color: '#fff', divider: '#2170E6', shadow: '0px 2px 2px 0px #D8ECFF', border: 'none', label: 'Default' },
        { bg: '#175CD3', color: '#fff', divider: '#134FB6', shadow: '0px 2px 2px 0px #D8ECFF', border: 'none', label: 'Hover' },
        { bg: '#257CFF', color: '#fff', divider: '#2170E6', shadow: '0 0 0 4px rgba(37,124,255,0.24), 0px 2px 2px 0px #D8ECFF', border: 'none', label: 'Focus' },
        { bg: '#BEDFFF', color: '#fff', divider: 'rgba(255,255,255,.3)', shadow: '0px 2px 2px 0px #D8ECFF', border: 'none', dim: true, label: 'Disabled' },
      ],
    },
    {
      name: 'Split · Secondary',
      states: [
        { bg: '#fff', color: '#344054', divider: '#D0D5DD', shadow: '0 1px 2px rgba(16,24,40,.05)', border: '1px solid #D0D5DD', label: 'Default' },
        { bg: '#EEF2F6', color: '#1D2939', divider: '#D0D5DD', shadow: '0 1px 2px rgba(16,24,40,.05)', border: '1px solid #D0D5DD', label: 'Hover' },
        { bg: '#fff', color: '#344054', divider: '#D0D5DD', shadow: '0 0 0 4px #F2F4F7, 0 1px 2px rgba(16,24,40,.05)', border: '1px solid #D0D5DD', label: 'Focus' },
        { bg: '#fff', color: '#D0D5DD', divider: '#EAECF0', shadow: '0 1px 2px rgba(16,24,40,.05)', border: '1px solid #EAECF0', dim: true, label: 'Disabled' },
      ],
    },
  ];

  const sizes = [
    { label: 'sm', token: 'btn-sm', h: 32, px: 12, fs: 13 },
    { label: 'md', token: 'btn-md', h: 40, px: 16, fs: 14, note: 'default' },
    { label: 'lg', token: 'btn-lg', h: 48, px: 20, fs: 15 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── Variant × State table ── */}
      <div style={{ border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* thead */}
        <div style={{
          display: 'grid', gridTemplateColumns: '160px repeat(4, 1fr)',
          background: VA_TOKENS.bgGrey, borderBottom: `1px solid ${VA_TOKENS.line}`,
        }}>
          <div style={{ padding: '10px 18px' }}><ColHead>Variant</ColHead></div>
          {stateHeads.map(h => (
            <div key={h} style={{ padding: '10px 18px', borderLeft: `1px solid ${VA_TOKENS.line}` }}>
              <ColHead>{h}</ColHead>
            </div>
          ))}
        </div>
        {/* rows */}
        {variantRows.map((row, ri) => (
          <div key={row.name} style={{
            display: 'grid', gridTemplateColumns: '160px repeat(4, 1fr)',
            borderTop: ri > 0 ? `1px solid ${VA_TOKENS.line}` : 'none',
          }}>
            {/* variant label */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: VA_TOKENS.ink }}>{row.name}</span>
              <span style={{ fontSize: 11, color: VA_TOKENS.soft }}>{row.note}</span>
            </div>
            {/* state cells */}
            {row.states.map((s, si) => (
              <div key={si} style={{
                padding: '18px',
                borderLeft: `1px solid ${VA_TOKENS.line}`,
                background: si === 3 ? VA_TOKENS.bgGrey : '#fff',
                display: 'flex', alignItems: 'center',
              }}>
                <button disabled={s.dim} style={{
                  ...baseBtn,
                  background: s.bg,
                  color: s.color,
                  borderColor: s.borderColor,
                  boxShadow: s.shadow || 'none',
                  cursor: s.dim ? 'not-allowed' : 'pointer',
                }}>Button</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Sizes ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {sizes.map(sz => (
          <div key={sz.label} style={{ ...VA_CARD, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.text, fontWeight: 600 }}>{sz.token}</span>
              <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, color: VA_TOKENS.soft }}>{sz.h}px{sz.note ? ` · ${sz.note}` : ''}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{ ...baseBtn, height: sz.h, padding: `0 ${sz.px}px`, fontSize: sz.fs, background: '#257CFF', color: '#fff', borderColor: 'transparent', boxShadow: '0px 2px 2px 0px #D8ECFF' }}>Button</button>
              <button style={{ ...baseBtn, height: sz.h, padding: `0 ${sz.px}px`, fontSize: sz.fs, background: '#fff', color: '#344054', borderColor: '#D0D5DD', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>Button</button>
              <button style={{ ...baseBtn, height: sz.h, padding: `0 ${sz.px}px`, fontSize: sz.fs, background: 'transparent', color: '#344054', borderColor: 'transparent' }}>Button</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── With icons ── */}
      <div>
        <SubLabel>With icons</SubLabel>
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
          padding: '20px 22px', background: VA_TOKENS.bgGrey,
          border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8,
        }}>
          <Button variant="primary" icon="plus">Add Part</Button>
          <Button variant="secondary" icon="filter">Filter</Button>
          <Button variant="secondary" icon="calendar">Schedule</Button>
          <Button variant="tertiary" icon="arrow-right">View details</Button>
        </div>
      </div>

      {/* ── Split buttons ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {splitVariants.map(sv => (
          <div key={sv.name}>
            <SubLabel>{sv.name}</SubLabel>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {sv.states.map((s, si) => (
                <div key={si} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{
                    display: 'inline-flex', height: 36, borderRadius: 8, overflow: 'hidden',
                    cursor: s.dim ? 'not-allowed' : 'pointer',
                    background: s.bg, color: s.color,
                    boxShadow: s.shadow || 'none',
                    border: s.border || 'none',
                    fontFamily: 'var(--sv-font-ui)', fontWeight: 600, fontSize: 14,
                  }}>
                    <span style={{ padding: '0 14px', display: 'flex', alignItems: 'center' }}>Save</span>
                    <span style={{ width: 1, background: s.divider, alignSelf: 'stretch', flexShrink: 0 }} />
                    <span style={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Caret /></span>
                  </div>
                  <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, color: VA_TOKENS.soft }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// Floating-label input (matches preview/inputs.html spec)
function VAFloatInput({ label, defaultValue = '', type = 'text', error, hint, disabled, isSelect }) {
  const [value, setValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const floated = focused || value.length > 0;
  const borderColor = error ? '#EF4444' : (focused ? '#257CFF' : disabled ? '#E3E8EF' : '#CDD5DF');
  const shadow = focused && !error ? '0 0 0 4px rgba(37,124,255,0.18)' : focused && error ? '0 0 0 4px rgba(239,68,68,0.16)' : 'none';
  const labelColor = disabled ? '#9AA4B2' : (error ? (focused ? '#B52020' : '#B52020') : (focused ? '#257CFF' : '#697586'));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: 40 }}>
        <input
          type={type} value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled} readOnly={isSelect}
          style={{
            width: '100%', height: 40, boxSizing: 'border-box',
            border: `1px solid ${borderColor}`, borderRadius: 8,
            padding: isSelect ? '0 32px 0 12px' : '0 12px',
            fontSize: 14, fontFamily: 'inherit',
            color: disabled ? '#9AA4B2' : '#202939',
            background: disabled ? '#F8FAFC' : '#fff',
            outline: 'none', boxShadow: shadow,
            cursor: disabled ? 'not-allowed' : isSelect ? 'pointer' : 'text',
            transition: 'border-color 120ms ease, box-shadow 120ms ease',
          }}
        />
        <label style={{
          position: 'absolute', left: 10,
          top: floated ? 0 : '50%',
          transform: 'translateY(-50%)',
          padding: '0 4px', fontSize: floated ? 12 : 14,
          color: labelColor,
          background: disabled ? '#F8FAFC' : '#fff',
          pointerEvents: 'none', lineHeight: 1,
          transition: 'top 160ms cubic-bezier(.2,.8,.2,1), font-size 160ms cubic-bezier(.2,.8,.2,1), color 120ms ease',
        }}>{label}</label>
        {isSelect && (
          <span style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none', display: 'flex', alignItems: 'center',
            color: error ? '#EF4444' : (focused ? '#257CFF' : '#697586'),
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        )}
      </div>
      {(hint || error) && (
        <span style={{ marginTop: 6, fontSize: 12, color: error ? '#B52020' : '#697586' }}>{error || hint}</span>
      )}
    </div>
  );
}

function VAInputsShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>
        <VAFloatInput label="Lead Technician" defaultValue="Aaron Keating" />
        <VAFloatInput label="Service Advisor" />
        <VAFloatInput label="Phone" type="tel" defaultValue="(555) 555" error="Enter a complete phone number." />
        <VAFloatInput label="VIN" defaultValue="830971" disabled />
        <VAFloatInput label="Customer" hint="Click - label floats above the value." />
        <VAFloatInput label="Vehicle" defaultValue="2019 Toyota Tacoma" />
      </div>
      <div style={{ height: 1, background: VA_TOKENS.line }} />
      <div>
        <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Dropdown</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>
          <VAFloatInput label="Category*" isSelect />
          <VAFloatInput label="Category*" defaultValue="Hard Parts" isSelect />
          <VAFloatInput label="Category*" isSelect error="This field is required." />
          <VAFloatInput label="Manufacturer" defaultValue="Freightliner" isSelect disabled />
        </div>
      </div>
    </div>
  );
}

function VABadgesShowcase() {
  const badgeBase = {
    fontFamily: 'var(--sv-font-ui)', fontWeight: 500, fontSize: 11,
    lineHeight: '11px', padding: '2px 8px', display: 'inline-flex',
    alignItems: 'center', height: 22, boxSizing: 'border-box', whiteSpace: 'nowrap',
  };
  const tones = [
    { name: 'Success', bordered: { background: '#EDFCF2', border: '1px solid #73E2A3', color: '#087443' }, solid: { background: '#D3F8DF', color: '#087443' }, location: true },
    { name: 'Warning', bordered: { background: '#FFFCF5', border: '1px solid #FEDF89', color: '#B54708' }, solid: { background: '#FEF0C7', color: '#B54708' } },
    { name: 'Danger',  bordered: { background: '#FFFBFA', border: '1px solid #FECDCA', color: '#D92D20' }, solid: { background: '#FEE4E2', color: '#B42318' } },
    { name: 'Info',    bordered: { background: '#E9F5FF', border: '1px solid #82C1FB', color: '#175CD3' }, solid: { background: '#E9F5FF', color: '#175CD3' } },
    { name: 'Neutral', bordered: { background: '#EEF2F6', border: '1px solid #CDD5DF', color: '#373A41' }, solid: { background: '#EEF2F6', color: '#364152' } },
  ];
  const colHeads = ['Rounded · Border', 'Rounded · Solid', 'Square · Border', 'Square · Solid', 'Location'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Grid table */}
      <div style={{ border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr) 120px', background: VA_TOKENS.bgGrey, borderBottom: `1px solid ${VA_TOKENS.line}` }}>
          <div style={{ padding: '9px 14px' }} />
          {colHeads.map((h, i) => (
            <div key={h} style={{ padding: '9px 14px', borderLeft: `1px solid ${VA_TOKENS.line}`, fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
          ))}
        </div>
        {tones.map((t, ti) => (
          <div key={t.name} style={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr) 120px', borderTop: ti > 0 ? `1px solid ${VA_TOKENS.line}` : 'none' }}>
            <div style={{ padding: '14px', display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, color: VA_TOKENS.muted }}>{t.name}</div>
            {[
              { ...badgeBase, borderRadius: 9999, ...t.bordered },
              { ...badgeBase, borderRadius: 9999, ...t.solid },
              { ...badgeBase, borderRadius: 8, ...t.bordered },
              { ...badgeBase, borderRadius: 8, ...t.solid },
            ].map((style, i) => (
              <div key={i} style={{ padding: '14px', borderLeft: `1px solid ${VA_TOKENS.line}`, display: 'flex', alignItems: 'center' }}>
                <span style={style}>Label text</span>
              </div>
            ))}
            <div style={{ padding: '14px', borderLeft: `1px solid ${VA_TOKENS.line}`, display: 'flex', alignItems: 'center' }}>
              {t.location && (
                <span style={{ background: '#fff', border: '1px solid #D5D7DA', color: '#364152', borderRadius: 8, padding: '2px 4px 2px 8px', height: 24, fontWeight: 600, fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 8, boxSizing: 'border-box' }}>
                  Storage <span style={{ background: '#fff', border: '1px solid #D5D7DA', borderRadius: 8, padding: '0 6px', height: 16, color: '#414651', fontWeight: 500, fontSize: 11, lineHeight: '16px', display: 'inline-flex', alignItems: 'center' }}>4</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function VAControlsShowcase() {
  // Simplified: show key states inline, no table

  const CheckBox = ({ checked, state, indeterminate }) => {
    const isHover = state === 'hover', isFocus = state === 'focus', isDisabled = state === 'disabled';
    let bg = '#fff', border = '#CDD5DF', shadow = 'none';
    if (checked) { bg = '#E9F5FF'; border = '#257CFF'; }
    if (checked && isHover) bg = '#D8ECFF';
    if (!checked && isHover) bg = '#EEF2F6';
    if (isFocus) { shadow = '0 0 0 4px #D8ECFF'; border = '#257CFF'; }
    if (isDisabled) { bg = '#EEF2F6'; border = '#CDD5DF'; shadow = 'none'; }
    const stroke = isDisabled ? '#CDD5DF' : '#257CFF';
    return (
      <span style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${border}`, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: shadow }}>
        {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          {indeterminate ? <path d="M2.5 5h5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/> : <path d="M2 5l2.5 2.5L8 3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
        </svg>}
      </span>
    );
  };

  const RadioBtn = ({ checked, state }) => {
    const isHover = state === 'hover', isFocus = state === 'focus', isDisabled = state === 'disabled';
    let bg = '#fff', border = '#CDD5DF', shadow = 'none';
    if (checked) { bg = '#E9F5FF'; border = '#257CFF'; }
    if (checked && isHover) bg = '#D8ECFF';
    if (!checked && isHover) bg = '#EEF2F6';
    if (isFocus) { shadow = '0 0 0 4px #D8ECFF'; border = '#257CFF'; }
    if (isDisabled) { bg = '#EEF2F6'; border = '#CDD5DF'; shadow = 'none'; }
    return (
      <span style={{ width: 16, height: 16, borderRadius: '50%', border: `1px solid ${border}`, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: shadow }}>
        {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: isDisabled ? '#CDD5DF' : '#257CFF' }} />}
      </span>
    );
  };

  const ToggleBtn = ({ on, state }) => {
    const isHover = state === 'hover', isFocus = state === 'focus', isDisabled = state === 'disabled';
    let bg = '#EEF2F6', shadow = 'none';
    if (on) bg = '#2170E6';
    if (on && isHover) bg = '#175CD3';
    if (!on && isHover) bg = '#E3E8EF';
    if (isFocus && !on) { bg = '#F8FAFC'; shadow = '0 0 0 4px #D8ECFF'; }
    if (isFocus && on) { bg = '#2170E6'; shadow = '0 0 0 4px #D8ECFF'; }
    if (isDisabled) { bg = '#EEF2F6'; shadow = 'none'; }
    return (
      <span style={{ width: 36, height: 20, borderRadius: 12, background: bg, position: 'relative', flexShrink: 0, display: 'inline-block', boxShadow: shadow }}>
        <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: isDisabled ? '#F8FAFC' : '#fff', top: 2, left: on ? 18 : 2, boxShadow: '0px 1px 2px rgba(16,24,40,0.06),0px 1px 3px rgba(16,24,40,0.1)', transition: 'left 120ms' }} />
      </span>
    );
  };

  const Item = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      {children}
      <span style={{ fontSize: 10, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>{label}</span>
    </div>
  );
  const Divider = () => <div style={{ width: 1, height: 28, background: VA_TOKENS.line, alignSelf: 'center' }} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Checkbox */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: VA_TOKENS.muted, paddingBottom: 18, flexShrink: 0 }}>Checkbox</div>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Item label="Default"><CheckBox checked={false} /></Item>
          <Item label="Checked"><CheckBox checked /></Item>
          <Item label="Indeterminate"><CheckBox checked indeterminate /></Item>
          <Divider />
          <Item label="Focus"><CheckBox checked state="focus" /></Item>
          <Item label="Disabled"><CheckBox checked state="disabled" /></Item>
        </div>
      </div>
      {/* Radio */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: VA_TOKENS.muted, paddingBottom: 18, flexShrink: 0 }}>Radio</div>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Item label="Default"><RadioBtn checked={false} /></Item>
          <Item label="Checked"><RadioBtn checked /></Item>
          <Divider />
          <Item label="Focus"><RadioBtn checked state="focus" /></Item>
          <Item label="Disabled"><RadioBtn checked state="disabled" /></Item>
        </div>
      </div>
      {/* Toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ width: 90, fontSize: 12, fontWeight: 600, color: VA_TOKENS.muted, paddingBottom: 18, flexShrink: 0 }}>Toggle</div>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Item label="Off"><ToggleBtn on={false} /></Item>
          <Item label="On"><ToggleBtn on /></Item>
          <Divider />
          <Item label="Focus"><ToggleBtn on state="focus" /></Item>
          <Item label="Disabled"><ToggleBtn on={false} state="disabled" /></Item>
        </div>
      </div>
    </div>
  );
}

function VANotificationsShowcase() {
  const XIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
  const CloseBtn = () => <button style={{ flexShrink: 0, width: 20, height: 20, background: 'none', border: 0, padding: 0, color: '#9AA4B2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XIcon /></button>;

  const toasts = [
    { tone: 'success', iconBg: '#ECFDF3', iconColor: '#067647',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
      title: 'WO-1041 marked Completed', support: 'The work order is closed and the invoice is ready to send.',
      actions: [{ label: 'Dismiss', muted: true }, { label: 'View invoice', muted: false }] },
    { tone: 'warning', iconBg: '#FFFAEB', iconColor: '#B47A00',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
      title: '3 Lines awaiting authorization', support: 'Customer approval required before technicians can begin.',
      actions: [{ label: 'Undo', muted: true }] },
    { tone: 'error', iconBg: '#FEF3F2', iconColor: '#B52020',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      title: "Couldn't authorize this Line", support: 'Customer signature is required before authorization.',
      actions: [{ label: 'Dismiss', muted: true }, { label: 'Request signature', muted: false }] },
    { tone: 'info', iconBg: '#E9F5FF', iconColor: '#0868A7',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
      title: 'Version 1.4.1 is now available', support: 'Includes the new dashboard view. Pages will now load faster.',
      actions: [{ label: 'Later', muted: true }, { label: "What's new", muted: false }] },
  ];

  const compactToasts = [
    { iconColor: '#067647', barColor: '#067647', label: 'Work Order saved',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
    { iconColor: '#B47A00', barColor: '#B47A00', label: '2 parts low in stock',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
    { iconColor: '#B52020', barColor: '#B52020', label: "Couldn't sync timesheet",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> },
  ];

  const alerts = [
    { style: { background: '#F6FEF9', borderColor: '#ABEFC6', color: '#067647' }, dismissable: true,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      title: 'Invoice INV-04821 sent to PepsiCo Foods', support: "A copy is in the customer's outbox. Payment terms: Net 30." },
    { style: { background: '#FFFAEB', borderColor: '#FEDF89', color: '#B47A00' }, dismissable: true,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
      title: '3 Lines awaiting authorization', support: 'Customer approval required before technicians can begin work.' },
    { style: { background: '#FFFBFA', borderColor: '#FECDCA', color: '#B52020' }, dismissable: true,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      title: 'Problem saving this Work Order', support: 'Bin location required for Part #BR-44211. Add a bin and try again.' },
    { style: { background: '#E9F5FF', borderColor: '#BDD0FF', color: '#0868A7' }, dismissable: true,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
      title: 'Scheduled maintenance - Sunday 2:00 AM PT', support: 'Shopview will be unavailable for ~30 minutes during the 1.4.1 deploy.' },
  ];

  const SubLabel = ({ children }) => (
    <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{children}</div>
  );

  const toastCard = { background: '#fff', border: '1px solid #EEF2F6', borderRadius: 12, boxShadow: '0 4px 6px -2px rgba(16,24,40,0.03),0 12px 16px -4px rgba(16,24,40,0.08)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SubLabel>Toast · Full (400 × auto)</SubLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {toasts.map(t => (
            <div key={t.tone} style={{ ...toastCard, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 9999, background: t.iconBg, color: t.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#1D2939' }}>{t.title}</div>
                <div style={{ fontSize: 14, lineHeight: '20px', color: '#697586', marginTop: 4 }}>{t.support}</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                  {t.actions.map(a => <button key={a.label} style={{ fontFamily: 'var(--sv-font-ui)', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 0, padding: 0, color: a.muted ? '#697586' : '#175CD3' }}>{a.label}</button>)}
                </div>
              </div>
              <CloseBtn />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Toast · Compact (single line)</SubLabel>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {compactToasts.map((t, i) => (
            <div key={i} style={{ ...toastCard, position: 'relative', overflow: 'hidden', padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center', minWidth: 260 }}>
              <span style={{ width: 20, height: 20, flexShrink: 0, color: t.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1D2939' }}>{t.label}</span>
              <CloseBtn />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, overflow: 'hidden', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                <div style={{ height: '100%', background: t.barColor, width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubLabel>Inline alert · Banner</SubLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ borderRadius: 8, border: `1px solid ${a.style.borderColor}`, background: a.style.background, color: a.style.color, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px' }}>{a.title}</div>
                <div style={{ fontSize: 14, lineHeight: '20px', opacity: 0.8, marginTop: 2 }}>{a.support}</div>
              </div>
              {a.dismissable && <button style={{ flexShrink: 0, width: 20, height: 20, background: 'none', border: 0, padding: 0, color: 'currentColor', opacity: 0.6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XIcon /></button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VAPillTabs({ tabs, value, onChange }) {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {tabs.map(t => {
        const active = t.key === value;
        const isHov = hovered === t.key && !active;
        return (
          <button key={t.key} onClick={() => onChange?.(t.key)}
            onMouseEnter={() => setHovered(t.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              height: 32, padding: '0 12px', border: 0,
              background: active || isHov ? '#EEF2F6' : 'transparent',
              borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--sv-font-ui)', fontWeight: 500, fontSize: 14, lineHeight: '20px',
              color: active ? '#0F111A' : '#697586',
              cursor: 'pointer',
              transition: 'background-color 120ms ease',
            }}>
            {t.label}
            {typeof t.count === 'number' && <span style={{ color: 'inherit' }}>({t.count})</span>}
          </button>
        );
      })}
    </div>
  );
}

// 07. Components
function VAComponents() {
  const [tab, setTab] = React.useState('lines');
  return (
    <section>
      <VASectionHead n="06" id="components" kicker="Component Library" title="Twelve primitives. One blue."
        lede="Every screen reduces to a small set of primitives. Reuse aggressively. Build new ones only when the existing set truly doesn't cover the case." />
      <VAContainer>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
            {/* Buttons */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Buttons</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>3 variants × 3 sizes</span>
              </div>
              <VAButtonsShowcase />
            </div>

            {/* Inputs */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Inputs</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>floating label · text · dropdown</span>
              </div>
              <VAInputsShowcase />
            </div>

            {/* Badges */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Badges</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>5 tones × 4 variants</span>
              </div>
              <VABadgesShowcase />
            </div>

            {/* Tabs */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Tabs</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>pill · 32px · radius-6</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* State matrix */}
                <div>
                  <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>States</div>
                  <div style={{ display: 'inline-flex', gap: 2, alignItems: 'center', padding: '8px', background: VA_TOKENS.bgGrey, borderRadius: 8, border: `1px solid ${VA_TOKENS.line}` }}>
                    {[
                      { label: 'Default', active: false, forced: false },
                      { label: 'Hover', active: false, forced: true },
                      { label: 'Active', active: true, forced: false },
                    ].map(({ label, active, forced }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <button style={{
                          height: 32, padding: '0 12px', border: 0,
                          background: active || forced ? '#EEF2F6' : 'transparent',
                          borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontFamily: 'var(--sv-font-ui)', fontWeight: 500, fontSize: 14,
                          color: active ? '#0F111A' : '#697586',
                          cursor: 'pointer',
                        }}>Lines <span style={{ color: 'inherit' }}>(3)</span></button>
                        <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, color: VA_TOKENS.soft }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Live tab groups */}
                <div>
                  <div style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 10, fontWeight: 700, color: VA_TOKENS.soft, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Live groups</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <VAPillTabs
                      value={tab}
                      onChange={setTab}
                      tabs={[
                        { key: 'lines', label: 'Lines', count: 17 },
                        { key: 'parts', label: 'Parts', count: 20 },
                        { key: 'returns', label: 'Part Returns' },
                        { key: 'notes', label: 'Notes', count: 2 },
                        { key: 'time', label: 'Timesheets', count: 2 },
                        { key: 'stats', label: 'Statistics' },
                        { key: 'finance', label: 'Invoice' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card */}
            <div style={{ gridColumn: 'span 6', ...VA_CARD, padding: 28 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 20px', color: VA_TOKENS.ink }}>Card · Work Order Line</h4>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>L-04</div>
                    <h4 style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 600 }}>Replace front brake pads</h4>
                    <div style={{ fontSize: 13, color: VA_TOKENS.muted, marginTop: 6 }}>Tech: M. Diaz · 2.5 hr</div>
                  </div>
                  <Badge tone="warning">Authorization Required</Badge>
                </div>
              </Card>
            </div>

            {/* Avatar */}
            <div style={{ gridColumn: 'span 6', ...VA_CARD, padding: 28 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 20px', color: VA_TOKENS.ink }}>Avatar</h4>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <Avatar name="Sam Hill" size={40} />
                <Avatar name="Pat Liu" size={40} />
                <Avatar name="Mae Diaz" size={40} />
                <Avatar name="Aaron K" size={40} />
                <Avatar name="Jane Doe" size={40} />
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
                <Avatar name="Sam Hill" size={32} />
                <Avatar name="Pat Liu" size={32} />
                <Avatar name="Mae Diaz" size={32} />
                <Avatar name="Sam Hill" size={24} />
                <Avatar name="Pat Liu" size={24} />
                <Avatar name="Mae Diaz" size={24} />
              </div>
            </div>

            {/* Controls */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Controls</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>checkbox · radio · toggle</span>
              </div>
              <VAControlsShowcase />
            </div>

            {/* Filters */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Filters</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>chip · dropdown · bar</span>
              </div>
              <VAFiltersBlock />
            </div>

            {/* Notification */}
            <div style={{ gridColumn: 'span 12', ...VA_CARD, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: VA_TOKENS.ink }}>Notifications</h4>
                <span style={{ fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft }}>toast · compact · inline alert</span>
              </div>
              <VANotificationsShowcase />
            </div>
          </div>
      </VAContainer>
    </section>
  );
}

// Filters showcase inside the components section
function VAFiltersBlock() {
  const [statusVal, setStatusVal] = React.useState(['Estimate', 'In progress', 'Approved']);
  const [custVal, setCustVal] = React.useState([]);

  const RowLabel = ({ children }) => (
    <div style={{
      fontFamily: 'var(--sv-font-mono)', fontSize: 11, color: VA_TOKENS.soft,
      letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10,
    }}>{children}</div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* States row */}
      <div>
        <RowLabel>Chip states</RowLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
          padding: 16, background: VA_TOKENS.bgGrey, borderRadius: 8,
          border: `1px solid ${VA_TOKENS.line}`,
        }}>
          {[
            ['Default',  { state: 'default' }],
            ['Hover',    { state: 'hover' }],
            ['Open',     { state: 'open' }],
            ['Selected', { hasValue: true, valueText: 'In progress', onClear: () => {} }],
          ].map(([label, props]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
              <FilterChip icon={SVIcons.ICON_LOAD} label="Status" {...props} />
              <span style={{ fontSize: 11, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Applied bar */}
      <div>
        <RowLabel>Filter bar - applied set</RowLabel>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
          padding: '10px 14px', background: '#fff',
          border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8,
        }}>
          <FilterChip icon={SVIcons.ICON_LOAD}    label="Status"          hasValue valueText="In progress"      onClear={() => {}} />
          <FilterChip icon={SVIcons.ICON_USER}    label="Customer"        hasValue valueText="RF Heavy, +2"     onClear={() => {}} />
          <FilterChip icon={SVIcons.ICON_WRENCH}  label="Lead Technician" />
          <FilterChip icon={SVIcons.ICON_HEADSET} label="Service Advisor" />
          <FilterChip icon={SVIcons.ICON_TRUCK}   label="Asset on site"   />
          <span style={{ color: VA_TOKENS.blue, fontWeight: 500, fontSize: 14, paddingLeft: 8, cursor: 'pointer' }}>Clear filters</span>
        </div>
      </div>

      {/* Dropdowns */}
      <div>
        <RowLabel>Dropdowns</RowLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <div style={{
            padding: 24, background: VA_TOKENS.bgGrey,
            border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8,
            display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
          }}>
            <FilterChip
              icon={SVIcons.ICON_LOAD} label="Status"
              hasValue={statusVal.length > 0}
              valueText={statusVal.length ? `${statusVal[0]}${statusVal.length > 1 ? `, +${statusVal.length - 1}` : ''}` : null}
              onClear={() => setStatusVal([])}
            />
            <StatusDropdown
              options={window.STATUSES}
              value={statusVal}
              onChange={setStatusVal}
              onClear={() => setStatusVal([])}
              width={260}
            />
            <span style={{ fontSize: 11, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>Status - multi-select list</span>
          </div>
          <div style={{
            padding: 24, background: VA_TOKENS.bgGrey,
            border: `1px solid ${VA_TOKENS.line}`, borderRadius: 8,
            display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
          }}>
            <FilterChip
              icon={SVIcons.ICON_USER} label="Customer"
              hasValue={custVal.length > 0}
              valueText={custVal.length ? `${custVal[0]}${custVal.length > 1 ? `, +${custVal.length - 1}` : ''}` : null}
              onClear={() => setCustVal([])}
            />
            <FilterDropdown
              title="Customer"
              options={window.CUSTOMERS}
              value={custVal}
              onChange={setCustVal}
              onClear={() => setCustVal([])}
              width={316}
            />
            <span style={{ fontSize: 11, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>Customer - search + checklist</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: VA_TOKENS.soft, lineHeight: 1.6 }}>
        28px pill · radius 100 · padding 0 10 · gap 8. Default: transparent / grey-700.
        Hover & open: grey-100. Selected: primary-100 fill, primary-500 text.
        Dropdown: 12px radius, shadow-lg, 320px wide for search variants, 240-260px for status.
      </div>
    </div>
  );
}

function VATogglePair() {
  const [a, setA] = React.useState(true);
  const [b, setB] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Toggle on={a} onChange={setA} /><span style={{ fontSize: 13 }}>Show financials</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Toggle on={b} onChange={setB} /><span style={{ fontSize: 13 }}>Notify on completion</span></div>
    </div>
  );
}

function VANotice({ tone, text }) {
  const tones = {
    success: { bg: '#ABF5C4', fg: '#108737', icon: 'check' },
    warning: { bg: '#FFF5E0', fg: '#B47A00', icon: 'bell' },
    error: { bg: '#FCA397', fg: '#B52020', icon: 'x' },
    info: { bg: '#E5EDFF', fg: '#0868A7', icon: 'bell' },
  }[tone];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: tones.bg, borderRadius: 8 }}>
      <span style={{ width: 28, height: 28, borderRadius: 999, background: '#fff', color: tones.fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon name={tones.icon} size={14} stroke={2.5} /></span>
      <span style={{ fontSize: 13, color: tones.fg, fontWeight: 500 }}>{text}</span>
    </div>
  );
}



function VAFooter() {
  return (
    <footer style={{ marginTop: 96, padding: '64px 0', borderTop: `1px solid ${VA_TOKENS.line}`, background: VA_TOKENS.bgGrey }}>
      <VAContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="logo-primary-light.svg" alt="Shopview" style={{ height: 18 }} />
          <span style={{ fontSize: 12, color: VA_TOKENS.soft, fontFamily: 'var(--sv-font-mono)' }}>Shopview Design System · Edition 01 · May 2026</span>
        </div>
      </VAContainer>
    </footer>
  );
}

function VariationA({ density = 'comfortable' }) {
  return (
    <div style={{
      background: VA_TOKENS.bg, color: VA_TOKENS.text, fontFamily: 'var(--sv-font-ui)',
      minHeight: '100%', width: '100%',
    }}>
      <VAHeader density={density} />
      <VAHero />
      <VALogo />
      <VAColor />
      <VAType />
      <VASpacing />
      <VAIcons />
      <VAComponents />
      <VAFooter />
    </div>
  );
}

window.VariationA = VariationA;
