import jwt from "jsonwebtoken";

export function getUserId(request, ACCES_TOKEN) {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error("Authentification required");
  }

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, ACCES_TOKEN);

  return decoded.userId;
}
