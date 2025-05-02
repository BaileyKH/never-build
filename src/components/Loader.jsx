import { useState, useEffect, use } from "react";

const message = [
    "Reticulating splines...",
    "Compiling duckface filter...",
    "Synchronizing sarcasm module...",
    "Loading infinite pizza buffer...",
    "Defragmenting cloud unicorns...",
    "Allocating existential dread...",
]

export const Loader = () => {

    const [app, setApp] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    // Handler for updating state with app name when input changes
    const getApp = (e) => {
        setApp(e.target.value)
    }

    // Reverts to inital state after length of interval set in useEffect
    const onSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setCurrentIndex(0)
            setApp('')
        }, 12000)
    }

    // Cycles through messages every 2 seconds while loading is true
    useEffect(() => {
        if (!loading) {
            setProgress(0)
            return
        }

        let current = 0

        const loadInterval = setInterval(() => {
            const bump = Math.floor(Math.random() * 8) + 1
            current = Math.min(current + bump, 100)
            setProgress(current)
        }, 500)

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex >= message.length - 1) {
                    return prevIndex
                }

                return prevIndex + 1
            })
        }, 2000)

        return () => {
            clearInterval(interval)
            clearInterval(loadInterval)
        }

    }, [loading])

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-lg">{loading ? `Building ${app}` : 'Create your dream App!'}</h1>
                <input 
                    name='app'
                    value={app}
                    onChange={getApp}
                    placeholder="App Name"
                    className="w-96 px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                />
                {!loading && currentIndex > 0 && (
                    <p className="text-xs text-green-500">All done! I didn't feel like building it. Wanna try again?</p>
                )}
                {loading ? <div className="flex flex-col justify-center items-center"><div className="w-96 h-4 bg-gray-300 rounded overflow-hidden mt-4 shadow-inner"><div className="h-full bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}></div></div><p>{message[currentIndex]}</p></div> : <button 
                    type="submit"
                    className="text-gray-100 tracking-wide bg-green-400 px-2 py-1 rounded-md shadow-md"
                >
                    Create App
                </button>}
            </form>
        </div>
    );
}