/**
 * SkillsChart — Gráfico de setores interativo feito com SVG.
 *
 * Cada fatia é um <path> SVG (arco de pizza).
 * Ao passar o mouse, a fatia "salta" pra fora e exibe um tooltip
 * com detalhes do que o Lucas sabe naquela linguagem.
 *
 * Dados baseados no GitHub: https://github.com/LucasMercurio
 * CSS: 65.616 bytes, JS: 63.185 bytes, HTML: 39.863 bytes (total: 168.664)
 */

import { useState } from 'react'
import { useLanguage } from '../../context/useLanguage'

const LANGUAGES = [
    {
        name: 'CSS',
        percent: 38.9,
        color: '#64B5F6',
        description: {
            pt: 'Layouts responsivos com Flexbox e Grid, estilização de componentes, animações CSS, organização de estilos em projetos como portfolios, landing pages (AluraPlus), e-commerce (Casa do Norte) e sites de viagens (Jornada Viagens).',
            en: 'Responsive layouts with Flexbox & Grid, component styling, CSS animations, and style architecture across portfolios, landing pages (AluraPlus), e-commerce (Casa do Norte), and travel sites (Jornada Viagens).',
        },
    },
    {
        name: 'JavaScript',
        percent: 37.5,
        color: '#FFD54F',
        description: {
            pt: 'React 18/19 com Vite, React Router, Three.js, GSAP, Context API (i18n), React Markdown, manipulação de DOM, formulários dinâmicos (Form-React), cronômetros, conversores de moeda e deploy na Vercel.',
            en: 'React 18/19 with Vite, React Router, Three.js, GSAP, Context API (i18n), React Markdown, DOM manipulation, dynamic forms (Form-React), timers, currency converters, and Vercel deployments.',
        },
    },
    {
        name: 'HTML',
        percent: 23.6,
        color: '#FF8A65',
        description: {
            pt: 'Estruturação semântica, acessibilidade (ARIA), formulários, sites multi-página, integração com React e frameworks modernos — presente em todos os 13 repositórios públicos.',
            en: 'Semantic structure, accessibility (ARIA), forms, multi-page sites, integration with React and modern frameworks — present across all 13 public repositories.',
        },
    },
]

/* ── Geometria do gráfico ── */

function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, startAngle)
    const end = polarToCartesian(cx, cy, r, endAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return [
        `M ${cx} ${cy}`,
        `L ${start.x} ${start.y}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
        'Z',
    ].join(' ')
}

const GAP_DEG = 0 // sem espaço entre fatias (círculo contínuo)
const POP = 14 // distância de "salto" no hover (px)

export default function SkillsChart() {
    const { locale } = useLanguage()
    const [hovered, setHovered] = useState(null)

    const cx = 150
    const cy = 150
    const r = 135
    let currentAngle = 0

    const totalSweep = 360 - GAP_DEG * LANGUAGES.length

    const slices = LANGUAGES.map((lang, i) => {
        const sweep = (lang.percent / 100) * totalSweep
        const startAngle = currentAngle + GAP_DEG / 2
        const endAngle = startAngle + sweep
        currentAngle = endAngle + GAP_DEG / 2

        // Ponto médio do arco — direção pra onde a fatia "salta"
        const midAngle = (startAngle + endAngle) / 2
        const rad = ((midAngle - 90) * Math.PI) / 180
        const tx = hovered === i ? Math.cos(rad) * POP : 0
        const ty = hovered === i ? Math.sin(rad) * POP : 0

        return {
            ...lang,
            d: describeArc(cx, cy, r, startAngle, endAngle),
            tx,
            ty,
            index: i,
        }
    })

    const active = hovered !== null ? LANGUAGES[hovered] : null

    return (
        <div className="skills-chart">
            <div className="skills-chart__graph">
                <svg
                    viewBox="0 0 300 300"
                    className="skills-chart__svg"
                    aria-label="Skills pie chart"
                >
                    {slices.map((s) => (
                        <path
                            key={s.name}
                            d={s.d}
                            fill={s.color}
                            stroke={s.color}
                            strokeWidth={1}
                            className={`skills-chart__slice${hovered === s.index ? ' skills-chart__slice--active' : ''}`}
                            style={{
                                transform: `translate(${s.tx}px, ${s.ty}px)`,
                            }}
                            onMouseEnter={() => setHovered(s.index)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="skills-chart__info">
                <ul className="skills-chart__legend">
                    {LANGUAGES.map((lang, i) => (
                        <li
                            key={lang.name}
                            className={`skills-chart__legend-item${hovered === i ? ' skills-chart__legend-item--active' : ''}`}
                        >
                            <span
                                className="skills-chart__legend-dot"
                                style={{ backgroundColor: lang.color }}
                            />
                            <span className="skills-chart__legend-name">
                                {lang.name}
                            </span>
                            <span className="skills-chart__legend-pct">
                                {lang.percent.toFixed(1)}%
                            </span>
                        </li>
                    ))}
                </ul>

                <div
                    className={`skills-chart__tooltip${active ? ' skills-chart__tooltip--visible' : ''}`}
                >
                    {active && (
                        <>
                            <span
                                className="skills-chart__tooltip-name"
                                style={{ color: active.color }}
                            >
                                {active.name} — {active.percent}%
                            </span>
                            <p className="skills-chart__tooltip-desc">
                                {active.description[locale] ||
                                    active.description.en}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
