export type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[]; // could make this specific to supported specialties
  yearsOfExperience: number;
  phoneNumber: number;
};
