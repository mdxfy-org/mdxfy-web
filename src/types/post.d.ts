import { User } from "./user";

export interface Post {
  uuid: string;
  as: "post" | "draft";
  content: string;
  user: User,
  visibility: "public" | "private" | "friends";
  active: true;
  answer_to: number;
  created_at: "2025-06-02T18:33:42.000000Z";
  updated_at: "2025-06-02T18:33:42.000000Z";
  inactivated_at?: string;
}
