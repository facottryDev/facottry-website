import { create } from "zustand";
import { persist } from "zustand/middleware";

export const projectStore = create<ProjectStore>((set) => ({
  projects: [],
  activeProject: {
    projectID: "",
    companyID: "",
    name: "",
    type: "",
    role: "",
  },
  setProjects: (projects) => set({ projects }),
  setActiveProject: (activeProject: Project) => {set({ activeProject })}
}));

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
    companyID: "",
    profilePic: "",
    createdAt: "",
    updatedAt: "",
  },
  setUser: (user: User) => set({ user }),
}));
