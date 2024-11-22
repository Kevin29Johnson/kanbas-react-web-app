import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findAssignmentForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const enrollUserinCourse=async (userId: string, courseId: string)=>{
  const response=await axios.post(`${USERS_API}/${userId}/courses/${courseId}`)
  return response.data
}

export const unenrollUserfromCourse=async (userId: string, courseId: string)=>{
 await axios.delete(`${USERS_API}/${userId}/courses/${courseId}`)
  
}

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENT_API);
  return data;
};
