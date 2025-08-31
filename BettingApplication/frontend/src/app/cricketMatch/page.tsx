// "use client";

// import { ApolloProvider } from "@apollo/client/react";
// import client from "../../apollo/client";
// import { Container } from "@mui/material";
// import CricketMatches from "@/components/cricketMatch";

// export default function CricketMatchesPage() {
//   return (
//     <ApolloProvider client={client}>
//       <Container maxWidth="lg" sx={{ mt: 5 }}>
//         <CricketMatches />
//       </Container>
//     </ApolloProvider>
//   );
// }

"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../apollo/client";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CricketMatches from "@/components/cricketMatch";

const theme = createTheme(); // 👈 Default MUI theme (isme background.paper hoga)

export default function CricketMatchesPage() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* 👈 optional, global reset */}
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <CricketMatches />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

