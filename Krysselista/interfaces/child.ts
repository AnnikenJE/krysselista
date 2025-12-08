//
//
// Interface for children

export interface ChildData {
    id: string; 
    name: string;
    birthday: string; // Change to date if we have time.
    healthInfo: string;
    acitivityLog: Date[];
    isPresent: boolean;
}