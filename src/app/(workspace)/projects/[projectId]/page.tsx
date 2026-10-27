"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/features/projects/hooks/use-project";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import ProjectOverview from "@/features/projects/components/project-overview";
import ProjectSettings from "@/features/projects/components/project-settings";
import { HomeIcon } from "@/assets/icons";
import { EmptyPage } from "@/shared/components/empty-page";
// import { getSelectionForeground } from "@/shared/lib/utils";
import { BoltIcon } from "lucide-react";
import { KBD } from "@/shared/components/kbd";
import { useRef } from "react";

export default function Project() {
  const { projectId } = useParams();
  const { data: project = {}, isError } = useProject();
  const settingsTabRef = useRef<HTMLButtonElement>(null);

  if (isError)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <EmptyPage />
      </div>
    );
  if (!project || !projectId) return null;

  // const selectionForeground = getSelectionForeground(project.theme);

  return (
    <div
      className="relative h-full min-h-0 min-w-0 overflow-hidden selection:bg-(--project-theme) selection:text-(--project-selection-foreground)!"
      style={
        {
          "--project-theme": project.theme,
          "--project-selection-foreground":
            "oklch(from var(--project-theme) clamp(0, (0.7 - l) * 1000, 1) 0 0)",
        } as React.CSSProperties
      }
    >
      {project.is_owner ? (
        <Tabs className="h-full min-h-0 w-full">
          <TabsList className="z-30 fixed top-(--header-height) select-none">
            <TabsTrigger value="overview" style={{ borderTop: "none" }}>
              <HomeIcon />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              style={{ borderTop: "none" }}
              ref={settingsTabRef}
            >
              <BoltIcon />
              Settings
              <KBD
                action={() => settingsTabRef.current?.click()}
                enabled={!!projectId}
              >
                Ctrl + Shift + ,
              </KBD>
            </TabsTrigger>
            {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview">
            <ProjectOverview className="mt-5" />
          </TabsContent>

          <TabsContent value="settings" className="min-h-0 overflow-hidden">
            <ProjectSettings />
          </TabsContent>
        </Tabs>
      ) : (
        <ProjectOverview />
      )}
    </div>
  );
}
