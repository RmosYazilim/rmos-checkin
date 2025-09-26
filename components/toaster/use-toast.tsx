import Swal from 'sweetalert2';

export function useToastNotif() {
  const showErrorToast = ({ message }: { message: string }) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  };

  const showSuccessToast = ({ message }: { message: string }) => {
    Swal.fire({
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
      position: 'center',
      showConfirmButton: false,
    });
  };

  return {
    showErrorToast,
    showSuccessToast,
  };
}
