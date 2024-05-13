'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projectStore, activeProjectStore, userStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    
    const setUser = userStore(state => state.setUser);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const user = await axios_auth.get('/get-user');

                try {
                    await axios_admin.get('/is-admin');
                    router.push('/dashboard/home');
                } catch (error) {
                    console.log('Welcome to Onboarding!');
                }

                setUser(user.data);
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