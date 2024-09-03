import request from '../util/Request';

export const login = (data) => request.post('/auth', data)