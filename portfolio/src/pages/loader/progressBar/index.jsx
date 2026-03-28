import { useEffect, useState } from "react";
import "./index.css"

export default function ProgressBar({ start, onComplete }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!start) return

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)

                    return 100
                }
                return prev + 2
            })
        }, 50);

        return () => clearInterval(interval)
    }, [start])

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