import { usePathname, useSearchParams } from "next/navigation";
import { useProject } from "@/features/projects/hooks/useProject"; // Adjust path to your hook
import Link from 'next/link'
import Image from 'next/image'
import { BoxIcon } from "lucide-react";

export function useHeaderTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get the current page base name (e.g., "/project")
  const currentPage = pathname.split("/").filter(Boolean).pop() || "home";

  // 2. Extract the id from the query parameters (?id=590f6ae3...)
  const isProjectPage = currentPage === "project";
  const projectId = isProjectPage ? searchParams.get("id") : null;

  // 3. Fetch from cache using the extracted ID
  const { data: project } = useProject(projectId ?? "");

  // 4. Return the correct title
  if (isProjectPage && project) {
    return (
      <div>
        <Link href={`/project?id=${project.id}`} className="flex items-center gap-2"> {/* TODO: Make it a dynamic URL */}
          { project.logo ? <Image src={project.log} alt={project.name} className="w-4 aspect-square" /> : <BoxIcon color={project.theme} fill={project.theme} size="16" />}
          <span className="text-sm">{project.name}</span>
        </Link>
      </div>
    );
  }

  // Fallback formatting for standard pages
  return (
    <div>
      <span className="text-sm">
        { 
          currentPage.charAt(0).toUpperCase() +
          currentPage.slice(1).replace(/-/g, " ")
        }
      </span>
    </div>
  );
}
