import {
  Accordion,
  Button,
  Checkbox,
  FormItem,
  FormLayoutGroup,
  Radio,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addColorFilters,
  addFriendsFilter,
  addPrivacyFilters,
  addUniqColors,
} from "../../store/filters/slice";
export const Filters: React.FC = React.memo(() => {
  const [opened, setOpened] = useState(false);
  const [currentColorFilter, setCurrentColorFiler] = useState<Array<string>>(
    []
  );
  const [currentFriendsFilter, setCurrentFriendsFilter] = useState<
    string | boolean
  >("");
  const [currentPrivacyFilter, setCurrentPrivacyFilter] = useState<
    string | boolean
  >("");
  const dispatch = useAppDispatch();
  const openFilters = () => {
    setOpened(!opened);
  };
  const data = useAppSelector((state) => state.group.groups.data);
  const uniqColors = useAppSelector((state) => state.filters.uniqColorFilters);
  const changeColorFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { value, checked } = e.currentTarget;
    console.log(checked);
    if (checked) {
      setCurrentColorFiler([...currentColorFilter, value]);
    } else {
      setCurrentColorFiler(currentColorFilter.filter((el) => el !== value));
    }
  };
  const changeFriendsFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCurrentFriendsFilter(value);
  };
  const changePrivacyFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCurrentPrivacyFilter(value);
  };
  const privacyFilter = [
    { value: "all", label: "Все" },
    { value: true, label: "Открытые группы" },
    { value: false, label: "Закрытые группы" },
  ];
  const friendsFilter = [
    { value: "all", label: "Все" },
    { value: true, label: "Есть общие друзья" },
    { value: false, label: "Без общих друзей" },
  ];
  useEffect(() => {
    if (uniqColors.length === 0) {
      dispatch(
        addUniqColors([
          ...new Set(
            data?.map((item) => item.avatar_color).filter((item) => item)
          ),
        ])
      );
    }
  }, [data]);

  const applyFilters = () => {
    dispatch(addColorFilters(currentColorFilter));
    dispatch(addPrivacyFilters(currentPrivacyFilter));
    dispatch(addFriendsFilter(currentFriendsFilter));
  };

  return (
    <>
      <button className="filters-button" onClick={openFilters}>
        Фильтры
      </button>
      <Accordion expanded={opened}>
        <Accordion.Content>
          <div className="split">
            <FormLayoutGroup>
              <FormItem top="Цвета">
                {uniqColors?.map((item) => (
                  <Checkbox value={item} onChange={changeColorFilter}>
                    {item}
                  </Checkbox>
                ))}
              </FormItem>
              <FormItem>
                <Button onClick={applyFilters}>Показать результаты</Button>
              </FormItem>
            </FormLayoutGroup>
            <FormLayoutGroup>
              <FormItem top="Друзья">
                {friendsFilter.map((item) => (
                  <Radio
                    name="radio-friends"
                    value={item.value}
                    onChange={changeFriendsFilter}
                  >
                    {item.label}
                  </Radio>
                ))}
              </FormItem>
            </FormLayoutGroup>
            <FormLayoutGroup>
              <FormItem top="Приватность">
                {privacyFilter.map((item) => (
                  <Radio
                    name="radio-privacy"
                    value={item.value}
                    onChange={changePrivacyFilter}
                  >
                    {item.label}
                  </Radio>
                ))}
              </FormItem>
            </FormLayoutGroup>
          </div>
        </Accordion.Content>
      </Accordion>
    </>
  );
});
