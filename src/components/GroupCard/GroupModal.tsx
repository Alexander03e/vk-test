import { User } from "../../store/groups/types";
import { SimpleCell } from "@vkontakte/vkui";

export const GroupModal: React.FC<{ friend: User }> = ({ friend }) => {
  return (
    <>
      <SimpleCell expandable="auto">
        {friend.first_name} {friend.last_name}
      </SimpleCell>
    </>
  );
};
