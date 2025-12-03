import { ChildData } from "./child";
import uuid from 'react-native-uuid';

export interface UserData {
    id: uuid.v4();
    name: string;
    email: string;
    phone: string;
    isEmployee: boolean;
    children: ChildData[]; //Array of Child IDs
}