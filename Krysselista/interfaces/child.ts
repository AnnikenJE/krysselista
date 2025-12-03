//
//
// Interface for children

export interface ChildData {
    id: string; 
    name: string;
    birthday: Date; // If problems appear, then this can be the problem.
    healthInfo: string[];
    isPresent: boolean;
}