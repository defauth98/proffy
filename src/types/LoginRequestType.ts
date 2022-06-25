export interface LoginResponse {
  data: {
    token: string;
    user: {
      avatar: string;
      bio: string;
      email: string;
      id: string;
      name: string;
      surname: string;
      whatsapp: string;
    }
  },
  status: number;
}
