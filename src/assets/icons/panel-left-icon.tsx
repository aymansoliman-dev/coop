import * as React from "react";

export interface PanelLeftIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 2. */
  strokeWidth?: number | string;
}

/**
 * Sharp rectangle with a vertical divider near the left edge (sidebar toggle).
 *
 * The original SVG was rotated 180° with the divider at x=16; the rotation is
 * baked into the path here (divider at x=8), so no transform is needed.
 * For a right-hand panel, add className="rotate-180" or mirror with "-scale-x-100".
 */
export const PanelLeftIcon = React.forwardRef<SVGSVGElement, PanelLeftIconProps>(
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
        className={["lucide lucide-panel-left-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Outer frame */}
        <path d="M1 22H23V2H1Z" />
        {/* Panel divider */}
        <path d="M8 2V22" />
      </svg>
    );
  }
);

PanelLeftIcon.displayName = "PanelLeftIcon";

export default PanelLeftIcon;