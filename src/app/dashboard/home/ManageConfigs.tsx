'use client'
import { useEffect, useState } from "react"
import { axios_config } from "@/lib/axios"
import { userStore } from "@/lib/store";
import ConfigTableComponent from "./ConfigEditorComponent";

type Props = {}

const ManageConfigs = (props: Props) => {
    const [configs, setConfigs] = useState<configs>();
    const [configModal, setconfigModal] = useState('');

    const activeProject = userStore(state => state.activeProject);
    const userRole = activeProject?.role;

    const getConfigs = async () => {
        try {
            const result = await axios_config.get("/get-configs", {
                params: { projectID: activeProject?.projectID },
            });

            setConfigs(result.data);
        } catch (error: any) {
            return error.response;
        }
    }

    useEffect(() => {
        getConfigs();
    }, [activeProject])

    return (
        <div>
            {userRole && (userRole === 'owner' || userRole === 'editor') && (
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 gap-10 w-full justify-around">

                        <section className="w-full border rounded-md mt-8">
                            <h1 className="text-lg font-bold text-center my-4">App Config</h1>
                            <ConfigTableComponent type='app' configList={configs?.appConfigs} getConfigs={getConfigs} />
                        </section>

                        <section className="w-full border rounded-md mt-8">
                            <h1 className="text-lg font-bold text-center my-4">Player Config</h1>
                            <ConfigTableComponent type='player' configList={configs?.playerConfigs} getConfigs={getConfigs} />
                        </section>

                        {configs?.types.map((type) => (
                            type !== 'app' && type !== 'player' && (
                                <section key={type} className="w-full border rounded-md mt-8">
                                    <h1 className="text-lg font-bold text-center my-4">{type} Configs</h1>
                                    <ConfigTableComponent type={type} configList={
                                        configs?.customConfigs.filter((config) => config.type === type)
                                    } getConfigs={getConfigs} />
                                </section>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageConfigs