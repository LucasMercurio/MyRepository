import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLanguage } from '../../context/useLanguage'

import './index.css'



gsap.registerPlugin(ScrollTrigger)



const FONT_CYCLE_MS = 4200



const welcomeFonts = [

    'home-welcome__layer--serif',

    'home-welcome__layer--sans',

    'home-welcome__layer--mono',

]



export default function Home() {

    const { locale, setLocale, t } = useLanguage()

    const [activeFont, setActiveFont] = useState(0)



    const homeRef = useRef(null)

    const spacerRef = useRef(null)

    const aboutPanelRef = useRef(null)

    const aboutTitleRef = useRef(null)

    const aboutGridRef = useRef(null)

    const footerRef = useRef(null)



    useEffect(() => {

        const id = setInterval(() => {

            setActiveFont((i) => (i + 1) % welcomeFonts.length)

        }, FONT_CYCLE_MS)

        return () => clearInterval(id)

    }, [])



    useLayoutEffect(() => {

        const home = homeRef.current

        const spacer = spacerRef.current

        const panel = aboutPanelRef.current

        const titleEl = aboutTitleRef.current

        const gridEl = aboutGridRef.current

        const footerEl = footerRef.current



        if (!home || !spacer || !panel || !titleEl || !gridEl) return



        const reduceMotion = window.matchMedia(

            '(prefers-reduced-motion: reduce)',

        )



        if (reduceMotion.matches) {

            gsap.set(panel, { yPercent: 0 })

            gsap.set([titleEl, gridEl], { opacity: 1, y: 0 })

            if (footerEl) gsap.set(footerEl, { autoAlpha: 0 })

            return

        }



        const ctx = gsap.context(() => {

            gsap.set(panel, { yPercent: 100 })

            gsap.set(titleEl, { opacity: 0, y: 32 })

            gsap.set(gridEl, { opacity: 0, y: 28 })

            if (footerEl) gsap.set(footerEl, { autoAlpha: 1 })



            const tl = gsap.timeline({

                scrollTrigger: {

                    trigger: spacer,

                    start: 'top bottom',

                    end: 'top top',

                    scrub: 1,

                },

            })



            tl.fromTo(

                panel,

                { yPercent: 100 },

                { yPercent: 0, ease: 'none', duration: 1 },

                0,

            )

            if (footerEl) {

                tl.fromTo(

                    footerEl,

                    { autoAlpha: 1 },

                    { autoAlpha: 0, ease: 'none', duration: 0.28 },

                    0,

                )

            }

            tl.fromTo(

                titleEl,

                { opacity: 0, y: 32 },

                { opacity: 1, y: 0, ease: 'none', duration: 0.55 },

                0.18,

            )

            tl.fromTo(

                gridEl,

                { opacity: 0, y: 28 },

                { opacity: 1, y: 0, ease: 'none', duration: 0.55 },

                0.28,

            )

        }, home)



        return () => ctx.revert()

    }, [])



    return (

        <div className="home" ref={homeRef}>

            <ShaderGradientCanvas

                className="home__canvas"

                style={{

                    position: 'fixed',

                    inset: 0,

                    zIndex: 0,

                    pointerEvents: 'none',

                }}

                pixelDensity={0.9}

                fov={40}

            >

                <ShaderGradient

                    animate="on"

                    axesHelper="off"

                    brightness={0}

                    cAzimuthAngle={190}

                    cDistance={4.5}

                    cPolarAngle={70}

                    cameraZoom={1}

                    color1="#000027"

                    color2="#00002e"

                    color3="#ffffff"

                    destination="onCanvas"

                    embedMode="off"

                    envPreset="city"

                    format="gif"

                    fov={40}

                    frameRate={10}

                    gizmoHelper="hide"

                    grain="off"

                    lightType="3d"

                    pixelDensity={0.9}

                    positionX={0}

                    positionY={0.9}

                    positionZ={-0.3}

                    range="enabled"

                    rangeEnd={40}

                    rangeStart={0}

                    reflection={0.1}

                    rotationX={45}

                    rotationY={0}

                    rotationZ={0}

                    shader="defaults"

                    type="waterPlane"

                    uAmplitude={0}

                    uDensity={1.2}

                    uFrequency={0}

                    uSpeed={0.1}

                    uStrength={1.2}

                    uTime={0}

                    wireframe={false}

                />

            </ShaderGradientCanvas>



            <div className="home__content">

                <header className="home__header" />



                <main className="home__main">

                    <div className="home-welcome" aria-live="polite">

                        {welcomeFonts.map((cls, i) => (

                            <span

                                key={cls}

                                className={`home-welcome__layer ${cls}${i === activeFont ? ' home-welcome__layer--active' : ''}`}

                            >

                                {t.home.welcome}

                            </span>

                        ))}

                    </div>

                </main>



                <footer className="home__footer" ref={footerRef}>

                    <span className="home-lang__label">{t.home.langLabel}</span>

                    <div

                        className="home-lang"

                        role="group"

                        aria-label={t.home.langLabel}

                    >

                        <button

                            type="button"

                            className={`home-lang__btn${locale === 'pt' ? ' home-lang__btn--active' : ''}`}

                            onClick={() => setLocale('pt')}

                            aria-pressed={locale === 'pt'}

                            title="Português"

                        >

                            <img

                                src="/flags/br.png"

                                alt=""

                                width={36}

                                height={36}

                                className="home-lang__flag"

                            />

                        </button>

                        <button

                            type="button"

                            className={`home-lang__btn${locale === 'en' ? ' home-lang__btn--active' : ''}`}

                            onClick={() => setLocale('en')}

                            aria-pressed={locale === 'en'}

                            title="English"

                        >

                            <img

                                src="/flags/us.png"

                                alt=""

                                width={36}

                                height={36}

                                className="home-lang__flag"

                            />

                        </button>

                    </div>

                </footer>

            </div>



            <div

                ref={spacerRef}

                className="home__scroll-spacer"

                aria-hidden="true"

            />



            <section

                ref={aboutPanelRef}

                className="home-about"

                aria-labelledby="home-about-title"

            >

                <div className="home-about__inner">

                    <h2

                        id="home-about-title"

                        ref={aboutTitleRef}

                        className="home-about__title"

                    >

                        {t.about.title}

                    </h2>

                    <div ref={aboutGridRef} className="home-about__grid">

                        <p className="home-about__text">{t.about.body}</p>

                        <div className="home-about__photo">

                            <img

                                className="home-about__photo-img"

                                src="/about-portrait.png"

                                alt=""

                                width={480}

                                height={480}

                                decoding="async"

                            />

                            <div

                                className="home-about__photo-overlay"

                                aria-hidden="true"

                            />

                        </div>

                    </div>

                </div>

            </section>

        </div>

    )

}

