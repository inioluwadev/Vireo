import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Logo className="h-10 w-10 text-white" />
        <h1 className="text-3xl font-bold font-headline tracking-tighter text-white">
          Vireo Admin Access
        </h1>
      </div>
      <LoginForm />
    </main>
  );
}
