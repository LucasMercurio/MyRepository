import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './progressBar/index'
import './index.css'

const lines = [
    "> Initializing system...",
    "> Loading portfolio",
    "> Loading projects",
    "> Checking updates",
    "> Checking dependencies",
    "> Preparing experience",
    "> Experience ready...",
    "",
    "",
    "> Welcome, user",
    "",
    "",
    "",
    "",
    "> Starting Lucas Mercurio Portfolio... Enjoy ;)"
]


export default function Loader() {
    const navigate = useNavigate()
    const [displayedLine, setDisplayedLine] = useState([])
    const [currentLine, setCurrentLine] = useState("")
    const [lineIndex, setLineIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [showProgress, setShowProgress] = useState(false)
    const [progressDone, setProgressDone] = useState(false)
    const progressComplete = useRef(false)

    const handleProgressComplete = useCallback(() => {
        if (progressComplete.current) return
        progressComplete.current = true
        setProgressDone(true)
        setShowProgress(false)
        setLineIndex((prev) => prev + 1)
    }, [])

    /* eslint-disable react-hooks/set-state-in-effect -- staged terminal typewriter animation */
    useEffect(() => {
        if (lineIndex >= lines.length) return;

        if (lines[lineIndex] === "> Preparing experience" && !showProgress) {
            setShowProgress(true)
        }

        if (showProgress && !progressDone && charIndex === 0) {
            return
        }

        if (charIndex < lines[lineIndex].length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + lines[lineIndex][charIndex])
                setCharIndex(charIndex + 1)
            }, 40)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLine((prev) => [...prev, currentLine])
                setCurrentLine("")
                setCharIndex(0)

                if (lines[lineIndex] !== "> Preparing experience") {
                    setLineIndex((prev) => prev + 1)
                }
            }, 1500)
            return () => clearTimeout(timeout)
        }
    }, [charIndex, lineIndex, showProgress, progressDone]) // eslint-disable-line react-hooks/exhaustive-deps -- currentLine snapshot in timeout
    /* eslint-enable react-hooks/set-state-in-effect */
    return (
        <div className='loaderTerminal'>

            {displayedLine.map((line, index) => {
                return (
                    <p key={index}>{line}</p>
                )

            })}

            {lineIndex < lines.length ? (
                <p>
                    {currentLine}
                    <span className="cursor">|</span>
                </p>
            ) : null}

            {showProgress && !progressDone && (
                <ProgressBar start={showProgress} onComplete={handleProgressComplete} />
            )}

            {lineIndex >= lines.length ? (
                <button
                    type="button"
                    className="loaderTerminal__cta"
                    onClick={() => navigate('/loading')}
                >
                    [ CONTINUAR ]
                </button>
            ) : null}
        </div>
    )
}
