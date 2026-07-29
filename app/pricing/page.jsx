'use client';

import Link from 'next/link';

const plans = [
  {
    title: 'Academic',
    price: '₹150 / student / year',
    subtitle: 'Curriculum videos, progress tracking, and school analytics.',
    features: ['Student learning library', 'Progress dashboard', 'School analytics', 'Responsive web app'],
  },
  {
    title: 'Blanket',
    price: '₹220 / student / year',
    subtitle: 'Everything in Academic, plus parent visibility and advanced support.',
    features: ['Parent resources', 'Aggregate child progress', 'Advanced analytics', 'Most Popular package'],
    popular: true,
  },
  {
    title: 'School-Wide Flat',
    price: '₹40,000–₹80,000 / year',
    subtitle: 'For larger institutions and district-level rollouts.',
    features: ['Campus-wide access', 'Admin controls', 'Curriculum customization', 'Rollout support'],
  },
];

export default function PricingPage() {
  return (
    <main className="pricingRoute">
      <style jsx global>{`
        :root {
          --navy: #0f1f3d;
          --teal: #00a896;
          --surface: #f4f6f9;
          --text: #1a1a2e;
          --muted: #627186;
          --border: rgba(15, 31, 61, 0.12);
          --shadow: 0 18px 45px rgba(15, 31, 61, 0.12);
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: var(--surface); color: var(--text); font-family: inherit; }
        a { color: inherit; text-decoration: none; }
        .pageWidth { width: min(1200px, calc(100% - 32px)); margin: 0 auto; }
        .hero {
          background: linear-gradient(135deg, #0f1f3d 0%, #13335d 50%, #0fa3a8 100%);
          color: white; padding: 24px 0 36px;
        }
        .topbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:22px; }
        .brand { display:flex; align-items:center; gap:12px; }
        .logo { width:52px; height:52px; border-radius:16px; display:grid; place-items:center; background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14); font-weight:900; }
        .brand h1 { margin:0; font-size:1.1rem; }
        .brand p { margin:3px 0 0; color: rgba(255,255,255,0.74); }
        .secondaryBtn {
          border:1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.08); color:white; padding:12px 16px; border-radius:14px; font-weight:900;
        }
        h2 { margin:0; font-size: clamp(2.2rem, 4vw, 3.4rem); letter-spacing:-0.04em; }
        p { color: rgba(255,255,255,0.82); max-width: 60ch; line-height:1.7; }
        .pricingGrid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; margin-top: 20px; }
        .card {
          position:relative; background: white; color: var(--text); border:1px solid var(--border); border-radius:22px; padding: 20px; box-shadow: var(--shadow);
        }
        .card.popular { border-color: rgba(0,168,150,0.34); transform: translateY(-6px); }
        .badge { position:absolute; top:16px; right:16px; background: rgba(0,168,150,0.1); color: var(--teal); padding:7px 10px; border-radius:999px; font-weight:900; font-size:0.8rem; }
        .card h3 { margin:0; font-size:1.25rem; }
        .price { font-size:2rem; font-weight:900; margin:12px 0 8px; color: var(--navy); }
        .subtitle { color: var(--muted); line-height:1.7; }
        ul { margin:14px 0 18px; padding-left:18px; line-height:1.9; color: var(--text); }
        .cta { width:100%; border:none; border-radius:14px; padding:13px 16px; background: linear-gradient(135deg, var(--navy), var(--teal)); color:white; font-weight:900; cursor:pointer; }
        @media (max-width: 920px) { .pricingGrid { grid-template-columns: 1fr; } .card.popular { transform:none; } }
      `}</style>
      <section className="hero">
        <div className="pageWidth">
          <div className="topbar">
            <div className="brand">
              <div className="logo">MW</div>
              <div>
                <h1>MindWell Pricing</h1>
                <p>Simple tiers for schools, parents, and district rollouts.</p>
              </div>
            </div>
            <Link className="secondaryBtn" href="/">Back to app</Link>
          </div>
          <h2>Pricing that scales with every school</h2>
          <p>Choose the plan that matches your rollout — from a focused academic launch to a full school-wide deployment.</p>
          <div className="pricingGrid">
            {plans.map((plan) => (
              <div className={`card ${plan.popular ? 'popular' : ''}`} key={plan.title}>
                {plan.popular && <div className="badge">Most Popular</div>}
                <h3>{plan.title}</h3>
                <div className="price">{plan.price}</div>
                <div className="subtitle">{plan.subtitle}</div>
                <ul>
                  {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <button className="cta">Get Started / Shuru Karein</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
