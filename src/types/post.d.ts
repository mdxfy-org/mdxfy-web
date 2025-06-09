import { User } from "./user";

export interface Post {
  uuid: string;
  as: "post" | "draft";
  content: string;
  see_more?: boolean;
  user: User,
  visibility: "public" | "private" | "friends";
  active: true;
  answers: Post[];
  answer_to: number;
  answers_count: number;
  created_at: string;
  updated_at: string;
  inactivated_at?: string;
}
