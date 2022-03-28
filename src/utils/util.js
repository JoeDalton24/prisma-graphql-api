import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const ACCES_TOKEN = process.env.ACCES_TOKEN;

export function getUserId(request, requireAuth = true) {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, ACCES_TOKEN);
    return decoded.userId;
    //
  }

  if (requireAuth) {
    throw new Error("Authentification required");
  }

  return null;
}
export function generateToken(userId) {
  const expiresIn = "7 days";
  if (!userId) {
    throw new Error();
  }
  return jwt.sign({ userId }, ACCES_TOKEN, { expiresIn });
}

export async function hashPassword(password) {
  const SALT = 10;
  return bcrypt.hash(password, SALT);
}

export async function comparePassword(providedPassword, storedPassword) {
  return bcrypt.compare(providedPassword, storedPassword);
}
