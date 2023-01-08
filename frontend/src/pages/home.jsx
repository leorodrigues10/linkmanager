import React from 'react'
import { useAuth } from '../hooks/useAuth'

function Home() {
    const { isAuthenticated } = useAuth()
    console.log(isAuthenticated)
    return (
        <div>Logiogin</div>
    )
}

export default Home