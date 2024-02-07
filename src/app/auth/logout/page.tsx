'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { axios_auth } from "@/lib/axios"

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            try {
                const result = await axios_auth.get('/logout');
                console.log(result.data);
                router.push('/');
            } catch (error: any) {
                console.log(error.response.data);
            }
        }

        logout();
    }, [])


    return (
        <div>Logging out...</div>
    )
}

export default Logout