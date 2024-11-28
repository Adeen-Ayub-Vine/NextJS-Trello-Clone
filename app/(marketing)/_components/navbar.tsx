import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
    return(
        <div className="fixed top-0 w-full h-20 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo/>
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button className="text-lg md:text-xl" size={"sm"} variant={"outline"} asChild>
                        <Link href={"/sign-in"}>Login</Link>
                    </Button>
                    <Button className="text-lg md:text-xl text-white" size={"sm"} asChild>
                        <Link href={"/sign-up"}>Get Taskify for Free</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}