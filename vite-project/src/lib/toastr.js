import toastr from "toastr";

toastr.options = {
  hideDuration: 300,
  timeOut: 6000,
};

export const toastrSuccess = (message) => {
  toastr.success(message);
};

export const toastrError = (message) => {
  toastr.error(message);
};
