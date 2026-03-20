declare namespace TestResponse {
  export interface GetPosts {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
}

export interface RegisterRequest {
  userId: string;
  email: string;
  nickname: string;
  createdAt: string;
}

export interface LoginRequest {
  userId: string;
  token: string;
  nickname: string;
}
