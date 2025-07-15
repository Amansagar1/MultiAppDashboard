"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductionPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/production/amla-line-6');
    }, [router]);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}