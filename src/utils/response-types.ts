export type TopicsResponse = {
  topics: TopicForResponse[];
  total: number;
};

export type TopicForResponse = {
  id: number;
  name: string;
  isPrivate: boolean;
  position: string;
  isCopied: boolean;
  copiedTimes: number;
  originalTopicId: number | null;
  updatedDate: Date;
  items: TopicItemForTopicResponse[];
  user: UserForTopicResponse;
  copied: string[];
};

type UserForTopicResponse = {
  name: string;
  picture: string;
};

type TopicItemForTopicResponse = {
  position: number;
  nativeLocale: string;
  nativeText: string;
  targetLocale: string;
  targetText: string;
  examples: string[];
};
