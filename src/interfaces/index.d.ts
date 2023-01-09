export interface IStatus {
  code: string;
  name: string;
  group_name: string;
}

export interface IStatusGroup {
  name: string;
  description: string;
}

export interface IClaims {
  id: string;
  claim_number: string;
  status_code: string;
  date_received: string;
  date_of_loss: string;
  created_at: string;
  updated_at: string;
  status: IStatus;
}
