import { usePathname, useSearchParams } from "next/navigation";
import { useProject } from "@/features/projects/hooks/useProject"; // Adjust path to your hook
import Link from 'next/link'
import Image from 'next/image'
import { BoxIcon } from "@/assets/icons";

export function useHeaderTitle() {
  const pathname = usePathname();
  const currentPage = pathname.split("/").filter(Boolean).pop() || "home";
  const tab = useSearchParams().get('tab') ?? 'overview';
  const projectId = pathname.match(/^\/projects\/([^/]+)/)?.[1] ?? null;
  const isProjectRoute = !!projectId;

  const { data: project } = useProject(projectId ?? "");

  if (isProjectRoute && project) {
    return (
      <div>
        <Link href={`/projects/${project.id}?tab=${tab}`} className="flex items-center gap-2">
          { project.logo ? <Image src={project.logo} alt={project.name} width={16} height={16} unoptimized className="h-4 w-4 shrink-0 object-cover object-center" /> : <BoxIcon color={project.theme} fill={project.theme} size="16" />}
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
