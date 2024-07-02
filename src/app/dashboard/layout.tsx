'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore, activeFilterStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const activeProject = userStore(state => state.activeProject);
    const setCompany = userStore(state => state.setCompany);
    const setProjects = userStore(state => state.setProjects);
    const setActiveProject = userStore(state => state.setActiveProject);
    const setUser = userStore(state => state.setUser);
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const user = await axios_auth.get('/get-user');
                setUser(user.data);

                try {
                    const result = await axios_admin.get('/get-admin');

                    const company = result.data.company;
                    const projects = result.data.projects;

                    // set user, projects and company
                    setUser({ ...user.data })
                    setProjects(projects);
                    setCompany(company);

                    // if activeProject is null, set it to first project
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

                    // if activeFilter is empty object, set it to default values
                    if (Object.keys(activeFilter).length === 0) {
                        const defaultFilter = Object.keys(projects[0].filters).map((key) => {
                            return {
                                [key]: ""
                            }
                        }).reduce((acc, curr) => {
                            return { ...acc, ...curr }
                        }, {});

                        setActiveFilter(defaultFilter);
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
            </main>
        )
    }
}