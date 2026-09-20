"use client";

import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IoPersonSharp } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import AuthContainer from "../containers/AuthContainer";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User as PrismaUser } from "@prisma/client";

interface LoginClientProps {
  currentUser?: PrismaUser | null;
}

const LoginClient: React.FC<LoginClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Login İşlemi Başarılı...");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  return (
    <AuthContainer>
      <div className="w-full max-w-md bg-white/95 shadow-xl rounded-3xl p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-center text-orange-800">Giriş Yap</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Kullanıcı Adı */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Kullanıcı Adı</label>
            <div className="relative">
              <IoPersonSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Kullanıcı adınızı yazın"
                {...register("username", { required: true })}
                className="w-full h-12 pl-10 pr-3 bg-transparent outline-none border-0 border-b-2 border-gray-200 focus:border-gray-800 transition"
              />
            </div>
          </div>

          {/* Şifre */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Şifre</label>
            <div className="relative">
              <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Şifrenizi yazın"
                {...register("password", { required: true })}
                className="w-full h-12 pl-10 pr-3 bg-transparent outline-none border-0 border-b-2 border-gray-200 focus:border-gray-800 transition"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-gray-500 hover:underline">Şifreni mi unuttun?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-full font-bold tracking-wide text-white uppercase shadow-md
                       bg-gradient-to-r from-indigo-500 to-orange-800 hover:opacity-95 disabled:opacity-60"
          >
            Giriş Yap
          </button>
        </form>

        {/* Google ile giriş */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">Veya Google ile giriş yap</p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-3 px-5 py-2 border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FcGoogle size={24} />
              <span className="text-sm font-medium text-gray-700">Google ile Giriş Yap</span>
            </button>
          </div>
        </div>

        {/* Kayıt ol */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Hesabın yok mu? </span>
          <Link href="/register" className="text-orange-800 font-medium hover:underline">
            Kayıt ol
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
