'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore, globalStore } from "@/lib/store";
import Filter from "@/components/dashboard/Filter";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const activeProject = userStore(state => state.activeProject);
    const setCompany = userStore(state => state.setCompany);
    const setProjects = userStore(state => state.setProjects);
    const setActiveProject = userStore(state => state.setActiveProject);
    const setUser = userStore(state => state.setUser);

    const sidebar = globalStore(state => state.sidebar);
    const setSidebar = globalStore(state => state.setSidebar);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const user = await axios_auth.get('/get-user');
                setUser(user.data);

                try {
                    const result = await axios_admin.get('/get-admin');

                    const company = result.data.company;
                    const projects = result.data.projects;

                    setUser({ ...user.data })
                    setProjects(projects);
                    setCompany(company);

                    if (activeProject === null) {
                        setActiveProject(projects[0]);
                    } else {
                        const project = projects.find((project: any) => project.projectID === activeProject.projectID);

                        if (project) {
                            setActiveProject(project);
                        } else {
                            setActiveProject(projects[0]);
                        }
                    }

                    setIsLoading(false);
                } catch (error: any) {
                    console.log(error.response.data);

                    if (error.response.data.code === "NO_PROJECT") {
                        setCompany(error.response.data.company);
                    }

                    router.push('/onboarding');
                }

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
            <main>
                {children}

                {/* Button to hide or show sidebar */}
                <button className={`fixed bottom-4 left-4 p-2 m-2 rounded-full shadow-md hover:bg-primary600 hover:text-white transition-all ${
                    sidebar ? 'text-white bg-primary600' : 'bg-white'
                }`} onClick={() => {
                    setSidebar(!sidebar);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="fixed bottom-4 right-4 m-4">
                    <Filter />
                </div>
            </main>
        )
    }
}