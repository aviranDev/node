import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import UserService from "../services/users";

class UserController {
  // Declare an instance of UserService as a property
  private service = new UserService();

  /**
   * Adds a new member to the system while managing sessions.
   * 
   * @async
   * @param {Request} req - Express request object containing the member information in the request body.
   * @param {Response} res - Express response object for sending the response.
   * @param {NextFunction} next - Express next middleware function for handling errors.
   * @returns {Promise<void>} A Promise that resolves when the operation is complete.
   *
   * @throws {Error} Throws an error if there's an issue with member addition or session management.
   *
   * @description Handles the addition of a new member to the system.
   * - Check if the user is already logged in from another device based on their session ID.
   * - If not logged in from another device, extract member information from the request body.
   * - Add the new member using the service.
   * - Create a new session or update the existing session with the new session ID.
   * - Respond with a success message and the newly created member.
   * - Logs that the registration operation has completed.
   */
  addMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Extract member information from the request body.
      const member: IUser = req.body;

      // Add the new member using the service.
      const newMember = await this.service.addMember(member);

      // Respond with a success message and the newly created member.
      res.status(201).json({ newMember, message: "User Added Successfully." });
    } catch (error) {
      // Handle errors by passing them to the next middleware.
      next(error);
    }
  };
};

export default new UserController();