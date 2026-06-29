import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/services/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Xebia SSO Login",
      credentials: {
        email: { label: "Email Address", type: "email", placeholder: "user@xebia.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        const email = credentials.email?.trim().toLowerCase();
        const password = credentials.password?.trim();
        
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
        try {
          const res = await fetch(`${apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          
          if (!res.ok) {
            return null;
          }
          
          const user = await res.json();
          return user; // returns { id, name, email, role, token }
        } catch (err) {
          console.error("Authentication backend error:", err);
          
          // Local fallback in case the backend is offline and mock is true
          if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
            if (email === "admin@xebia.com" && password === "admin123") {
              return {
                id: "u-admin",
                name: "Enterprise Admin",
                email: "admin@xebia.com",
                role: "admin",
                token: "mock-jwt-admin-token-xyz-123",
              };
            }
            if (email === "learner@xebia.com" && password === "learner123") {
              return {
                id: "u-learner",
                name: "Xebia Consultant",
                email: "learner@xebia.com",
                role: "learner",
                token: "mock-jwt-learner-token-abc-789",
              };
            }

            // Sync query from MongoDB
            try {
              const client = await clientPromise;
              const db = client.db("employeeDB");
              const userCred = await db.collection("lms_learner_credentials").findOne({ email });
              if (userCred && (userCred.temporaryPassword === password || password === "learner123")) {
                return {
                  id: userCred.id,
                  name: userCred.learnerName,
                  email: userCred.email,
                  role: (userCred.role || "learner").toLowerCase(),
                  token: `mock-jwt-${userCred.id}-token`,
                };
              }
            } catch (mongoErr) {
              console.warn("MongoDB auth fallback failed:", mongoErr);
            }
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
