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
                    <h1 className="text-lg font-bold my-8">Manage Configs</h1>
                    <div className="grid grid-cols-1 gap-10 w-full justify-around">
                        <div>
                            <p className="font-bold text-lg my-2 uppercase">App Configs</p>
                            <ConfigTableComponent type='app' configList={configs?.appConfigs} getConfigs={getConfigs} />
                        </div>

                        <div>
                            <p className="font-bold text-lg my-2 uppercase">Player Configs</p>
                            <ConfigTableComponent type='player' configList={configs?.playerConfigs} getConfigs={getConfigs} />
                        </div>

                        {configs?.types.map((type) => (
                            type !== 'app' && type !== 'player' && (
                                <div key={type}>
                                    <p className="font-bold text-lg my-2 uppercase">{type} Configs</p>
                                    <ConfigTableComponent type={type} configList={
                                        configs?.customConfigs.filter((config) => config.type === type)
                                    } getConfigs={getConfigs} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageConfigs