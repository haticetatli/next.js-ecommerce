// app/login/page.tsx
import { getCurrentUser } from "../actions/getCurrentUser";
import LoginClient from "../components/auth/LoginClient";

export const metadata = {
  title: "Login",
};

const Login = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <LoginClient currentUser={currentUser} />
    </div>
  );
};

export default Login;
