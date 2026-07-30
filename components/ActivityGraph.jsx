'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/activitygraph.module.css';

const graphData = {
  nodes: [
    { id: 'mindfulness', label: 'Mindfulness', area: 'emotional', status: 'completed', sessions: 5, x: 0, y: 0 },
    { id: 'sleep', label: 'Sleep & Recovery', area: 'emotional', status: 'completed', sessions: 3, x: 0, y: 0 },
    { id: 'focus', label: 'Focus & Concentration', area: 'emotional', status: 'in-progress', sessions: 2, x: 0, y: 0 },
    { id: 'stress', label: 'Stress Management', area: 'emotional', status: 'completed', sessions: 4, x: 0, y: 0 },
    { id: 'resilience', label: 'Emotional Resilience', area: 'emotional', status: 'in-progress', sessions: 3, x: 0, y: 0 },
    { id: 'hydration', label: 'Hydration', area: 'nutrition', status: 'completed', sessions: 6, x: 0, y: 0 },
    { id: 'nutrition-basics', label: 'Nutrition Basics', area: 'nutrition', status: 'in-progress', sessions: 2, x: 0, y: 0 },
    { id: 'fitness', label: 'Physical Fitness', area: 'snc', status: 'completed', sessions: 8, x: 0, y: 0 },
    { id: 'stretching', label: 'Stretching', area: 'physiotherapy', status: 'not-started', sessions: 0, x: 0, y: 0 },
    { id: 'posture', label: 'Posture', area: 'physiotherapy', status: 'in-progress', sessions: 1, x: 0, y: 0 },
    { id: 'exam-prep', label: 'Exam Preparation', area: 'emotional', status: 'completed', sessions: 4, x: 0, y: 0 },
    { id: 'self-care', label: 'Self Care', area: 'emotional', status: 'in-progress', sessions: 2, x: 0, y: 0 },
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
    { source: 'hydration', target: 'nutrition-basics', status: 'in-progress' },
    { source: 'fitness', target: 'posture', status: 'in-progress' },
    { source: 'posture', target: 'stretching', status: 'not-started' },
    { source: 'self-care', target: 'nutrition-basics', status: 'not-started' },
    { source: 'focus', target: 'fitness', status: 'in-progress' },
  ],
};

const areaColors = {
  emotional: '#9B8EC4',
  nutrition: '#7CB87A',
  snc: '#C4A84D',
  physiotherapy: '#2B5EA7',
};

const areaLabels = {
  emotional: 'Emotional Health',
  nutrition: 'Nutrition',
  snc: 'Strength & Conditioning',
  physiotherapy: 'Physiotherapy',
};

export default function ActivityGraph() {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [simNodes, setSimNodes] = useState([]);
  const simulationRef = useRef(null);

  useEffect(() => {
    // Simple force simulation (no d3 import needed for basic layout)
    const nodes = graphData.nodes.map((n) => ({
      ...n,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    const edges = graphData.edges;
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    function tick() {
      // Center gravity
      nodes.forEach((n) => {
        n.vx += (centerX - n.x) * 0.001;
        n.vy += (centerY - n.y) * 0.001;
      });

      // Edge spring force
      edges.forEach((e) => {
        const s = nodes.find((n) => n.id === e.source);
        const t = nodes.find((n) => n.id === e.target);
        if (!s || !t) return;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 100;
        const force = (dist - targetDist) * 0.005;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
        t.vx -= (dx / dist) * force;
        t.vy -= (dy / dist) * force;
      });

      // Node repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 800 / (dist * dist);
          nodes[i].vx -= (dx / dist) * force;
          nodes[i].vy -= (dy / dist) * force;
          nodes[j].vx += (dx / dist) * force;
          nodes[j].vy += (dy / dist) * force;
        }
      }

      // Apply velocity with damping
      nodes.forEach((n) => {
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        // Keep in bounds
        n.x = Math.max(40, Math.min(width - 40, n.x));
        n.y = Math.max(40, Math.min(height - 40, n.y));
      });
    }

    let frame;
    function animate() {
      tick();
      setSimNodes([...nodes]);
      frame = requestAnimationFrame(animate);
    }

    // Run simulation for a bit then stop
    for (let i = 0; i < 120; i++) tick();
    setSimNodes([...nodes]);
    animate();

    setTimeout(() => cancelAnimationFrame(frame), 2000);

    return () => cancelAnimationFrame(frame);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return { strokeDasharray: 'none', opacity: 1 };
      case 'in-progress': return { strokeDasharray: '8 4', opacity: 0.8 };
      case 'not-started': return { strokeDasharray: '4 4', opacity: 0.4 };
      default: return { strokeDasharray: 'none', opacity: 0.6 };
    }
  };

  // Area stats
  const areaStats = Object.keys(areaLabels).map((area) => {
    const areaNodes = graphData.nodes.filter((n) => n.area === area);
    const areaEdges = graphData.edges.filter((e) => {
      const s = graphData.nodes.find((n) => n.id === e.source);
      const t = graphData.nodes.find((n) => n.id === e.target);
      return s?.area === area || t?.area === area;
    });
    const completed = areaNodes.filter((n) => n.status === 'completed').length;
    const progress = areaNodes.length ? Math.round((completed / areaNodes.length) * 100) : 0;
    return { area, label: areaLabels[area], color: areaColors[area], nodes: areaNodes.length, connections: areaEdges.length, progress };
  });

  return (
    <div className={styles.graphPage}>
      <div className={styles.graphHeader}>
        <h1>Your Wellness Network</h1>
        <p>See how your activities connect across all areas</p>
      </div>

      {/* Graph canvas */}
      <div className={styles.graphContainer}>
        <svg viewBox="0 0 800 400" className={styles.graphSvg}>
          {/* Edges */}
          {graphData.edges.map((e, i) => {
            const s = simNodes.find((n) => n.id === e.source);
            const t = simNodes.find((n) => n.id === e.target);
            if (!s || !t) return null;
            const style = getStatusStyle(e.status);
            return (
              <line
                key={i}
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={e.status === 'completed' ? '#22C55E' : e.status === 'in-progress' ? '#F59E0B' : '#6B7280'}
                strokeWidth={2}
                strokeDasharray={style.strokeDasharray}
                opacity={style.opacity}
              />
            );
          })}

          {/* Nodes */}
          {simNodes.map((node) => {
            const color = areaColors[node.area];
            const size = 12 + node.sessions * 2;
            const isHovered = hoveredNode === node.id;
            return (
              <g key={node.id} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} style={{ cursor: 'pointer' }}>
                {/* Glow for completed */}
                {node.status === 'completed' && (
                  <circle cx={node.x} cy={node.y} r={size + 6} fill={color} opacity={0.15} />
                )}
                <circle
                  cx={node.x} cy={node.y} r={isHovered ? size + 3 : size}
                  fill={node.status === 'not-started' ? '#E5E7EB' : color}
                  stroke={isHovered ? 'white' : 'none'}
                  strokeWidth={2}
                  style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}
                />
                <text x={node.x} y={node.y + size + 16} textAnchor="middle" fontSize={10} fill="#6B7280" fontWeight={600}>
                  {node.label}
                </text>
                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect x={node.x - 60} y={node.y - size - 40} width={120} height={30} rx={6} fill="#1a2332" opacity={0.95} />
                    <text x={node.x} y={node.y - size - 20} textAnchor="middle" fontSize={11} fill="white" fontWeight={700}>
                      {node.sessions} sessions · {node.status}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className={styles.legend}>
          <span><span className={styles.legendLine} style={{ background: '#22C55E' }} /> Completed</span>
          <span><span className={styles.legendLine} style={{ background: '#F59E0B', backgroundImage: 'repeating-linear-gradient(90deg, #F59E0B 0 8px, transparent 8px 12px)' }} /> In Progress</span>
          <span><span className={styles.legendLine} style={{ background: '#6B7280', backgroundImage: 'repeating-linear-gradient(90deg, #6B7280 0 4px, transparent 4px 8px)' }} /> Not Started</span>
        </div>
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
