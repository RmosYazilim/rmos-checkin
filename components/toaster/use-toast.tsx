import { toast } from 'sonner';

export function useToastNotif() {
  const showErrorToast = ({ message }: { message: string }) => {
    toast(message, {
      description: message,
      position: 'top-center',
      duration: 2000,
      icon: '🚨',
      style: {
        background: '#BB0000',
        color: '#fff',
      },
    });
  };

  const showSuccessToast = ({ message }: { message: string }) => {
    toast(message, {
      description: message,
      position: 'top-center',
      duration: 2000,
      icon: '👍',
      style: {
        background: '#48BB00',
        color: '#fff',
      },
    });
  };

  return {
    showErrorToast,
    showSuccessToast,
  };
}
