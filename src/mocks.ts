import { Chat, Message, User } from "./types";

const users: User[] = [
  {
    id: "user1",
    name: "Vasil",
    email: "alice@example.com",
    avatarUrl: "https://media.licdn.com/dms/image/C4E03AQE4jx5uZu8Axg/profile-displayphoto-shrink_800_800/0/1602924586098?e=1703116800&v=beta&t=4idmHjrPNh3phrNXNJ0bohKzudXsXYG9p-zjCd807mk",
  },
  {
    id: "user2",
    name: "Sébastien",
    email: "bob@example.com",
    avatarUrl: "https://media.licdn.com/dms/image/C4E03AQHkksL7UmWq6w/profile-displayphoto-shrink_800_800/0/1516315321563?e=1703116800&v=beta&t=khM8LCe-cM_B1biMDiMTY4QzwwKhB-OtpDNV-GqngsM",
  },
  {
    id: "user3",
    name: "Charlie",
    email: "charlie@example.com",
    avatarUrl: "https://avatar-url.com/charlie.jpg",
  },
];

const chat1Messages: Message[] = [
  {
    id: "message1",
    content: "Hello, Alice!",
    author: users[1], // Bob
    createdAt: new Date(),
  },
  {
    id: "message2",
    content: "Hi, Bob!",
    author: users[0], // Alice
    createdAt: new Date(),
  },
  {
    id: "message3",
    content: "How's it going?",
    author: users[1], // Bob
    createdAt: new Date(),
  },
  {
    id: "message4",
    content: "It's going well. Thanks!, It's going well. Thanks! It's going well. Thanks!",
    author: users[0], // Alice
    createdAt: new Date(),
  },
];

const chat2Messages: Message[] = [
  {
    id: "message5",
    content: "Hey, Charlie!",
    author: users[1], // Bob
    createdAt: new Date(),
  },
  {
    id: "message6",
    content: "Hi, Bob!",
    author: users[2], // Charlie
    createdAt: new Date(),
  },
  {
    id: "message7",
    content: "What's up?",
    author: users[1], // Bob
    createdAt: new Date(),
  },
  {
    id: "message8",
    content: "Not much. How about you?",
    author: users[2], // Charlie
    createdAt: new Date(),
  },
];

const chatsMock: Chat[] = [
  {
    id: "chat1",
    messages: chat1Messages,
    lastMessage: chat1Messages[3],
    members: [users[0], users[1]],
    chatName: "karl",
    avatar: users[0].avatarUrl,
  },
  {
    id: "chat2",
    chatName: "drudej",
    messages: chat2Messages,
    lastMessage: chat2Messages[3],
    members: [users[1], users[2]],
    avatar: users[1].avatarUrl
  },
];

export { users, chatsMock };
