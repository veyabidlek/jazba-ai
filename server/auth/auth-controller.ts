import { Request, Response } from "express";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import AuthService from "./auth-service";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user = await this.authService.registerUser(createUserDto);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error registering user" });
    }
  };

  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginUser(email, password);
      if (!result) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error logging in" });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      const result = await this.authService.refreshToken(token);
      if (!result) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error refreshing token" });
    }
  };
}

export default AuthController;
