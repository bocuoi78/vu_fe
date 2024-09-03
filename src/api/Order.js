import axios from "axios";

export const getOrderList = (data) => axios.post("http://localhost:8080/api/v1/order/get-list", data)
    .then(res=>{return res}).catch(e=>{return e});
export const updateOrder = (data) => axios.post("http://localhost:8080/api/v1/order", data)
    .then(res=>{return res}).catch(e=>{return e});
export const deleteOrder = (orderId) => axios.delete("http://localhost:8080/api/v1/order/" + orderId)
    .then(res=>{return res}).catch(e=>{return e});