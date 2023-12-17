import { Model } from "mongoose";
import User, { IUser } from "../models/User";
import bcryptjs from "bcryptjs";



class UserService {
  private model: Model<IUser>

  constructor() {
    // Initialize the data model
    this.model = User;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    // Use bcryptjs to hash the password with the provided salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Return the hashed password
    return hashedPassword;
  }

  private generateSalt(salt: string): string {
    // Use bcryptjs to synchronously generate a salt based on the provided value
    const generatedSalt = bcryptjs.genSaltSync(Number(salt));

    // Return the generated salt
    return generatedSalt;
  }

  async addMember(member: IUser): Promise<IUser> {
    try {
      // Check if the member with the same username already exists.
      const existingUser = await this.model.findOne({ username: member.username });

      // Throw a ConflictError if a member with the same username already exists
      if (existingUser) {
        throw new Error('User with this username already exists');
      }

      // Generate a salt for password hashing.
      const salt = this.generateSalt("10");

      // Hash the member's password.
      const hashPassword = await this.hashPassword(member.password, salt);

      // Create a new member with the hashed password.
      const newUser = new this.model({ ...member, password: hashPassword });

      // Save the new member to the database.
      await newUser.save();

      // Return the newly added member.
      return newUser;

    } catch (error) {
      throw error;
    }
  }

}

export default UserService;