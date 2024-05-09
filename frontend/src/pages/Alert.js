import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Alert({ onLogin }) {
  useEffect(() => {
    const showAlert = async () => {
      const result = await Swal.fire({
        title: 'You need to login first',
        showCancelButton: true,
        confirmButtonText: 'Login',
      });

      if (result.isConfirmed) {
        onLogin(true);
      } else {
        onLogin(false);
      }
    };

    showAlert();
  }, [onLogin]);

  // Return null since the rendering is handled by SweetAlert
  return null;
}
