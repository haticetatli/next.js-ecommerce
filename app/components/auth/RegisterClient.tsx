"use client";

import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IoPersonOutline } from "react-icons/io5";
import { TbLock } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import AuthContainer from "../containers/AuthContainer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { SafeUser } from "@/types";

interface RegisterClientProps {
  currentUser?: SafeUser | null;
}

const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Kullanıcı zaten giriş yapmışsa sepet veya ana sayfaya yönlendir
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Şifreler birbiriyle uyuşmuyor!");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", {
        name: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Hesabınız başarıyla oluşturuldu! Giriş yapılıyor...");

      const callback = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Oturum açıldı.");
      } else {
        router.push("/login");
      }
    } catch (error: unknown) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Kayıt sırasında bir hata oluştu.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block font-black text-2xl tracking-tight">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Tatli
            </span>
            <span className="bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
              .com
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Yeni Hesap Oluştur
          </h1>
          <p className="text-xs text-gray-500">
            Birkaç saniyede üye olun, fırsatları kaçırmayın.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Kullanıcı Adı */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Kullanıcı Adı *
            </label>
            <div className="relative">
              <IoPersonOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Örn: haticetatli"
                {...register("username", { required: "Kullanıcı adı gereklidir" })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs md:text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>
            {errors.username && (
              <span className="text-[11px] text-red-500">
                {String(errors.username.message)}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              E-Posta Adresi *
            </label>
            <div className="relative">
              <MdOutlineEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="ornek@tatli.com"
                {...register("email", { required: "E-posta adresi gereklidir" })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs md:text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>
            {errors.email && (
              <span className="text-[11px] text-red-500">
                {String(errors.email.message)}
              </span>
            )}
          </div>

          {/* Şifre */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Şifre *</label>
            <div className="relative">
              <TbLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Şifre gereklidir",
                  minLength: { value: 6, message: "En az 6 karakter olmalıdır" },
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs md:text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>
            {errors.password && (
              <span className="text-[11px] text-red-500">
                {String(errors.password.message)}
              </span>
            )}
          </div>

          {/* Şifre Tekrarı */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Şifre Tekrarı *
            </label>
            <div className="relative">
              <TbLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Şifre tekrarı gereklidir",
                })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 text-xs md:text-sm text-gray-800 outline-none focus:border-pink-500 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Kayıt Yapılıyor...</span>
              </>
            ) : (
              <span>Kayıt Ol</span>
            )}
          </button>
        </form>

        {/* Google ile Giriş */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition cursor-pointer"
          >
            <FcGoogle size={18} />
            <span>Google ile Devam Et</span>
          </button>
        </div>

        {/* Giriş Linki */}
        <div className="text-center text-xs text-gray-500">
          Zaten bir hesabınız var mı?{" "}
          <Link
            href="/login"
            className="text-pink-600 font-bold hover:underline"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default RegisterClient;
