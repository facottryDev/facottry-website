'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { axios_auth } from "@/lib/axios"
import { projectStore, filterStore, userStore } from "@/lib/store"

const Logout = () => {
    const router = useRouter();
    const setProjects = projectStore(state => state.setProjects);
    const setActiveProject = projectStore(state => state.setActiveProject);
    const setFilter = filterStore(state => state.setFilter);
    const setUser = userStore(state => state.setUser);

    useEffect(() => {
        const logout = async () => {
            try {
                await axios_auth.get('/logout');
                
                setProjects([]);
                setActiveProject({
                    projectID: "",
                    companyID: "",
                    name: "",
                    type: "",
                    role: "",
                });
                setFilter({
                    country: "",
                    subscription: "",
                    os: "",
                    osver: "",
                });
                setUser({
                    email: "",
                    name: "",
                    address: "",
                    mobile: "",
                    profilePic: "",
                    createdAt: "",
                    updatedAt: "",
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