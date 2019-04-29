import axios from 'axios';

const API_URL = 'http://localhost:3000';

export class APIService {

    constructor() {
    }

    getDocs() {
        const url = `${API_URL}/docs`;
        return axios.get(url);
    }

    getDoc(id) {
        const url = `${API_URL}/docs/${id}`;
        return axios.get(url);
    }

    deleteDoc(id) {
        const url = `${API_URL}/docs/${id}`;
        return axios.delete(url);
    }

    createDoc(doc) {
        const url = `${API_URL}/docs`;
        return axios.post(url, doc);
    }

    updateDoc(doc) {
        const url = `${API_URL}/docs/${doc._id}`;
        return axios.put(url, doc);
    }
}