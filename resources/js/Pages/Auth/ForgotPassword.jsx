import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <>
      <Head title="Forgot Password" />

      <h1 className="text-xl text-center my-4 font-semibold leading-tight text-gray-800">
        Forgot Password
      </h1>

      <div className="px-4 pt-4 mx-auto min-w-[200px] max-w-[400px]">
        <div className="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        {status && (
          <div className="mb-4 text-sm font-medium text-green-600">
            {status}
          </div>
        )}

        <form onSubmit={submit}>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton className="ms-4" disabled={processing}>
              Email Password Reset Link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
}
