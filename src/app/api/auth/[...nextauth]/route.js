import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Database from '../../../../lib/database.js';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userId: { label: 'User ID', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('🔐 NextAuth: Attempting authentication for:', credentials?.userId);
          
          if (!credentials?.userId || !credentials?.password) {
            console.log('❌ NextAuth: Missing credentials');
            return null;
          }

          // Test database connection
          const isConnected = await Database.testConnection();
          if (!isConnected) {
            console.log('❌ NextAuth: Database connection failed');
            return null;
          }

          // Use your existing database authentication method
          const user = await Database.authenticateUser(
            credentials.userId, 
            credentials.password
          );

          if (user) {
            console.log('✅ NextAuth: Authentication successful for user:', user.id, 'role:', user.role);
            // Return user object that will be stored in JWT token
            return {
              id: user.id,
              role: user.role,
              // Add other user properties as needed
            };
          }

          console.log('❌ NextAuth: Authentication failed - invalid credentials');
          return null;
        } catch (error) {
          console.error('❌ NextAuth: Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on sign in
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.userId;
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to appropriate dashboard based on role
      if (url.startsWith(baseUrl)) return url;
      
      // Default redirect after login
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };