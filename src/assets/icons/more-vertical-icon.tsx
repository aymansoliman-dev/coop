import * as React from "react";

export interface MoreVerticalIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Three-dot "more" icon, rotated 270 degrees.
 */
export const MoreVerticalIcon = React.forwardRef<SVGSVGElement, MoreVerticalIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill={color}
        transform="rotate(270)"
        aria-hidden="true"
        className={["more-icon", className].filter(Boolean).join(" ")}
        {...props}
      >
        <g>
          <rect y="10" width="4" height="4" />
          <rect x="10" y="10" width="4" height="4" />
          <rect x="20" y="10" width="4" height="4" />
        </g>
      </svg>
    );
  }
);

MoreVerticalIcon.displayName = "MoreVerticalIcon";

export default MoreVerticalIcon;