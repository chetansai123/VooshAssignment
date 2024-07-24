import * as UserService from "../services/UserService.js";

export const registerUser = async (req, res, next) => {
    try {
        const user = await UserService.registerUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.loginUser({ email, password });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}