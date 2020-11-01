import Connection from '../../../Connection';
import { USER_CONTROLLER, API } from "../../../assets/js/endpoint";
export const FindReservationKiosk = async (data) => {
    return Connection.POST(USER_CONTROLLER,API.findReservationKiosk, data);
};
