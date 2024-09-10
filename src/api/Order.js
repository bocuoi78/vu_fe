import request from '../util/Request';

export const getOrderList = (data) => request.post("/order/get-list", data)
    .then(res=>{return res}).catch(e=>{return e});
export const updateOrder = (data) => request.post("/order", data)
    .then(res=>{return res}).catch(e=>{return e});
export const deleteOrder = (orderId) => request.delete("/order/" + orderId)
    .then(res=>{return res}).catch(e=>{return e});