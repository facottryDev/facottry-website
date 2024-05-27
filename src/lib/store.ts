import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterStore = {
  activeFilter: Filter;
  setActiveFilter: (item: Filter) => void;
};

export const activeFilterStore = create(
  persist<FilterStore>(
    (set) => ({
      activeFilter: [],
      setActiveFilter: (item) => set({ activeFilter: item }),
    }),
    { name: "activeFilter" }
  )
);

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