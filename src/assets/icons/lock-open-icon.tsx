import * as React from "react";

export interface LockOpenIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Open padlock: LockIcon with the lower part of the shackle's right leg cut away.
 *
 * One path, like LockIcon. The body and the shackle's curves are the same
 * segments as LockIcon, so the two have the same size and shape (body x 307-717,
 * y 486-768; shackle top y 256). The right leg stops at y=416, which leaves a
 * 70-unit gap above the body (the body's top edge is at y=486).
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The viewBox is
 * the same 640x640 crop as LockIcon (192 192 640 640).
 *
 * To change the gap, change the two "416" values (lower number = bigger gap).
 */
export const LockOpenIcon = React.forwardRef<SVGSVGElement, LockOpenIconProps>(
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
        className={["lucide lucide-lock-open-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M666 416v-6.4c0-84.8-69.2-153.6-154-153.6s-154 68.8-154 153.6V486h-51v282h410V486H410V409.6c0-56.6 45.4-102.4 102-102.4S614 353 614 409.6V416z"
        />
      </svg>
    );
  }
);

LockOpenIcon.displayName = "LockOpenIcon";

export default LockOpenIcon;