import React, { FunctionComponent, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Game } from '../../interfaces'

interface PageProps {
  data: Game
}

const Slot: FunctionComponent<PageProps> = ({data}) => {

    const router = useRouter()

    const [tryThisGame, setTryThisGame] = useState<boolean>(false)

    const playSlot = (slot: Game) => {
    
        const {gamePreviewUrl, gameName} = slot;

        router.push({
            pathname: '/slot/[url]',
            query: { gamePreviewUrl: gamePreviewUrl, gameName: gameName}
        }, '/slot')
    }

    return (
        <SlotContainer 
            key={data.gameName}
            onClick={ () => playSlot(data)}
            onMouseEnter={ () => setTryThisGame(true)}
            onMouseLeave={ () => setTryThisGame(false)}>
            <LazyLoad height={200} offset={100}>
                <Thumbnail 
                    src={'http://' + data.gameThumbnail} 
                    alt="tmp"
                    className={tryThisGame? 'zoom' : ''}>
                </Thumbnail>
            </LazyLoad>                    
            <SubContainer>
                {tryThisGame? 
                <Banner>
                    <span>Try this game</span>
                </Banner>
                : ''}
                <TitleContainer>
                    {data.gameName}
                </TitleContainer>      
            </SubContainer>
        </SlotContainer>
    )
}

const SlotContainer = styled.li`
   width: 200px;
   list-style-type: none;
   margin: 10px;
   cursor: pointer;
`

const Thumbnail = styled.img`
    width: 200px;
    border-radius: 10px;
    overflow: hidden;

`

const SubContainer = styled.div`    
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`

const TitleContainer = styled.div`    
    font-size: 15px;
    font-weight: bolder;
    height: 35px;
`

const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 35px;
    position: absolute;
    bottom: 39px;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0px 0px 10px 10px;

    span {
        opacity:1;
        font-weight: bold;
    }
`

export default Slot
