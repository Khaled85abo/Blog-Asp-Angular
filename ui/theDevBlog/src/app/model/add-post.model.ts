export interface AddPostRequest {
  title: string | undefined;
  content: string | undefined;
  summary: string | undefined;
  author: string | undefined;
  urlHandle: string | undefined;
  visible: boolean | undefined;
  publishedDate: string | undefined;
  updatedDate: string | undefined;
  featuredImageUrl: string | undefined;
}
