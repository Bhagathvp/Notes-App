
import Axios from '../constants/axios'



export const signUpApi = data => {
    return Axios.post('/signup',data)
}

export const signInApi = data =>{
    return Axios.get('/signin',{params: data})
}