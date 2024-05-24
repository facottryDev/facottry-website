import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterStore = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

type UserStore = {
  user: User | null;
  company: Company | null;
  activeProject: Project | null;
  projects: Project[];
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  setActiveProject: (activeProject: Project | null) => void;
  setProjects: (projects: Project[]) => void;
};

type GlobalStore = {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
};

export const filterStore = create(
  persist<FilterStore>(
    (set) => ({
      filter: {
        country: "",
        subscription: "",
        os: "",
        osver: "",
      },
      setFilter: (filter) => set({ filter }),
    }),
    { name: "filterSelection" }
  )
);

export const userStore = create(
  persist<UserStore>((set) => ({
    user: null,
    company: null,
    projects: [],
    activeProject: null,

    setUser: (user) => set({ user }),
    setCompany: (company) => set({ company }),
    setProjects: (projects) => set({ projects }),
    setActiveProject: (activeProject) => set({ activeProject }),
  }),
  { name: "user" })
);

export const globalStore = create(persist<GlobalStore>((set) => ({
  sidebar: true,
  setSidebar: (sidebar) => set({ sidebar }),
}), { name: "global" }));