export type TopicResponse = {
  id: number;
  name: string;
  isPrivate: boolean;
  position: number; // it could be changed to string
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
