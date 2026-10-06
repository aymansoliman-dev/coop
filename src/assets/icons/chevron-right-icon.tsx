import * as React from "react";

export interface ChevronRightIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Sharp chevron pointing right.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The original
 * 1024x1024 canvas had a large empty margin; the viewBox is cropped to a
 * 576x576 square centered on the artwork (224 224 576 576). The chevron is
 * about 494 units tall, so it fills roughly 86% of the box.
 * For other directions, rotate it: rotate-90 (down), rotate-180 (left),
 * -rotate-90 (up).
 */
export const ChevronRightIcon = React.forwardRef<
  SVGSVGElement,
  ChevronRightIconProps
>(({ size = 24, color = "currentColor", className, ...props }, ref) => {
  const dimension = size === "full" ? "100%" : size;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="224 224 576 576"
      fill={color}
      aria-hidden="true"
      className={["lucide lucide-chevron-right-sharp", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <path d="M419.3 264.8l-61.8 61.8L542.9 512 357.5 697.4l61.8 61.8L666.5 512z" />
    </svg>
  );
});

ChevronRightIcon.displayName = "ChevronRightIcon";

export default ChevronRightIcon;