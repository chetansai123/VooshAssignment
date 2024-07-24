import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

export const verifyPassworrd = async (password, hashedpassword) => {
    console.log(hashedpassword, password);
    const isMatch = await bcrypt.compare(password, hashedpassword);
    console.log(isMatch);
    return isMatch;
}

export const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    return token;
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}