export interface IClaims {
  id: string;
  claim_number: string;
  status_code: string;
  date_received: string;
  date_of_loss: string;
  created_at: string;
  updated_at: string;
}

export interface IStatus {
  code: string;
  name: string;
  group_name: string;
}
