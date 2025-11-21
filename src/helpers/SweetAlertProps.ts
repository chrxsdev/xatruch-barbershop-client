import type { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

interface AlertInfoOptions {
  title: string;
  icon: SweetAlertIcon;
  customClass: {
    confirmButton: string;
    cancelButton: string;
  };
  confirmButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  buttonsStyling: boolean;
}

interface AlertSuccessOptions {
  position: SweetAlertPosition;
  icon: SweetAlertIcon;
  title: string;
  showConfirmButton: boolean;
  timer: number;
}

export const alertInfo = (
  title: string,
  icon: SweetAlertIcon,
  confirmText: string,
  cancel = 'No'
): AlertInfoOptions => {
  return {
    title,
    icon,
    customClass: {
      confirmButton: 'btn btn-dark mr-2',
      cancelButton: 'btn btn-danger',
    },
    confirmButtonText: confirmText,
    cancelButtonText: cancel,
    showCancelButton: true,
    buttonsStyling: false,
  };
};

export const alertSuccess = (
  title: string,
  icon: SweetAlertIcon = 'success',
  timer = 2500
): AlertSuccessOptions => {
  return {
    position: 'center',
    icon,
    title,
    showConfirmButton: false,
    timer,
  };
};
