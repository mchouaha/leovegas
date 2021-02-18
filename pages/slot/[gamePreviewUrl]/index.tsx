import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../../components/Layout'

const Slot = () => {

    const router = useRouter()

    const [url, setUrl] = useState<string>('')
    const [gameName, setGameName] = useState<string>('')

    useEffect(() => {
        setUrl(String(router.query.gamePreviewUrl))
        setGameName(String(router.query.gameName))
    }, [router.query])

    return (
        <Layout title="Slot"> 
            <SlotContainer>
                <h2>{gameName}</h2>
                <IframeContainers src={url}></IframeContainers>
            </SlotContainer>
        </Layout>       
    )
}
 
const SlotContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`

const IframeContainers = styled.iframe`
    width:80vw;
    height:80vh;
`

export default Slot
