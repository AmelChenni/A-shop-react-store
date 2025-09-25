import { toast, Bounce } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showSuccessToast = (message) => {
  toast.success(message, defaultOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, defaultOptions);
};

export const showInfoToast = (message) => {
  toast.info(message, defaultOptions);
};
