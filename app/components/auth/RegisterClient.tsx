"use client";

import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IoPersonSharp } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";
import { useEffect } from "react";
import AuthContainer from "../containers/AuthContainer";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import {signIn} from "next-auth/react"
import { User as PrismaUser } from "@prisma/client";


interface RegisterClientProps {
  currentUser?: PrismaUser | null;
  }

const RegisterClient:React.FC<RegisterClientProps> = ({currentUser}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  // console.log("kayıt form verisi =>", data);

  axios.post("/api/register", {
  name: data.username,       // ✅ veritabanına name olarak kaydediyoruz
  email: data.email,
  password: data.password,
})

    .then(() => {
      toast.success("Kullanıcı oluşturuldu.")

      signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback: Record<string, any> | undefined) => {
      if (callback?.ok) {
        router.push('/cart')
        router.refresh();
        toast.success("Login islemi basarili.")

      }
      if (callback?.error) {
        toast.error("Giriş başarısız")
      }
    }
  )

    })
    .catch(() => toast.error("Kayıt sırasında hata oluştu"))
    useEffect(() => {
        if (currentUser) {
          router.push('/cart');
          router.refresh();
        }
      }, []);
} 


  return (
    <AuthContainer>
      <div className="w-full max-w-md bg-white/95 shadow-xl rounded-3xl p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-center text-orange-800">Kayıt Ol</h1>

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

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="relative">
              <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Email adresinizi yazın"
                {...register("email", { required: true })}
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
          </div>

          {/* Şifre (Tekrar) */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Şifre (Tekrar)</label>
            <div className="relative">
              <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Şifrenizi tekrar yazın"
                {...register("confirmPassword", { required: true })}
                className="w-full h-12 pl-10 pr-3 bg-transparent outline-none border-0 border-b-2 border-gray-200 focus:border-gray-800 transition"
              />
            </div>
          </div>

          {/* Kayıt butonu */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-full font-bold tracking-wide text-white uppercase shadow-md
                       bg-gradient-to-r from-indigo-500 to-orange-800 hover:opacity-95 disabled:opacity-60"
          >
            Kayıt Ol
          </button>
        </form>

        {/* Sosyal */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">Veya aşağıdaki hesaplarla üye ol</p>
          <div className="mt-3 flex justify-center gap-4">
            <button aria-label="Facebook ile kayıt ol" className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaFacebookF />
            </button>
            <button aria-label="Twitter ile kayıt ol" className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaTwitter />
            </button>
            <button aria-label="Google ile kayıt ol" className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaGooglePlusG />
            </button>
          </div>
        </div>

        {/* Login linki */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Zaten hesabın var mı? </span>
          <Link href="/login" className="text-orange-800 font-medium hover:underline">
            Giriş yap
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default RegisterClient;
