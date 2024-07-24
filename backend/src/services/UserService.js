import { User } from "../models/index.js"
import { hashPassword, verifyPassworrd, generateToken } from "../utils/authUtils.js";

export const registerUser = async ({ firstName, lastName, email, password }) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User already exists!");
    }

    const hashedPassword = await hashPassword(password);
    const userObj = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    if (!userObj) {
        throw new Error("UserObj Not inserted into DB!!");
    }
    return {
        id: userObj._id,
        token: generateToken(userObj._id),
    }
}

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user && await verifyPassworrd(password, user.password)) {
        return generateToken(user._id);
    } else {
        throw new Error("Invalid email or password");
    }
}