import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
// axios with cookies to distinguish between multiple clients
const axiosWithCredentials = axios.create({ withCredentials: true });


export const deleteAssignment = async (assignmentId: string) => {
    const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
   };
   export const updateAssignment = async (assignment: any) => {
       await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
       
     };