import { Chat, Message, User } from "./types";

const users: User[] = [
  {
    id: "user1",
    name: "Vasil",
    email: "alice@example.com",
    avatarUrl:
      "https://media.licdn.com/dms/image/C4E03AQE4jx5uZu8Axg/profile-displayphoto-shrink_800_800/0/1602924586098?e=1703116800&v=beta&t=4idmHjrPNh3phrNXNJ0bohKzudXsXYG9p-zjCd807mk",
  },
  {
    id: "user2",
    name: "Sébastien",
    email: "bob@example.com",
    avatarUrl:
      "https://media.licdn.com/dms/image/C4E03AQHkksL7UmWq6w/profile-displayphoto-shrink_800_800/0/1516315321563?e=1703116800&v=beta&t=khM8LCe-cM_B1biMDiMTY4QzwwKhB-OtpDNV-GqngsM",
  },
  {
    id: "user3",
    name: "Petr",
    email: "charlie@example.com",
    avatarUrl:
      "https://media.licdn.com/dms/image/C4D03AQG8mX1ejuJ2Fw/profile-displayphoto-shrink_400_400/0/1635176036222?e=1703116800&v=beta&t=KyVbPAdbvRs4zAFPL46sLRTXFspJhUzXjxhI4Rj8xp8",
  },
];

const currentUser = users[2];

export { users, currentUser };
