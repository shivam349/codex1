import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Try to login first with existing user
          const loginRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (loginRes.ok) {
            const userData = await loginRes.json();
            return userData.data;
          }

          // If login fails, try to register
          const registerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
                name: credentials?.name,
              }),
            }
          );

          if (registerRes.ok) {
            const userData = await registerRes.json();
            return userData.data;
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Call backend to sync/create user with Google
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                googleId: profile.sub,
                email: profile.email,
                name: profile.name,
                image: profile.image,
              }),
            }
          );

          if (res.ok) {
            const userData = await res.json();
            user.token = userData.data.token;
            user.id = userData.data.id;
            user.emailVerified = userData.data.emailVerified;
          }
        } catch (error) {
          console.error('Google sign in error:', error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.email = user.email;
        if (user.token) {
          token.backendToken = user.token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      session.backendToken = token.backendToken;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in?error=true',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
