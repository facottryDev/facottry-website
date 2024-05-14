'use client'
import { axios_auth, axios_admin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const setUser = userStore(state => state.setUser);
    const setCompany = userStore(state => state.setCompany);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const { data } = await axios_auth.get('/get-user');
                setUser(data);

                try {
                    await axios_admin.get('/get-admin');
                    return router.push("/dashboard/home");
                } catch (error: any) {
                    console.log(error.response.data);
                    setCompany(error.response.data.company);
                }

                setIsLoading(false);
            } catch (error: any) {
                console.log(error.response.data);
                router.push("/");
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