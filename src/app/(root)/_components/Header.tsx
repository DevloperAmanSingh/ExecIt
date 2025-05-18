import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4 group">
            <div
              className="relative bg-gradient-to-br from-[#1e1e2f] to-[#11111b] p-4 rounded-2xl ring-1 ring-white/10 overflow-hidden
    before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:bg-indigo-500/10 before:transition-opacity
    group-hover:before:opacity-100 transition-all duration-500"
            >
              <Code2 className="size-8 text-indigo-400 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-semibold bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 text-transparent bg-clip-text">
                ExecIt
              </span>
              <span className="text-sm text-slate-400 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Navigation */}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
          </div>

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
