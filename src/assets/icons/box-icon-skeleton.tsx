import * as React from "react";

export interface BoxIconSkeletonProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Line thickness. Defaults to 2, matching BoxIcon. */
  strokeWidth?: number | string;
  /** Seconds per shimmer sweep. Defaults to 1.5. */
  duration?: number;
  /** Color of the moving highlight. Defaults to the theme foreground. */
  highlightColor?: string;
  /** Opacity of the highlight at its center. Defaults to 0.6. */
  highlightOpacity?: number;
}

// Same geometry as BoxIcon, as a single path.
const BOX_PATH = "M12 2 20.66 7v10L12 22l-8.66-5V7Z M3.34 7 12 12l8.66-5 M12 12v10";

/**
 * Sharp box icon skeleton with a shimmer sweeping across it.
 *
 * How it works: the base icon is drawn in `currentColor`. A soft-edged
 * highlight bar slides left to right (SMIL <animate> on the bar's x), and a
 * mask in the shape of the icon keeps the bar visible only on the icon.
 *
 * Pass fill="currentColor" for a solid shape (matches a filled BoxIcon).
 * Set the base color with text-*.
 */
export const BoxIconSkeleton = React.forwardRef<
  SVGSVGElement,
  BoxIconSkeletonProps
>(
  (
    {
      size = 24,
      strokeWidth = 2,
      duration = 1.5,
      highlightColor = "var(--foreground)",
      highlightOpacity = 0.6,
      fill = "none",
      className,
      ...props
    },
    ref
  ) => {
    const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
    const gradientId = `box-shimmer-grad-${id}`;
    const maskId = `box-shimmer-mask-${id}`;
    const dimension = size === "full" ? "100%" : size;
    const isFilled = fill !== "none";

    const shape = {
      d: BOX_PATH,
      strokeWidth,
      strokeLinecap: "butt" as const,
      strokeLinejoin: "miter" as const,
      strokeMiterlimit: 10,
    };

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={["lucide lucide-box-sharp", className].filter(Boolean).join(" ")}
        {...props}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={highlightColor} stopOpacity="0" />
            <stop offset="0.5" stopColor={highlightColor} stopOpacity={highlightOpacity} />
            <stop offset="1" stopColor={highlightColor} stopOpacity="0" />
          </linearGradient>

          {/* White = visible. Same shape as the icon, so the bar only shows on it. */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <path {...shape} fill={isFilled ? "white" : "none"} stroke="white" />
          </mask>
        </defs>

        {/* Base icon */}
        <path {...shape} fill={fill} stroke="currentColor" />

        {/* Moving highlight, clipped to the icon by the mask */}
        <g mask={`url(#${maskId})`}>
          <rect x="-12" y="0" width="12" height="24" fill={`url(#${gradientId})`}>
            <animate
              attributeName="x"
              from="-12"
              to="24"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </svg>
    );
  }
);

BoxIconSkeleton.displayName = "BoxIconSkeleton";

export default BoxIconSkeleton;