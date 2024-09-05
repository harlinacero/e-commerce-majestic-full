
export interface User {
  id: number; // Equivalent to int64 in Go
  username: string;
  password: string;
  email: string;
  roleId: number; // Equivalent to int64 in Go
  avatar: string;

  role: Role
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface SessionUser {
  username: string;
  roleid: number;
  email: string;
  exp: any;
  avatar: string;
  rolename: string;
  userid: string;
}
