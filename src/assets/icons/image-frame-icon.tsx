import { forwardRef } from "react";
import type { SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number | string;
  /** Stroke width of the outer frame (in 64-grid units) */
  strokeWidth?: number | string;
  /** Stroke width of the wave and circle inside the frame */
  detailStrokeWidth?: number | string;
}

export const ImageFrameIcon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      detailStrokeWidth = 3,
      ...props
    },
    ref
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      {...props}
    >
      <rect x="8" y="8" width="48" height="48" strokeWidth={strokeWidth} />
      <path
        d="M8 44h8c8 0 16-8 24-8s8 8 16 8"
        strokeWidth={detailStrokeWidth}
      />
      <circle cx="22" cy="22" r="6" strokeWidth={detailStrokeWidth} />
    </svg>
  )
);

ImageFrameIcon.displayName = "ImageFrameIcon";

export default ImageFrameIcon;