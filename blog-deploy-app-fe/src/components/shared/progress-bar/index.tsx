'use client'
import { useContext } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { GlobalContext } from '@/contexts/GlobalContext'
const ProgressBar = () => {
    const { progress, setProgress } = useContext(GlobalContext)
    return (
        <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
    )
}

export default ProgressBar
