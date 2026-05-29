type Loan = {
  id: number;
  startDate: string;
  endDate: string;
  realEndDate: string | null;
  newEndDate?: string;
  loanStatus: string;
  appUser: AppUser;
  equipment: Equipment;
};
