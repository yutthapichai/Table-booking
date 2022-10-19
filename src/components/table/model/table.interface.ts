export interface tableState extends AddTableState {
  id: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userID?: string;
}

export interface AddTableState {
  name: string;
  capacity: number;
  isAvailable: boolean;
  location: string;
  restaurantID: string;
}

export interface UpdateTableState {
  name: string;
  capacity: number;
  isAvailable: boolean;
  location: string;
}
