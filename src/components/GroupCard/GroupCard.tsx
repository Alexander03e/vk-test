import {
  Accordion,
  Avatar,
  Group,
  RichCell,
  UsersStack,
} from "@vkontakte/vkui";
import "./style.css";
import { IGroup } from "../../store/groups/types";
import { useState } from "react";
import { GroupModal } from "./GroupModal";
interface IGroupCardProps {
  item: IGroup;
}
export const GroupCard: React.FC<IGroupCardProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Group>
        <RichCell
          style={{ fontSize: "40px" }}
          hovered={true}
          hasHover={true}
          size={1}
          hoverClassName="hovered"
          multiline={true}
          caption={
            <>
              <p>{item.closed ? "Закрытая группа" : "Открытая группа"}</p>
              <p>{item.members_count} подписчиков</p>
            </>
          }
          before={
            <Avatar size={100} style={{ backgroundColor: item.avatar_color }} />
          }
          bottom={
            item.friends ? (
              <UsersStack
                visibleCount={0}
                className="group-friends"
                onClick={() => setOpen(!open)}
              >
                {item?.friends?.length} общих друга
              </UsersStack>
            ) : (
              ""
            )
          }
        >
          {item.name}
        </RichCell>
        <Accordion expanded={open}>
          <Accordion.Content>
            <div className="friend-modal-wrapper">
              {item.friends?.map((friend) => (
                <>
                  <GroupModal friend={friend} />
                </>
              ))}
            </div>
          </Accordion.Content>
        </Accordion>
      </Group>
    </>
  );
};
