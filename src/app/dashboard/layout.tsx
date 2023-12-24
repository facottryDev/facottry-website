'use client'
import { axios_instance } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isAuth = async () => {
            try {
                await axios_instance.get('/');
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