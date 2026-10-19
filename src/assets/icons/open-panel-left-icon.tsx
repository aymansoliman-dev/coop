import * as React from "react";

export interface OpenPanelLeftIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke and fill color. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 2. */
  strokeWidth?: number | string;
}

/**
 * Same as PanelLeftIcon, but the left panel (x 1 to 8) is filled.
 * Use it for the "sidebar open" state.
 */
export const OpenPanelLeftIcon = React.forwardRef<
  SVGSVGElement,
  OpenPanelLeftIconProps
>(
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
        className={["lucide lucide-panel-left-filled-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Filled left panel */}
        <path d="M1 22H8V2H1Z" fill={color} />
        {/* Outer frame */}
        <path d="M1 22H23V2H1Z" />
        {/* Panel divider */}
        <path d="M8 2V22" />
      </svg>
    );
  }
);

OpenPanelLeftIcon.displayName = "OpenPanelLeftIcon";

export default OpenPanelLeftIcon;