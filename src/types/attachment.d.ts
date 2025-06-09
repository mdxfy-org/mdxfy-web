export interface Attachment {
  id: number;
  uuid: string;
  name: string;
  path: string;
  mime_type: string;
  size: number;
  uploaded_by: number;
  active: boolean;
  updated_at: string;
  created_at: string;
}
