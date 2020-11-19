import Connection from '../../../Connection';
import { USER_CONTROLLER, API } from "../../../assets/js/endpoint";
export const ScanDocumentUpload = async (data) => {
    return Connection.POST(USER_CONTROLLER,API.scanDocumentUpload, data);
};
export const ScanSignUpload = async (data) => {
    return Connection.POST(USER_CONTROLLER,API.scanSignUpload, data);
};
