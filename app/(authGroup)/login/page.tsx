
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="rounded-xl border bg-card p-6 shadow-lg sm:p-8">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back!
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your RentNest account.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
