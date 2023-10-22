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


export const getFormatTimeOrDate = (createdAt?: Timestamp) => {
  if (createdAt) {
    const timestampInMillis =
      createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000;

    const date = new Date(timestampInMillis);

    const formatTimeOrDate = (inputDate: Date) => {
      const currentDate = new Date();
      const isToday =
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear();

      if (isToday) {
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        return formattedTime;
      } else {
        const day = inputDate.getDate();
        const month = inputDate.toLocaleString("default", { month: "long" });
        const year = inputDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
      }
    };

    return formatTimeOrDate(date);
  }
};