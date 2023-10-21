import { useUserContext } from "@/components/user-context";
import { User } from "@/types";

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
