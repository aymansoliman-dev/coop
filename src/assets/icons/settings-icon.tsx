import * as React from "react";

export interface SettingsIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  /** Icon size in pixels, or "full" to fill the parent. Defaults to 24. */
  size?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
}

/**
 * Settings gear: eight angular teeth around a ring with a round center hole.
 *
 * The shape is solid, so color is applied as `fill` (no stroke). The original
 * 1024x1024 canvas had a large empty margin; the viewBox is cropped to a
 * 576x576 square centered on the gear (224 224 576 576). The gear itself spans
 * 512 units, so it fills about 89% of the box and leaves a small margin. For a
 * larger gear use 256 256 512 512 (edge to edge); for a smaller one, widen it.
 */
export const SettingsIcon = React.forwardRef<SVGSVGElement, SettingsIconProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => {
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
        className={["lucide lucide-settings-sharp", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <path d="M698.8 563.1l69.2-.1V460.8l-69.1-.2-7.7.2c-14.4-.1-18.4-12-18.4-26.5 0-7.2 2.9-13.7 7.6-18.4l48.8-48.8-72.4-72.4-48.9 48.9c-4.7 4.7-11.2 7.6-18.4 7.6-14.5 0-26.2-11.7-26.3-26.1v-69.2H460.8v68.9h-.1c-.1 14.5-11.8 26.2-26.3 26.2-7.1 0-13.5-2.9-18.2-7.4l-49.1-49.1-72.3 72.4 48.8 48.8s0 .1-.1.1c4.7 4.8 7.6 11.3 7.6 18.5 0 14.4-4 26.2-18.4 26.5H256v102.4l69-.2v.2c14.4.1 26.1 11.8 26.1 26.3 0 7.1-2.9 13.5-7.4 18.2l-49 49 72.4 72.4 48.8-48.8s.1 0 .1.1c4.7-4.6 11.2-7.6 18.4-7.6 14.4 0 26.2 4.1 26.4 18.5 0 0-.1 7.5 0 7.5v69.3l102.4-.2v-69.1h.1c.2-14.4 11.8-26 26.2-26 7.2 0 13.6 2.9 18.4 7.5h.1l48.8 48.8 72.4-72.4-48.8-48.8c-4.6-4.7-7.5-11.2-7.5-18.4-.1-14.6 11.5-26.3 25.9-26.4zM512 614c-56.5 0-102.3-45.8-102.3-102.3S455.5 409.3 512 409.3s102.3 45.8 102.3 102.4C614.4 568.2 568.5 614 512 614z" />
      </svg>
    );
  }
);

SettingsIcon.displayName = "SettingsIcon";

export default SettingsIcon;