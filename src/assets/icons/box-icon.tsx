import * as React from "react";

export interface BoxIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 2, matching Lucide. */
  strokeWidth?: number | string;
}

/**
 * Lucide "box" icon, redrawn with sharp corners.
 *
 * Geometry matches Lucide's box: a regular hexagon (radius 10, centered at
 * 12,12) with the inner "Y" running 3.34,7 → 12,12 → 20.66,7 and 12,12 → 12,22.
 * Lucide's rounded arcs are replaced with straight segments and miter joins.
 */
export const BoxIcon = React.forwardRef<SVGSVGElement, BoxIconProps>(
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
        className={["lucide lucide-box-sharp", className].filter(Boolean).join(" ")}
        {...props}
      >
        {/* Outer hexagon (cube silhouette) */}
        <path d="M12 2 20.66 7v10L12 22l-8.66-5V7Z" />
        {/* Top face fold */}
        <path d="M3.34 7 12 12l8.66-5" />
        {/* Center vertical edge */}
        <path d="M12 12v10" />
      </svg>
    );
  }
);

BoxIcon.displayName = "BoxIcon";

export default BoxIcon;