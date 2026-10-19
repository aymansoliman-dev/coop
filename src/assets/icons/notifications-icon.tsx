import * as React from "react";

export interface NotificationIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Stroke color of the square. Defaults to currentColor. */
  color?: string;
  /** Line thickness. Defaults to 2. */
  strokeWidth?: number | string;
  /** Fill the square. Uses `color` unless you also pass a `fill` color. Defaults to false (outline). */
  filled?: boolean;
  /** Fill color of the square. "none" (default) is an outline; pass a color to fill it with something other than `color`. */
  fill?: string;
  /** Show the dot over the top-right corner. Hidden when false. */
  hasNew?: boolean;
  /** Dot color. Any CSS color, including var(--destructive). Defaults to red (#ef4444). */
  dotColor?: string;
  /** Pulse a lighter copy of the dot behind it while `hasNew` is true. Defaults to true. */
  pulse?: boolean;
}

/**
 * Notifications icon: a sharp square with a stroke, and an optional red dot
 * drawn on top of its top-right corner, with a pulse behind it.
 *
 * The square is a real stroke (miter joins, square corners), like BoxIcon, so
 * it takes `color` and `strokeWidth`. Fill it with the `filled` boolean (uses
 * `color`), or with `fill` (any color, same as on BoxIcon, "none" by default).
 * If both are given, `fill` wins.
 *
 * Drawn on a 24 grid. The square's outer edge spans 2-22 (the path is centered
 * on 3-21 with a 2-unit stroke). The dot is a circle at (19.75, 4.25), radius
 * 4.25, so it fully covers the outer corner at (22, 2) and sticks out 2 units
 * past the top and right edges, ending exactly at the edge of the 24 box. It is
 * rendered only when `hasNew` is true. For a bigger or smaller dot, change cx,
 * cy and r together on both circles, keeping cx + r = 24 and cy - r = 0.
 *
 * Pulse: a second circle of the same size and color, at half opacity (so it
 * reads as a lighter shade), sits behind the dot and uses Tailwind's
 * `animate-ping` (grows to 2x while fading out, 1s, repeating). It scales
 * around its own center via `transform-box: fill-box`. The svg gets
 * `overflow-visible` so the pulse isn't clipped at the edge of the 24 box; a
 * parent with `overflow-hidden` will still clip it. `motion-reduce` turns the
 * animation off for people who ask their OS for reduced motion, and the idle
 * circle is hidden exactly behind the dot.
 */
export const NotificationsIcon = React.forwardRef<
  SVGSVGElement,
  NotificationIconProps
>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      filled = false,
      fill = "none",
      hasNew = false,
      dotColor = "#ef4444",
      pulse = true,
      className,
      ...props
    },
    ref
  ) => {
    const dimension = size === "full" ? "100%" : size;
    // `filled` fills with the stroke color unless a `fill` color is given
    const squareFill = filled && fill === "none" ? color : fill;

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
        className={[
          "lucide lucide-notification-sharp",
          hasNew && pulse && "overflow-visible",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path d="M3 3H21V21H3Z" fill={squareFill} />
        {hasNew && (
          <>
            {pulse && (
              // Behind the dot (drawn first). style, not the fill attribute,
              // so CSS variables work.
              <circle
                cx="19.75"
                cy="4.25"
                r="4.25"
                stroke="none"
                fillOpacity={0.5}
                className="origin-center transform-fill animate-ping motion-reduce:animate-none"
                style={{ fill: dotColor }}
              />
            )}
            <circle
              cx="19.75"
              cy="4.25"
              r="4.25"
              stroke="none"
              style={{ fill: dotColor }}
            />
          </>
        )}
      </svg>
    );
  }
);

NotificationsIcon.displayName = "NotificationsIcon";

export default NotificationsIcon;