import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../../data";
import { GetGroupResponse } from "./types";

export const getGroups = createAsyncThunk(
  "groups/fetch",
  async ({
    colorFilter,
    friendsFilter,
    privacyFilter,
  }: {
    colorFilter: Array<string>;
    friendsFilter: string | boolean;
    privacyFilter: string | boolean;
  }) => {
    try {
      const filters = { colorFilter, friendsFilter, privacyFilter };
      return await fetchGroups(false, filters);
    } catch (e) {
      throw new Error();
    }
  }
);

export const fetchGroups = (
  imitateFail: boolean,
  filters: any
): Promise<GetGroupResponse> => {
  return new Promise((resolve, reject) => {
    const delay = setTimeout(() => {
      if (imitateFail) {
        reject("Error");
      } else {
        resolve({
          result: 1,
          data: data.filter((item) => {
            if (
              filters.colorFilter.length > 0 &&
              !filters.colorFilter.includes(item.avatar_color)
            ) {
              return false;
            }
            // }
            if (filters.privacyFilter == String(item.closed)) {
              return false;
            }
            if (filters.friendsFilter == "true" && !item.friends) {
              return false;
            }
            if (filters.friendsFilter == "false" && item.friends) {
              return false;
            }
            return true;
          }),
        });
      }
    }, 1000);

    return () => clearTimeout(delay);
  });
};
