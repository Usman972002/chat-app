import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const response = await fetch('/api/user/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      localStorage.setItem('chat-user',JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {signup,loading}
};

export default useSignUp;

function handleInputErrors({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill All the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("passwords Did not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password Must contain atleast 6 characters");
    return false;
  }

  return true;
}
