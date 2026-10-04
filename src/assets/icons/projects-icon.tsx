import React from 'react';

export interface ProjectsIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  /** The size of the icon in pixels, or "full" to fill the parent. Defaults to 16. */
  size?: number | string;
  /** The color used for the hexagon stroke outlines. Defaults to 'currentColor'. */
  strokeColor?: string;
  /** The width of the line outlines. Defaults to 1.2 for a native Lucide feel. */
  strokeWidth?: number;
}

/**
 * Three hexagons packed in a honeycomb triangle.
 *
 * Each hexagon is regular (circumradius 3.5, previously ~2.3), and the three
 * fill the 16x16 frame with about 1px of margin. The gap between neighbouring
 * outlines is 2 units center-to-center, which leaves ~0.8 of clear space at the
 * default 1.2 stroke, so the shapes stay separate at small sizes.
 */
export const ProjectsIcon = React.forwardRef<SVGSVGElement, ProjectsIconProps>(
  (
    {
      size = 16,
      strokeColor = 'currentColor',
      strokeWidth = 1.2,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const dimension = size === 'full' ? '100%' : size;

    return (
      <svg
        ref={ref}
        width={dimension}
        height={dimension}
        viewBox="0 0 16 16"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`lucide-custom-projects ${className}`}
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
        {...props}
      >
        {/* Hexagon 1 (Top) */}
        <path d="M8 1.01 L11.03 2.76 V6.26 L8 8.01 L4.97 6.26 V2.76 Z" />

        {/* Hexagon 2 (Bottom-Right) */}
        <path d="M12.03 7.99 L15.06 9.74 V13.24 L12.03 14.99 L9 13.24 V9.74 Z" />

        {/* Hexagon 3 (Bottom-Left) */}
        <path d="M3.97 7.99 L7 9.74 V13.24 L3.97 14.99 L0.94 13.24 V9.74 Z" />
      </svg>
    );
  }
);

ProjectsIcon.displayName = 'ProjectsIcon';
export default ProjectsIcon;