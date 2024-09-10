import request from '../util/Request';

export const getStudentList = () => request.get("/student/get-all").then(res=>{return res}).catch(e=>{return e});
export const getStudent = (studentId) => request.get("/student/" + studentId)
    .then(res=>{return res}).catch(e=>{return e});
export const updateStudent = (data) => request.post("/student", data)
    .then(res=>{return res}).catch(e=>{return e});