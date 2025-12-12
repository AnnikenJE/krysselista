//
//
// User interface for parents and employees

export interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  isEmployee: boolean;
  children: string[];
}
