import Swal from 'sweetalert2';

import 'sweetalert2/src/sweetalert2.scss';

export const showModal = (config) => {
    return Swal.fire(config);
}