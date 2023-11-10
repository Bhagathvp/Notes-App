
import Axios from '../constants/axios'



export const signUpApi = data => {
    return Axios.post('/signup', data)
}

export const signInApi = data => {
    return Axios.post('/signin', data)
}

export const getUser = data => {
    return Axios.get('/userDetails',
    { headers : {    auth : JSON.parse(localStorage.getItem('auth')).token   } , params : data })
}

export const createNote = data => {
    return Axios.post('/createnote', data, { headers:{auth : JSON.parse(localStorage.getItem('auth')).token }} )
}

export const deleteNote = data =>{
    return Axios.delete('/deletenote', { params:data , headers:{auth : JSON.parse(localStorage.getItem('auth')).token } } )
}

export const editNote = data =>{
    return Axios.put('/editnote', data , {headers:{auth : JSON.parse(localStorage.getItem('auth')).token }} )
}