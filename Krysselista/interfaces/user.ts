//
//
// User interface for parents and employees

import { ChildData } from "./child";

export interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  isEmployee: boolean;
  children: ChildData[];
}