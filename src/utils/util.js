import jwt from "jsonwebtoken";
const ACCES_TOKEN = "276486c9aee6135040d20a9461daab70";

export function getUserId(request) {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error("Authentification required");
  }

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, ACCES_TOKEN);

  return decoded.userId;
}
