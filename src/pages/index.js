import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home() {
    const router = useRouter()
    const [ user, setUser ] = useState({})

    useEffect(() => {
        async function fetchData() {
            // const token = window.localStorage.getItem("token")
            // console.log("== accessed token:", token)
            const res = await fetch('/api/user', {
                headers: {
                    "x-csrf-token": Cookies.get("csrf")
                }
            })
            if (res.status !== 200) {
                router.push(`/login?redirect=${router.asPath}`)
            }
            const body = await res.json()
            setUser(body)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Welcome!</h1>
            <button onClick={async () => {
                const res = await fetch("/api/logout")
                if (res.status === 200) {
                    router.push(`/login?redirect=${router.asPath}`)
                }
            }}>
                Logout
            </button>
            {user.name && <p>Name: {user.name}</p>}
            {user.email && <p>Email: {user.email}</p>}
        </div>
    )
}
