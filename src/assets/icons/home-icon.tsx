import * as React from "react";

export interface HomeIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Sharp, angular home icon.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The artwork
 * spans the full 512x512 canvas edge to edge, so the viewBox is widened to
 * 576x576 (-32 -32 576 576) to leave a small margin, about 89% fill, matching
 * the other filled icons. Use "0 0 512 512" for an edge-to-edge version.
 * The original 200px width/height was replaced by the `size` prop.
 */
export const HomeIcon = React.forwardRef<SVGSVGElement, HomeIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="-32 -32 576 576"
        fill={color}
        aria-hidden="true"
        className={["lucide lucide-home-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path d="M392.859,6.031L123.288,66.938l0.91,1.692l-0.782-0.51L0,256.273l26.488,17.374l4.457-6.804v139.261 l254.107,99.866l209.756-104.105V228.575L512,221.753L392.859,6.031z M270.335,466.165l-91.76-36.065V325.503l-62.872-18.629v98.51 l-53.085-20.866V218.561l78.208-119.232l120.232,221.945l3.856-1.519l5.421-2.147V466.165z M463.136,382.226l-164.858,81.829 V306.52l164.858-65.383V382.226z" />
      </svg>
    );
  }
);

HomeIcon.displayName = "HomeIcon";

export default HomeIcon;