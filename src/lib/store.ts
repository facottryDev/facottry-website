import { create } from "zustand";
import { persist } from "zustand/middleware";

export const projectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));

export const activeProjectStore = create(
  persist<ActiveProjectStore>(
    (set) => ({
      projectID: "",
      setActiveProject: (id) => set({ projectID: id }),
    }),
    { name: "activeProject" }
  )
);

export const filterStore = create(
  persist<FilterStore>(
    (set) => ({
      filter: {
        country: "",
        subscription: "",
        os: "",
        osver: "",
      },
      setFilter: (filter: Filter) => set({ filter }),
    }),
    { name: "filterSelection" }
  )
);

export const userStore = create<UserStore>((set) => ({
  user: {
    email: "user@gmail.com",
    name: "User",
    address: "",
    mobile: "",
    profilePic: "",
    createdAt: "",
    updatedAt: "",
  },
  setUser: (user: User) => set({ user }),
}));
