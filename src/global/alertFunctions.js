import Swal from 'sweetalert2';

import 'sweetalert2/src/sweetalert2.scss';

/**
 * Show a modal with the given configuration
 * @param {String} level the alert level/type
 * @param {String} message the message to show in the alert
 * @param {{}} extraConfig Any extra options to pass along to SweetAlert2
 */
export const showModal = (level, message, extraConfig) => {
    const config = {
        icon: level,
        title: message,
        buttonsStyling: false,
        showCloseButton: true,
        customClass: {
            content: 'modal-content',
            closeButton: 'modal-close',
            confirmButton: 'button is-success is-large',
            cancelButton: 'button is-danger is-large',
            input: extraConfig.input,
        },
        ...extraConfig
    }
    console.log("Final modal config: ", config);
    return Swal.fire(config);
}

export const showToast = (level, message, extraConfig) => {
    const config = {
        icon: level,
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        ...extraConfig
    };
    return Swal.fire(config);
}