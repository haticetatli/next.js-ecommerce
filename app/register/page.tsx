import React from "react";
import RegisterClient from "../components/auth/RegisterClient";
import { getCurrentUser } from "../actions/getCurrentUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol | Tatli.com",
  description: "Hesap oluşturun ve fırsatları keşfedin.",
};

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <RegisterClient currentUser={currentUser} />
    </div>
  );
};

export default Register;
