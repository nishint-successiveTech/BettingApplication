// "use client";

// import { ApolloProvider } from "@apollo/client/react"; 
// import client from "../../apollo/client";
// import { Container } from "@mui/material";
// import Nishine from "@/components/nishint";

// interface CricketMatchPageProps {
//   cricketMatchId?: string; // optional, can be dynamic later
// }

// export default function CricketMatchPage({ cricketMatchId = "dd22c69b-c4a0-451d-a9b4-273f9e25aae6" }: CricketMatchPageProps) {
//   return (
//     <ApolloProvider client={client}>
//       <Container maxWidth="sm" sx={{ mt: 5 }}>
//         <Nishine cricketMatchId={cricketMatchId} />
//       </Container>
//     </ApolloProvider>
//   );
// }


// "use client";

// import { ApolloProvider } from "@apollo/client/react"; 
// import client from "../../apollo/client";
// import { Container } from "@mui/material";
// import Nishine from "@/components/nishint";
// import { useSearchParams } from "next/navigation";

// export default function CricketMatchPage() {
//   const searchParams = useSearchParams();
//   const cricketMatchId = searchParams.get("matchId") || "dd22c69b-c4a0-451d-a9b4-273f9e25aae6";
//   console.log("------jjjjjjjjjjjjj------");

//   return (
//     <ApolloProvider client={client}>
//       <Container maxWidth="sm" sx={{ mt: 5 }}>
//         <Nishine cricketMatchId={cricketMatchId} />
//       </Container>
//     </ApolloProvider>
//   );
// }

// "use client";

// import { ApolloProvider } from "@apollo/client/react"; 
// import client from "../../apollo/client";
// import { Container } from "@mui/material";
// import Nishine from "@/components/nishint";
// import { useSearchParams } from "next/navigation";

// const MOCK_USER_EMAIL = "0@";

// export default function CricketMatchPage() {
//   const searchParams = useSearchParams();
//   const cricketMatchId =
//     searchParams.get("matchId") || "dd22c69b-c4a0-451d-a9b4-273f9e25aae6";

//   return (
//     <ApolloProvider client={client}>
//       <Container maxWidth="sm" sx={{ mt: 5 }}>
//         <Nishine 
//           cricketMatchId={cricketMatchId} 
//           userEmail={MOCK_USER_EMAIL}   // ✅ pass userEmail
//         />
//       </Container>
//     </ApolloProvider>
//   );
// }

"use client";

import { ApolloProvider } from "@apollo/client/react"

import client from "../../apollo/client";
import { Container } from "@mui/material";
import Nishine from "@/components/nishint";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CricketMatchPage() {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setUserEmail(storedEmail);
  }, []);

  const cricketMatchId =
    searchParams.get("matchId") || "dd22c69b-c4a0-451d-a9b4-273f9e25aae6";

  if (!userEmail) return <p>Loading user info...</p>;

  return (
    <ApolloProvider client={client}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Nishine 
          cricketMatchId={cricketMatchId} 
          userEmail={userEmail}   // ✅ ab localStorage se email
        />
      </Container>
    </ApolloProvider>
  );
}


