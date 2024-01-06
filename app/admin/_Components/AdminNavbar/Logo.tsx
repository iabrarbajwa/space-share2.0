'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"

export const Logo = () => {
    const router = useRouter();
    return (
        <Link href="/admin/dashboard">
            <div className="flex items-center gap-x-2 cursor-pointer">
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    height={30}
                    width={30}
                />
                <p className="text-xl font-bold text-zinc-950 pb-1">
                    SpaceShare Administrator
                </p>
            </div>
        </Link>
    );
};