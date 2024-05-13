'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projectStore, activeProjectStore, userStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const setProjects = projectStore(state => state.setProjects);
    const activeProjectID = activeProjectStore(state => state.projectID);
    const setActiveProject = activeProjectStore(state => state.setActiveProject);
    const setUser = userStore(state => state.setUser);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const user = await axios_auth.get('/get-user');
                setUser(user.data);

                try {
                    await axios_admin.get('/is-admin');
                } catch (error) {
                    router.push('/onboarding/personal');
                }

                const admin_projects = await axios_admin.get('/get-admin-projects');
                setProjects(admin_projects.data);

                if (activeProjectID === '') {
                    setActiveProject(admin_projects.data[0].projectID);
                }

                setIsLoading(false);
            } catch (error: any) {
                console.log(error);
                router.push('/');
            }
        }

        isAuth();
    }, [])

    if (isLoading) {
        return <div> Loading... </div>
    } else {
        return (
            <main>{children}</main>
        )
    }
}