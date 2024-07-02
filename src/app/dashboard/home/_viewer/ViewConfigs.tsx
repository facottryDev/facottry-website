'use client'
import React from "react";
import { useEffect, useState } from "react"
import { axios_config } from "@/lib/axios"
import { userStore, activeFilterStore } from "@/lib/store";
import ConfigViewerComponent from "./ConfigViewerComponent"

type Props = {}

const ViewConfigs = (props: Props) => {
  const [configs, setConfigs] = useState<configs>();

  const activeProject = userStore(state => state.activeProject);

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
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-around w-full">
      <section className="w-full border rounded-md mt-8">
        <h1 className="text-lg font-bold text-center my-4">App Config</h1>
        <ConfigViewerComponent
          configList={configs?.appConfigs}
          type='app'
        />
      </section>

      <section className="w-full border rounded-md mt-8">
        <p className="text-lg font-bold text-center my-4">Player Configs</p>

        <ConfigViewerComponent
          configList={configs?.playerConfigs}
          type='player'
        />
      </section>

      {configs?.types.map((type) => (
        type !== 'app' && type !== 'player' && (<section className="w-full border rounded-md mt-8">
          <p className="text-lg font-bold text-center my-4">{type} Configs</p>

          <ConfigViewerComponent
            configList={configs?.customConfigs.filter((config) => config.type === type)}
            type={type}
          />
        </section>)
      ))}
    </div>
  )
}

export default ViewConfigs