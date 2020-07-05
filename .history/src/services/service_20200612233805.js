import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';

export const FetchData = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/Summer_Internship_Backend/PopulateTable');
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getInvoiceList = async () => {
  return await axios.get('http://localhost:8080/Summer_Internship_Backend/dummy.do');
};

export const getJSON = async () => {
  try {
    const response = axios.get('http://localhost:8080/Summer_Internship_Backend/dummy.do');
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};