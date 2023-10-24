import { useUserContext } from "@/components/user-context";
import { User } from "@/types";
import { Timestamp } from "firebase/firestore";

export const useChatMembersForHeader = (members: string[]): User[] => {
  const { allUsers, currentUser } = useUserContext();

  const filteredMemberIds = members.filter(
    (memberId) => memberId !== currentUser?.id
  );

  const selectedMembers = allUsers?.filter((user) =>
    filteredMemberIds.includes(user.id)
  );

  return selectedMembers!;
};

export const getFormatTimeOrDate = (createdAt: Timestamp) => {
  const timestampInMillis = createdAt.toMillis();
  const inputDate = new Date(timestampInMillis);
  const today = new Date();

  if (inputDate.toDateString() === today.toDateString()) {
    return inputDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return inputDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  }
};
