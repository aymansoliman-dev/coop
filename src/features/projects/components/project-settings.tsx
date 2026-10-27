import GeneralSettings from "@/features/projects/components/ui/general-settings";
import TechStackSettings from "@/features/projects/components/ui/tech-stack-settings";
import CollaboratorsSettings from "@/features/projects/components/ui/collaborators-settings";
import DangerZoneSettings from "@/features/projects/components/ui/danger-zone-settings";
import AssetsSettings from "@/features/projects/components/ui/assets-settings";
import { useState } from "react";
import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/shared/components/ui/scroll-spy";
import { BoltIcon } from "lucide-react";

const navigationItems = [
  { href: "general", label: "General" },
  { href: "tech-stack", label: "Tech stack" },
  { href: "project-collaborators", label: "Collaborators" },
  { href: "assets", label: "Assets" },
  { href: "danger-zone", label: "Danger zone" },
];

export default function ProjectSettings() {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <div className="grid h-full min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background mt-4">
      <div className="min-h-0 bg-background py-8 border-b px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold">Project Settings</h3>
          <BoltIcon />
        </div>
        <p className="text-muted-foreground">
          Manage how this project looks, who can work on it, and what it is
          built with.
        </p>
      </div>

      <ScrollSpy
        offset={28}
        scrollContainer={scrollContainer}
        className="w-full grid min-h-0 min-w-0 md:grid-cols-[11rem_minmax(0,1fr)] grid-rows-[auto_1fr] md:grid-rows-none overflow-hidden"
      >
        <ScrollSpyNav className="border-r flex h-fit md:h-auto min-h-0 shrink flex-row md:flex-col overflow-hidden gap-0 border-b md:border-b-0">
          {navigationItems.map(({ href, label }) => (
            <ScrollSpyLink
              key={href}
              value={href}
              className="p-3 rounded-none grow text-center md:text-left md:grow-0"
            >
              {label}
            </ScrollSpyLink>
          ))}
        </ScrollSpyNav>
        <ScrollSpyViewport
          ref={setScrollContainer}
          className="overflow-y-auto p-4 pb-7 scroll-fade-y scrollbar-gutter-stable gap-6"
        >
          <ScrollSpySection value="general">
            <GeneralSettings />
          </ScrollSpySection>
          
          <ScrollSpySection value="tech-stack">
            <TechStackSettings />
          </ScrollSpySection>
          
          <ScrollSpySection value="project-collaborators">
            <CollaboratorsSettings />
          </ScrollSpySection>
          
          <ScrollSpySection value="assets">
            <AssetsSettings />
          </ScrollSpySection>
          
          <ScrollSpySection value="danger-zone">
            <DangerZoneSettings />
          </ScrollSpySection>
          
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
