import axios from "axios";
import swal from "sweetalert2";
const serverURL = "http://localhost:3000";

var ax = axios.create({
  baseURL: serverURL
});

export default { ax, swal };
export { ax, swal };
