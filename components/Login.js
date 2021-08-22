import React from "react";
import Image from "next/image";
import Button from "@material-tailwind/react/Button";
import { signIn } from "next-auth/client";
function Login() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="https://i.pinimg.com/originals/c4/b7/e9/c4b7e910d6116073f9efd0e343342920.png"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        login
      </Button>
    </div>
  );
}

export default Login;
