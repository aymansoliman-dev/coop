import * as React from "react";

export interface TrashIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Sharp trash can: a lid with a handle over a body with three slots.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The original
 * 1024x1024 canvas had a large empty margin; the viewBox is cropped to a
 * 512x512 square centered on the artwork (256 256 512 512) so the icon fills
 * its box like the other icons.
 */
export const TrashIcon = React.forwardRef<SVGSVGElement, TrashIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="256 256 512 512"
        fill={color}
        aria-hidden="true"
        className={["lucide lucide-trash-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path d="M589 307v-51H435v51H307v51h410v-51M333 410v358h358V410H333zm102 307h-51V461h51v256zm103 0h-52V461h52v256zm102 0h-51V461h51v256z" />
      </svg>
    );
  }
);

TrashIcon.displayName = "TrashIcon";

export default TrashIcon;