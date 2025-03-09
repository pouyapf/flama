import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const requireAdminAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!session) {
      signIn();
      return null;
    }

    const user = session.user;

    // Assuming your session includes an `isAdmin` property
    if (!user.isAdmin) {
      router.push('/');
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  AuthComponent.displayName = `RequireAdminAuth(${getDisplayName(WrappedComponent)})`;

  return AuthComponent;
};

// Helper function to get display name of the wrapped component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default requireAdminAuth;
