import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8080/Summer_Internship_Backend/Populate'
});
export default instance;