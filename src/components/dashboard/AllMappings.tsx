import React from 'react'
import { IoPencil, IoTrashBin } from "react-icons/io5";
import Filter from "./Filter";

type Props = {
    allMappings: any;
}

const AllMappings = ({ allMappings }: Props) => {
    const handleEditMapping = (mapping: any) => {
        alert(mapping.appConfig.name + ' ' + mapping.playerConfig.name);
    }

    const handleDeleteMapping = (mapping: any) => {
        alert(mapping);
    }

    return (
        
    )
}

export default AllMappings