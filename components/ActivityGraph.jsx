'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/activitygraph.module.css';

const graphData = {
  nodes: [
    { id: 'mindfulness', label: 'Mindfulness', area: 'emotional', status: 'completed', sessions: 5, x: 400, y: 120 },
    { id: 'sleep', label: 'Sleep & Recovery', area: 'emotional', status: 'completed', sessions: 3, x: 250, y: 180 },
    { id: 'focus', label: 'Focus', area: 'emotional', status: 'in-progress', sessions: 2, x: 550, y: 160 },
    { id: 'stress', label: 'Stress Management', area: 'emotional', status: 'completed', sessions: 4, x: 300, y: 260 },
    { id: 'resilience', label: 'Resilience', area: 'emotional', status: 'in-progress', sessions: 3, x: 500, y: 240 },
    { id: 'hydration', label: 'Hydration', area: 'nutrition', status: 'completed', sessions: 6, x: 150, y: 300 },
    { id: 'nutrition', label: 'Nutrition Basics', area: 'nutrition', status: 'in-progress', sessions: 2, x: 350, y: 340 },
    { id: 'fitness', label: 'Physical Fitness', area: 'snc', status: 'completed', sessions: 8, x: 650, y: 300 },
    { id: 'stretching', label: 'Stretching', area: 'physiotherapy', status: 'not-started', sessions: 0, x: 700, y: 380 },
    { id: 'posture', label: 'Posture', area: 'physiotherapy', status: 'in-progress', sessions: 1, x: 550, y: 380 },
    { id: 'exam-prep', label: 'Exam Prep', area: 'emotional', status: 'completed', sessions: 4, x: 200, y: 220 },
    { id: 'self-care', label: 'Self Care', area: 'emotional', status: 'in-progress', sessions: 2, x: 420, y: 300 },
  ],
  edges: [
    { source: 'mindfulness', target: 'sleep', status: 'completed' },
    { source: 'mindfulness', target: 'focus', status: 'completed' },
    { source: 'sleep', target: 'focus', status: 'in-progress' },
    { source: 'stress', target: 'resilience', status: 'completed' },
    { source: 'resilience', target: 'self-care', status: 'in-progress' },
    { source: 'exam-prep', target: 'stress', status: 'completed' },
    { source: 'exam-prep', target: 'focus', status: 'completed' },
    { source: 'hydration', target: 'fitness', status: 'completed' },
    { source: 'hydration', target: 'nutrition', status: 'in-progress' },
    { source: 'fitness', target: 'posture', status: 'in-progress' },
    { source: 'posture', target: 'stretching', status: 'not-started' },
    { source: 'self-care', target: 'nutrition', status: 'not-started' },
    { source: 'focus', target: 'fitness', status: 'in-progress' },
  ],
};

const areaColors = {
  emotional: '#B39DDB',
  nutrition: '#81C784',
  snc: '#FFD54F',
  physiotherapy: '#64B5F6',
};

const areaGlow = {
  emotional: 'rgba(179, 157, 219, 0.4)',
  nutrition: 'rgba(129, 199, 132, 0.4)',
  snc: 'rgba(255, 213, 79, 0.4)',
  physiotherapy: 'rgba(100, 181, 246, 0.4)',
};

const areaLabels = {
  emotional: 'Emotional Health',
  nutrition: 'Nutrition',
  snc: 'Strength & Conditioning',
  physiotherapy: 'Physiotherapy',
};

const areaIcons = {
  emotional: '🧠',
  nutrition: '🍎',
  snc: '💪',
  physiotherapy: '🦴',
};

export default function ActivityGraph() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const areaStats = Object.keys(areaLabels).map((area) => {
    const areaNodes = graphData.nodes.filter((n) => n.area === area);
    const areaEdges = graphData.edges.filter((e) => {
      const s = graphData.nodes.find((n) => n.id === e.source);
      const t = graphData.nodes.find((n) => n.id === e.target);
      return s?.area === area || t?.area === area;
    });
    const completed = areaNodes.filter((n) => n.status === 'completed').length;
    const progress = areaNodes.length ? Math.round((completed / areaNodes.length) * 100) : 0;
    return { area, label: areaLabels[area], icon: areaIcons[area], color: areaColors[area], nodes: areaNodes.length, connections: areaEdges.length, progress };
  });

  return (
    <div className={styles.graphPage}>
      <div className={styles.graphHeader}>
        <h1>Your Wellness Network</h1>
        <p>See how your activities connect across all areas</p>
      </div>

      <div className={styles.graphContainer}>
        <svg viewBox="0 0 800 440" className={styles.graphSvg}>
          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {graphData.edges.map((e, i) => {
            const s = graphData.nodes.find((n) => n.id === e.source);
            const t = graphData.nodes.find((n) => n.id === e.target);
            if (!s || !t) return null;
            const colors = { completed: '#4CAF50', 'in-progress': '#FFB74D', 'not-started': '#78909C' };
            const widths = { completed: 3, 'in-progress': 2, 'not-started': 1.5 };
            const dashes = { completed: 'none', 'in-progress': '10 5', 'not-started': '5 5' };
            return (
              <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={colors[e.status]} strokeWidth={widths[e.status]}
                strokeDasharray={dashes[e.status]} opacity={0.7}
                className={styles.edge} />
            );
          })}

          {/* Nodes */}
          {graphData.nodes.map((node) => {
            const color = areaColors[node.area];
            const glow = areaGlow[node.area];
            const size = 16 + node.sessions * 2.5;
            const isHovered = hoveredNode === node.id;
            const isCompleted = node.status === 'completed';
            return (
              <g key={node.id} onMouseEnter={(ev) => { setHoveredNode(node.id); setTooltipPos({ x: node.x, y: node.y - size - 20 }); }}
                onMouseLeave={() => setHoveredNode(null)} style={{ cursor: 'pointer' }}>
                {/* Outer glow ring for completed */}
                {isCompleted && (
                  <circle cx={node.x} cy={node.y} r={size + 10} fill={glow} filter="url(#glowStrong)" className={styles.pulseGlow} />
                )}
                {/* Node circle */}
                <circle cx={node.x} cy={node.y} r={isHovered ? size + 4 : size}
                  fill={node.status === 'not-started' ? '#37474F' : color}
                  stroke={isHovered ? 'white' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isHovered ? 3 : 1.5}
                  filter={isCompleted ? 'url(#glow)' : 'none'}
                  className={styles.nodeCircle} />
                {/* Icon inside node */}
                <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={size * 0.7} className={styles.nodeIcon}>
                  {areaIcons[node.area]}
                </text>
                {/* Label below */}
                <text x={node.x} y={node.y + size + 18} textAnchor="middle"
                  fontSize={11} fill="rgba(255,255,255,0.8)" fontWeight={700}>
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hoveredNode && (() => {
            const node = graphData.nodes.find((n) => n.id === hoveredNode);
            if (!node) return null;
            const statusLabel = { completed: '✅ Completed', 'in-progress': '▶ In Progress', 'not-started': '○ Not Started' };
            return (
              <g>
                <rect x={tooltipPos.x - 70} y={tooltipPos.y - 40} width={140} height={36} rx={8} fill="rgba(15, 23, 42, 0.95)" />
                <text x={tooltipPos.x} y={tooltipPos.y - 18} textAnchor="middle" fontSize={11} fill="white" fontWeight={700}>
                  {node.sessions} sessions · {statusLabel[node.status]}
                </text>
              </g>
            );
          })()}

          {/* Legend */}
          <g transform="translate(20, 420)">
            <line x1="0" y1="0" x2="24" y2="0" stroke="#4CAF50" strokeWidth="3" />
            <text x="30" y="4" fontSize="10" fill="rgba(255,255,255,0.6)" fontWeight={600}>Completed</text>
            <line x1="120" y1="0" x2="144" y2="0" stroke="#FFB74D" strokeWidth="2" strokeDasharray="10 5" />
            <text x="150" y="4" fontSize="10" fill="rgba(255,255,255,0.6)" fontWeight={600}>In Progress</text>
            <line x1="260" y1="0" x2="284" y2="0" stroke="#78909C" strokeWidth="1.5" strokeDasharray="5 5" />
            <text x="290" y="4" fontSize="10" fill="rgba(255,255,255,0.6)" fontWeight={600}>Not Started</text>
          </g>
        </svg>
      </div>

      {/* Connections summary */}
      <div className={styles.summaryPanel}>
        <h2>YOUR CONNECTIONS</h2>
        <p className={styles.summaryIntro}>
          You&apos;ve completed <strong>{graphData.nodes.filter((n) => n.status === 'completed').length} sessions</strong> across 4 areas.
          Your strongest connection: <strong>Emotional Health → Focus</strong>
        </p>
        <div className={styles.summaryTable}>
          {areaStats.map((a) => (
            <div key={a.area} className={styles.summaryRow}>
              <span className={styles.summaryIcon}>{a.icon}</span>
              <div className={styles.summaryDot} style={{ background: a.color }} />
              <span className={styles.summaryLabel}>{a.label}</span>
              <span className={styles.summaryNum}>{a.nodes} nodes</span>
              <span className={styles.summaryNum}>{a.connections} connections</span>
              <span className={styles.summaryProgress}>{a.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
