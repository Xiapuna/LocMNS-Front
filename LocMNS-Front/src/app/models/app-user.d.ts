type AppUser = {
  id: number;
  firstName: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  accreditations: Accreditation[];
};
