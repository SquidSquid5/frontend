// biome-ignore lint/correctness/noUnusedVariables: <explanation>
namespace Shared {
  export interface ErrorResponse {
    errorCode: string;
    message: string;
  }
}

declare namespace TestResponse {
  export interface GetPosts {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
}

declare namespace TestRequest {
  export interface GetPostsParams {
    id: number;
  }
  export interface GetPostsQuery {
    userId: number;
  }
  export interface PostPostsBody {
    title: string;
    body: string;
    userId: number;
  }
}
