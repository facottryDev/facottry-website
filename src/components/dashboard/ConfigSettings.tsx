'use client'

import Table from "../common/ConfigSettingTable";

const columns: TableColumn[] = [
  "Config Name",
  "Created By",
  "Actions",
];
const values: TableRow[] = [
  {
    "Config Name": "Config 1",
    "Created By": "User 1",
  },
  {
    "Config Name": "Config 2",
    "Created By": "User 2",
  },
  {
    "Config Name": "Config 3",
    "Created By": "User 3",
  },
];

export default function ConfigSettings() {
  return (
    <form>
      <div>
        <div className="pb-6">
          <h2 className="text-base font-semibold leading-7 dark:text-slate-200 text-gray-900">Config Settings</h2>
          <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">Manage your configs</p>

          <div className="bg-white p-4 dark:bg-darkblue rounded-lg mt-4 h-full">
            <Table columns={columns} values={values} />
          </div>
        </div>
      </div>
    </form>
  )
}
