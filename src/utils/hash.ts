import bcrypt from "bcrypt";

const SALT = 12;

export const getHash = (pwd: string): Promise<string> => {
  return bcrypt.hash(pwd, SALT);
};

export const compare = (pwd: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(pwd, hash);
};
