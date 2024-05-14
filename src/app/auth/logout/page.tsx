'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { axios_auth } from "@/lib/axios"
import { filterStore, userStore } from "@/lib/store"

const Logout = () => {
    const router = useRouter();
    const setFilter = filterStore(state => state.setFilter);
    const setUser = userStore(state => state.setUser);
    const setCompany = userStore(state => state.setCompany);
    const setProjects = userStore(state => state.setProjects);
    const setActiveProject = userStore(state => state.setActiveProject);

    useEffect(() => {
        const logout = async () => {
            try {
                await axios_auth.get('/logout');
                
                setProjects([]);
                setActiveProject(null);
                setUser(null);
                setCompany(null);
                setFilter({
                    country: "",
                    subscription: "",
                    os: "",
                    osver: "",
                });

                router.push('/auth/login');
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