import { toast } from 'react-toastify';

const showNotification = (type, message) => {
    if (type === "success") {
        toast.success(message, {
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
        });
    } else if (type === "error") {
        toast.error(message, {
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
        });
    }
};

export default showNotification;