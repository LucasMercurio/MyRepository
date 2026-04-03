import { useEffect, useState, useRef } from "react";
import "./index.css"

export default function ProgressBar({ start, onComplete }) {
    const [progress, setProgress] = useState(0)
    const completedRef = useRef(false)
    const onCompleteRef = useRef(onComplete)

    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    /* eslint-disable react-hooks/set-state-in-effect -- reset progress when bar mounts */
    useEffect(() => {
        if (!start) return

        completedRef.current = false
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100
                return prev + 2
            })
        }, 50)

        return () => clearInterval(interval)
    }, [start])
    /* eslint-enable react-hooks/set-state-in-effect */

    useEffect(() => {
        if (!start || progress < 100 || completedRef.current) return
        completedRef.current = true
        onCompleteRef.current?.()
    }, [start, progress])

    const totalBlocks = 20
    const filledBlocks = Math.floor((progress / 100) * totalBlocks)

    const bar = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks)

    return (
        <div className="progress-container">

            <p>
                [{bar}] {progress}%
            </p>
        </div>
    )
}