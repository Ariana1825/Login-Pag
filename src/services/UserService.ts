import axios from "axios";
import { Login } from "../class/Login";
import { Users } from "../class/Users";

const Api_user = "https://reqres.in/api/users";
const Api_login = "https://reqres.in/api/login";

export class UserService {
  static async login(login: Login): Promise<{ token: string }> {
    try {
      const response = await axios.post(Api_login, login, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      });
      const token = response.data.token;
      localStorage.setItem("Token", token);
      return token;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }

  static async CrearUser(user: Users): Promise<Users> {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(Api_user, user, {
        headers: {
          "x-api-key": "reqres-free-v1",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      return response.data as Users;
    } catch (error) {
      console.error("Error en creación de usuario:", error);
      throw error;
    }
  }
}
