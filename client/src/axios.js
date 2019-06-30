import axios from "axios";
import swal from "sweetalert2";
const serverURL = "http://35.240.223.244";

var ax = axios.create({
  baseURL: serverURL
});

export default { ax, swal };
export { ax, swal };
