import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/useLanguage'
import './index.css'

export default function PageLoading() {
    const navigate = useNavigate()
    const { t } = useLanguage()

    useEffect(() => {
        const id = setTimeout(() => {
            navigate('/home', { replace: true })
        }, 1400)
        return () => clearTimeout(id)
    }, [navigate])

    return (
        <div className="pageLoading">
            <div className="pageLoading__inner">
                <div className="pageLoading__bar" aria-hidden />
                <p className="pageLoading__text">{t.loading.text}</p>
            </div>
        </div>
    )
}
