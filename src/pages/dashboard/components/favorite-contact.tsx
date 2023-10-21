import { useUserContext } from "@/components/user-context";
import { Typography } from "@material-ui/core";

export const FavoriteContacts = () => {
  const { allUsers } = useUserContext();

  console.log("allUsers", allUsers);

  return (
    <div>
      <Typography variant="h5">Favorites</Typography>

      <div>{allUsers?.map(({ name }) => <div>{name}</div>)}</div>
    </div>
  );
};
