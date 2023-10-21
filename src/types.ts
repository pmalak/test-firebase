export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  contacts: string[];
  chats: string[];
};

export type Message = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
};

export type Chat = {
  id: string;
  chatName: string;
  messages: Message[];
  lastMessage: Message | null;
  members: User[];
  avatar: string;
};
