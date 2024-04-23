import { ProfilePage } from ".";
import { ProtectedRoute } from "../../shared/router/AuthProviders";
import { Layout } from "../../shared/ui/layout";

const ProfilePageCompoonent = () => {
  return (
    <ProtectedRoute>
      <Layout sidebar={false} header={false} >
        <ProfilePage />
      </Layout>
    </ProtectedRoute>
  );
};

export {ProfilePageCompoonent}