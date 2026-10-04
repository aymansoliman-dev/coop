import * as React from "react";

export interface LayoutIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 1.2, as in the original SVG. */
  strokeWidth?: number | string;
}

/**
 * Sharp outlined frame split by a horizontal line, with a staggered vertical
 * divider in each half (top divider left of center, bottom divider right of it).
 *
 * Drawn on a 25x25 grid, centered at 12.5. The frame spans 3 to 22 (19 units,
 * about 76% of the grid; it was 5.5 to 19.5, 56%), and the dividers keep their
 * original proportions inside it.
 */
export const LayoutDashboardIcon = React.forwardRef<SVGSVGElement, LayoutIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 1.2, className, ...props },
    ref
  ) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="0 0 25 25"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        aria-hidden="true"
        className={["lucide lucide-layout-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Outer frame */}
        <path d="M3 3H22V22H3Z" />
        {/* Horizontal midline */}
        <path d="M3 12.5H22" />
        {/* Top-half divider */}
        <path d="M9.79 3V12.5" />
        {/* Bottom-half divider */}
        <path d="M15.21 12.5V22" />
      </svg>
    );
  }
);

LayoutDashboardIcon.displayName = "LayoutDashboardIcon";

export default LayoutDashboardIcon;