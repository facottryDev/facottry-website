type TableColumn = any;
type TableRow = any;

type Filter = {
  country: string;
  subscription: string;
  os: string;
  osver: string;
};

type Project = {
  projectID: string;
  companyID: string;
  name: string;
  type: string;
  role: string;
};

type ProjectStore = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
};

type ActiveProjectStore = {
  projectID: string;
  setActiveProject: (id: string) => void;
};

type FilterStore = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

type appConfig = {
  configID: string;
  projectID: string;
  params: string;
  createdAt: string;
  updatedAt: string;
  demo_url: string;
};

type playerConfig = {
  configID: string;
  projectID: string;
  params: string;
  createdAt: string;
  updatedAt: string;
  demo_url: string;
};

type mapping = {
  appConfig: any,
  playerConfig: any,
}

type User = {
  email: string;
  name: string;
  address: string;
  mobile: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
};