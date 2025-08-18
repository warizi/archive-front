import { LoginForm, SignupForm } from "@/features/user";

function HomePage() {
  return (
    <div>
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default HomePage;