export interface User {
  first_name: string;
  last_name: string;
}
export interface GetGroupResponse {
  result: 1 | 0;
  data?: Array<IGroup>;
}

export interface IGroup {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: Array<User>;
}

export interface IInitialGroups {
  groups: {
    result: 1 | 0;
    data?: Array<IGroup>;
  };
  searchGroups: Array<IGroup>;
  status: Status | "idle";
}

export enum Status {
  LOADING = "LOADING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}
