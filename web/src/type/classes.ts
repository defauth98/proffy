export interface ClassFilter {
  week_day: string;
  subject: string;
  time: string;
  page: number;
}

export interface Class {
  id: string;
  class_id: string;
  subject: string;
  cost: string;
  user_id: string;
  name?: string;
  avatar?: string;
  bio?: string;
  email?: string;
  surname?: string;
  whatsapp?: string;
}

export interface ScheduleItem {
  id: string;
  week_day: string;
  from: number;
  to: number;
  class_id: string;
  created_at: string;
}
