import { SplitCol, SplitLayout } from "@vkontakte/vkui";
import "./style.css";
import { Loading } from "../Loading/Loading";
import { Status } from "../../store/groups/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getGroups } from "../../store/groups/asyncActions";
import { GroupCard } from "../GroupCard/GroupCard";
import { Filters } from "../Filters.tsx/Filters";

export const GroupsList = () => {
  const dispatch = useAppDispatch();
  const { groups, status } = useAppSelector((state) => state.group);

  const { colorFilter, friendsFilter, privacyFilter } = useAppSelector(
    (state) => state.filters
  );
  useEffect(() => {
    dispatch(getGroups({ colorFilter, friendsFilter, privacyFilter }));
  }, [dispatch, colorFilter, friendsFilter, privacyFilter]);
  return (
    <div className="groups-wrapper">
      <SplitLayout style={{ justifyContent: "center" }}>
        <SplitCol maxWidth={600}>
          <Filters />
          {status == Status.ERROR ? <p>Ошибка Запроса</p> : ""}
          {status === Status.LOADING ? <Loading /> : ""}
          {groups.data?.map((item) => (
            <GroupCard item={item} key={item.id} />
          ))}
        </SplitCol>
      </SplitLayout>
    </div>
  );
};
