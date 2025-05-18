import { Blocks, Github } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray-800/50 mt-auto py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <Blocks className="size-4" />
          <span>Created by developer Aman Singh</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/itzaman03"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            <Github className="size-4" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
