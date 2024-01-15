import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/navigation"; // Corrected import statement
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import AppContext from "../../context/context";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Your email address must be a valid email")
    .max(100, "Your email address must be less than 100 characters")
    .required("Required"),
  name: Yup.string()
    .min(4, "Username must be more than 4 characters")
    .max(32, "Username must be less than 32 characters")
    .required("Required"),
  password: Yup.string()
    .min(4, "Passwords must be more than 4 characters")
    .max(32, "Passwords must be less than 32 characters")
    .required("Required"),
    passwordConfirm: Yup.string()
    .min(4, "Passwords must be more than 4 characters")
    .max(32, "Passwords must be less than 32 characters")
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Required"),
});


const SignUp = () => {
  const router = useRouter()
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { setAuth } = useContext(AppContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Updated state variable


  const handleSubmit = async (e: any) => {
    console.log(fullName);
    const payload = {
      email: email,
      password: password,
      fullName: fullName,
    };
    fetch("http://localhost:8005/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json?.token) {
          router.push('/auth')
          console.log(json.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsSigningUp(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col justify-center pb-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md md:w-full">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: "",
                name: "",
                password: "",
                passwordConfirm: "",
              }}
              onSubmit={handleSubmit}
              // validationSchema={validationSchema}

            >
              <Form className="space-y-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Field
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    type="text"
                    name="email"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600 my-0.5"
                    name="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700" // Corrected htmlFor value
                  >
                    Username
                  </label>
                  <Field
                    value={fullName}
                    onChange={(e: any) => {
                      setFullName(e.target.value);
                    }}
                    type="text"
                    name="name"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600 my-0.5"
                    name="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    value={password}
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600 my-0.5"
                    name="password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirm
                  </label>
                  <Field
                    onChange={(e: any) => {
                      setPasswordConfirm(e.target.value);
                    }}
                                    value={passwordConfirm}
                    type="password"
                    name="passwordConfirm"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600 my-0.5"
                    name="passwordConfirm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSigningUp ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
