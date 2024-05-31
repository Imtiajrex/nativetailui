import React, { createContext, useState } from 'react'

export const GroupContext = createContext({
    isGroup: false
})
export const useGroupContext = () => React.useContext(GroupContext) || { isGroup: false }
export const useInGroup = () => useGroupContext().isGroup || false

export default function GroupProvider(props: {
    children: React.ReactNode;
    isGroup: boolean;

}) {
    const [isGroup] = useState(props.isGroup)
    return (
        <GroupContext.Provider value={{ isGroup }}>
            {props.children}
        </GroupContext.Provider>

    )
}