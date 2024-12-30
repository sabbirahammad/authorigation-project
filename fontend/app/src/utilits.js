import { toast } from 'react-toastify';

// Success toast notification
export const handlesuccess = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 3000,        // Auto close after 3 seconds
    hideProgressBar: false, // Show progress bar
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Error toast notification
export const handleerror = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 3000,        // Auto close after 3 seconds
    hideProgressBar: false, // Show progress bar
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
