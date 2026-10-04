import * as React from "react";

export interface LogoutIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Sharp logout icon: an open square bracket with an arrow leaving it.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The original
 * viewBox was 24x26 with the artwork spanning y=2 to 24; it is cropped to a
 * 24x24 square (0 1 24 24) centered on the artwork so it sits like the other
 * icons. The original 200px width/height was replaced by the `size` prop.
 */
export const LogoutIcon = React.forwardRef<SVGSVGElement, LogoutIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="0 1 24 24"
        fill={color}
        aria-hidden="true"
        className={["lucide lucide-logout-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path d="M15 24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4 18.7 17 17.3l3.3-3.3H5v-2h15.3L17 8.7l1.4-1.4L24 13l-5.6 5.7z" />
      </svg>
    );
  }
);

LogoutIcon.displayName = "LogoutIcon";

export default LogoutIcon;