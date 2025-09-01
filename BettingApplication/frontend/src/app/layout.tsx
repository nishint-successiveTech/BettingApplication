import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Betting App</title>
      </head>
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
