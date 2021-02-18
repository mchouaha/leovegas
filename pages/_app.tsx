import React, { Fragment, FunctionComponent, useState } from "react"
import { searchContext } from "../context"

interface IProps {
    Component: FunctionComponent
    pageProps: any
}

export default function App( {Component, pageProps}: IProps) {
    
    const ContextProvider: FunctionComponent = ({ children }) => {

        const [searchName, setSearchName] = useState('')

        return (
            <Fragment>
                    <searchContext.Provider value={{searchName, setSearchName}}>
                        {children}
                    </searchContext.Provider>
            </Fragment>
        )
    }

    return (
        <ContextProvider>
                    <Component {...pageProps} />
        </ContextProvider>
    )
}
