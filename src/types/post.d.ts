import { User } from "./user";

export interface Post {
  uuid: string;
  as: "post" | "draft";
  content: string;
  see_more?: boolean;
  user: User,
  visibility: "public" | "private" | "friends";
  active: true;
  answer_to: number;
  created_at: string;
  updated_at: string;
  inactivated_at?: string;
}
