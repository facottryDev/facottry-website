'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projectStore, userStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const setProjects = projectStore(state => state.setProjects);
    const activeProject = projectStore(state => state.activeProject);
    const setActiveProject = projectStore(state => state.setActiveProject);
    const setUser = userStore(state => state.setUser);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const user = await axios_auth.get('/get-user');
                setUser(user.data);

                try {
                    await axios_admin.get('/is-admin');

                    const admin_projects = await axios_admin.get('/get-admin-projects');
                    setProjects(admin_projects.data);

                    if (activeProject.projectID === '') {
                        setActiveProject(admin_projects.data[0]);
                    }
                } catch (error: any) {
                    router.push('/onboarding/personal');
                }

                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
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