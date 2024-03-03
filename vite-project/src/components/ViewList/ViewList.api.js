import { axiosClient } from "../../api/api";

export const GetUserDetails = async () => {
    return axiosClient
      .get("/api/viewList")
      .then((response) => response.data);
  };
  