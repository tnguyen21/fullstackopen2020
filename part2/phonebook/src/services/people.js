import axios from 'axios';
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseurl);
}

const createPerson = newObject => {
    return axios.post(baseurl, newObject);
}

const updatePerson = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject);
}

const deletePerson = id => {
    return axios.delete(`${baseurl}/${id}`);
}

export default { getAll, createPerson, updatePerson, deletePerson }