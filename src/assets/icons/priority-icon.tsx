import * as React from "react";

export interface PriorityIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 2. */
  strokeWidth?: number | string;
}

function createPriorityIcon(name: string, paths: string[]) {
  const Icon = React.forwardRef<SVGSVGElement, PriorityIconProps>(
    (
      { size = 24, color = "currentColor", strokeWidth = 2, className, ...props },
      ref
    ) => {
      const dimension = size === "full" ? "100%" : size;

      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={dimension}
          height={dimension}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          aria-hidden="true"
          className={[`priority-icon priority-${name.toLowerCase()}`, className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      );
    }
  );
  Icon.displayName = `${name}PriorityIcon`;
  return Icon;
}

export const HighestPriorityIcon = createPriorityIcon("Highest", [
  "M3 12L12 6L21 12",
  "M3 18L12 12L21 18",
]);

export const HighPriorityIcon = createPriorityIcon("High", [
  "M3 15L12 9L21 15",
]);

export const MediumPriorityIcon = createPriorityIcon("Medium", [
  "M3 9H21",
  "M3 15H21",
]);

export const LowPriorityIcon = createPriorityIcon("Low", [
  "M3 9L12 15L21 9",
]);

export const LowestPriorityIcon = createPriorityIcon("Lowest", [
  "M3 6L12 12L21 6",
  "M3 12L12 18L21 12",
]);

/* Convenience wrapper for your task priorities */

export type TaskPriority = "Highest" | "High" | "Medium" | "Low" | "Lowest";

const icons = {
  Highest: HighestPriorityIcon,
  High: HighPriorityIcon,
  Medium: MediumPriorityIcon,
  Low: LowPriorityIcon,
  Lowest: LowestPriorityIcon,
} satisfies Record<TaskPriority, React.ElementType>;

/** Tailwind text colors, in case you want them colored like Jira */
export const priorityColorClass: Record<TaskPriority, string> = {
  Highest: "text-red-600",
  High: "text-red-500",
  Medium: "text-orange-500",
  Low: "text-blue-500",
  Lowest: "text-blue-400",
};

/** "high", "HIGH" and "High" all resolve to "High". Returns undefined for anything else. */
export function normalizePriority(value?: string | null): TaskPriority | undefined {
  if (!value) return undefined;
  const lower = value.trim().toLowerCase();
  return (Object.keys(icons) as TaskPriority[]).find(
    (key) => key.toLowerCase() === lower
  );
}

export function PriorityIcon({
  priority,
  colored = false,
  className,
  ...props
}: PriorityIconProps & {
  priority?: string | null;
  colored?: boolean;
}) {
  const key = normalizePriority(priority);
  if (!key) return null;

  const Icon = icons[key];

  return (
    <Icon
      className={[colored && priorityColorClass[key], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}