import { axiosClient } from "../../api/api";

export const registerUserApi = async (cred) => {
  const {
    fullName,
    email,
    password,
  } = cred;
  return axiosClient
    .post("/api/signUp", {
      fullName,
    email,
    password,
    })
    .then((response) => response.data);
};
