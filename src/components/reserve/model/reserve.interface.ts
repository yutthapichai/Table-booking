export interface ReserveState extends AddReserveState {
  id: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userID?: string;
}

export interface AddReserveState {
  name: string;
  phone: string;
  date: string;
  tableID: string;
}

export interface UpdateReserveState {
  name: string;
  phone: string;
}
