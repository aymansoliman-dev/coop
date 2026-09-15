"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    // Suppress the React 19 <script> validation error in Next.js 16+
    // By changing the type to application/json on the client, React won't throw an error.
    const scriptProps = typeof window === "undefined"
        ? undefined
        : ({ type: "application/json" } as const);

    return (
        <NextThemesProvider {...props} scriptProps={scriptProps}>
            {children}
        </NextThemesProvider>
    );
}
