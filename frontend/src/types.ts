export type Status = "OPEN" | "IN_PROGRESS" | "DONE";

export interface FeedItem {
  id: string;
  title: string;
  status: Status;
  project: { id: string; name: string };
  assignee: { id: string; name: string };
  tags: { id: string; name: string }[];
  commentsCount: number;
  lastComment: {
    id: string;
    createdAt: string;
    author: { id: string; name: string };
    snippet: string;
  } | null;
  createdAt: string;
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}
