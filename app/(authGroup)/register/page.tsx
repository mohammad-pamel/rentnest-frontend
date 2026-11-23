
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <div className="rounded-xl border bg-card p-6 shadow-lg sm:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Join RentNest and find your perfect rental home.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
