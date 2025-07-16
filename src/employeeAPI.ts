import { api  } from './services/api';
import axios from "axios";

export async function getAllEmployees(username: string, password: string) {

    const apiClient = api()


try{
  const response = await apiClient.listAllEmployees({
    headers: {
      'Content-Type': 'application/json'
    }
  });

if(response.status === 200) {
    return { data: response.data };
        } else if (response.status === 401) {
            throw new Error("Unauthorized: Wrong login data");
        } else {
            throw new Error("Error: ${response.status}");
       }
        } catch (err: any) {
            console.error("Error: ", err.message || "Unknown Error");
            throw new Error("Error calling data");
            }
        }