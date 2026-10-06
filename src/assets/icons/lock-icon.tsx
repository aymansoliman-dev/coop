import * as React from "react";

export interface LockIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Closed padlock: a rectangular body with a round shackle on top.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The original
 * 1024x1024 canvas had a large empty margin; the viewBox is cropped to a
 * 640x640 square centered on the artwork (192 192 640 640). The lock is 512
 * units tall, so it fills 80% of the box. For a larger lock use 224 224 576 576.
 */
export const LockIcon = React.forwardRef<SVGSVGElement, LockIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
    const dimension = size === "full" ? "100%" : size;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="192 192 640 640"
        fill={color}
        aria-hidden="true"
        className={["lucide lucide-lock-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M666 486v-76.4c0-84.8-69.2-153.6-154-153.6s-154 68.8-154 153.6V486h-51v282h410V486h-51zm-256-76.4c0-56.6 45.4-102.4 102-102.4S614 353 614 409.6V486H410v-76.4z"
        />
      </svg>
    );
  }
);

LockIcon.displayName = "LockIcon";

export default LockIcon;