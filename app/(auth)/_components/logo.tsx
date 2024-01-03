import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/toggle-theme"

const font = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image src='/logo.svg' alt="Spaceshare" height='80' width='80' />
            </div>
            <div className="gap-6">
                <ModeToggle />
            </div>
        </div>
    )
}