import axios from "axios";

export const getStudentList = () => axios.get("http://localhost:8080/api/v1/student/get-all").then(res=>{return res}).catch(e=>{return e});
export const getStudent = (studentId) => axios.get("http://localhost:8080/api/v1/student/" + studentId)
    .then(res=>{return res}).catch(e=>{return e});
export const updateStudent = (data) => axios.post("http://localhost:8080/api/v1/student", data)
    .then(res=>{return res}).catch(e=>{return e});