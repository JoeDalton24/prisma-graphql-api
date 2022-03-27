import jwt from "jsonwebtoken";
const ACCES_TOKEN = "276486c9aee6135040d20a9461daab70";

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
