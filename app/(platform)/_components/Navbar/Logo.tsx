'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"

export const Logo = () => {
    const router = useRouter();
    return (
        <Link href="/">
            <div className="flex items-center gap-x-2 cursor-pointer">
                <Image
                    // onClick={() => router.push('/')}
                    src="/images/logo.svg"
                    alt="Logo"
                    height={30}
                    width={30}
                />
                <p className="text-xl font-bold text-sky-700 pb-1">
                    SpaceShare
                </p>
            </div>
        </Link>
    );
};