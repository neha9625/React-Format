import React, {useState} from "react";
import intialState from "./WelcomeSignUpPage.interface";
import { useMutation } from 'react-query'; 
import { useNavigate } from "react-router-dom";
import { UserRegisterValidationSchema } from "../../validation/UserRegisterValidation"
import { toastrSuccess, toastrError } from "../../lib/toastr";
import { registerUserApi } from "./WelcomeSignUpPage.api"

export const WelcomeSignUpPage = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(intialState);

  // Handle api response using toastify
  const userRegisteration = useMutation(
    (payload) => {
      return registerUserApi({
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password
      });
    },
    {
      onSuccess: (response) => {
        if (response.success) {
          setFormValue(intialState);
          toastrSuccess(response.message);
          navigate("/viewList");
        } else {
          toastrError(response.message);
        }
      },
      onError: (err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toastrError(err.response.data.message);
        } else {
          toastrError("Error");
        }
      },
    }
  );
  
 // Create an api using mutation to insert user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserRegisterValidationSchema.validate(formValue, { abortEarly: false });
      userRegisteration.mutate({
        fullName: formValue.fullName,
        email: formValue.email,
        password: formValue.password
      });
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        errors: validationErrors,
      }));
    }
  };

  //Handle Validation change values
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
      errors: {
        ...prevFormValue.errors,
        [name]: null,
      },
    }));
  };

  return (
    <div>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center text-sky-600 mb-4">Welcome to Sign-Up</h1>
      </div>
      <div class="flex justify-center">
        <div class="max-w-md w-full">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <form class="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input onChange={onInputChange} value={formValue.fullName} type="text" id="fullName" name="fullName" class="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm border" />
                {formValue.errors && formValue.errors.fullName && (
                      <p className="text-red-500">{formValue.errors.fullName}</p>
                    )}
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input onChange={onInputChange} value={formValue.email} type="email" id="email" name="email" class="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm border" />
                {formValue.errors && formValue.errors.email && (
                      <p className="text-red-500">{formValue.errors.email}</p>
                    )}
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input onChange={onInputChange} value={formValue.password} type="password" id="password" name="password" class="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm border" />
                {formValue.errors && formValue.errors.password && (
                      <p className="text-red-500">{formValue.errors.password}</p>
                    )}
              </div>
              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign Up
                </button>
                <a href="/viewList" type="submit" class=" mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
