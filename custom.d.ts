type TableColumn = any;
type TableRow = any;

type appConfig = {
  configID: string;
  projectID: string;
  name: string;
  desc: string;
  params: string;
  createdAt: string;
  updatedAt: string;
  demo_url: string;
};

type playerConfig = {
  configID: string;
  projectID: string;
  name: string;
  desc: string;
  params: string;
  createdAt: string;
  updatedAt: string;
  demo_url: string;
};

type mapping = {
  appConfig: any;
  playerConfig: any;
};

type Filter = {
  country: string;
  subscription: string;
  os: string;
  osver: string;
};

type User = {
  email: string;
  name: string;
  address: string;
  mobile: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

type Company = {
  companyID: string;
  name: string;
  address: string;
  role: "owner" | "employee";
  joinRequests: string[];
  activeInvites: string[];
  owners: string[];
  employees: string[];
};

type Project = {
  projectID: string;
  name: string;
  type: "PROD" | "DEV" | "UAT" | "TEST";
  role: "owner" | "editor" | "viewer";
  joinRequests: string[];
  activeInvites: string[];
  owners: string[];
  editors: string[];
  viewers: string[];
};
