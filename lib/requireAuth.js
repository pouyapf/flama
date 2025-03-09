import { useSession, signIn } from 'next-auth/react';

const requireAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!session) {
      signIn(); 
      return null;
    }

    return <WrappedComponent {...props} user={session.user} />;
  };

  AuthComponent.displayName = `RequireAuth(${getDisplayName(WrappedComponent)})`;

  return AuthComponent;
};

// Helper function to get display name of the wrapped component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default requireAuth;
