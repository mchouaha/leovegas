import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { searchContext } from '../../context'
import { Game } from '../../interfaces'
import Filter from '../Filter'
import Slot from '../Slot'
import { forceVisible } from 'react-lazyload';

interface PageProps {
    data: Game[]
}

const ListSlots: FunctionComponent<PageProps> = ({data}) => {
    
    const [listSlot, setListSlot] = useState<Game[]>([])
    const [listCategory, setListCategory] = useState<string[]>([])
    const [listcategorySelected, setListCategorySelected] = useState<string[]>([])

    const {searchName} = useContext(searchContext)

    const filterByCategory = (category: string, checked: boolean) => {
    
        let listCategorySelectedClone: string[] = [...[], ...listcategorySelected]

        if (checked) {
            listCategorySelectedClone.push(category)
        } else {
            listCategorySelectedClone = listCategorySelectedClone.filter(item => item !== category)
        }

        setListCategorySelected(listCategorySelectedClone)
        
        forceVisible()
    }
    
    const filterByName = (searchName: string) => {

        if (searchName.length) {
           
            const listSlotFiltered = listSlot.filter((slot: Game) => { 
                return slot.gameName.toLowerCase().includes(searchName.toLowerCase())
            })

            setListSlot(listSlotFiltered)

            forceVisible()
        } else {
            setListSlot(data)
        }       
    }

    useEffect(() => {
        
        setListSlot(data)

        let list: string[] = []

        data.map( (slot: Game) => {
            list = [...new Set([...list ,...slot.categories])]
        })

        setListCategory(list)
    }, [])

    useEffect(() => {

        if (!listcategorySelected.length) {
            setListSlot(data)
            return;
        }

        const listSlotFiltered = data.filter( (slot: Game) => {
            
            if (listcategorySelected.length === slot.categories.length) {
                return listcategorySelected.every(categorySelected => slot.categories.includes(categorySelected))
            } 
        })
        setListSlot(listSlotFiltered)
    
    }, [listcategorySelected])

    useEffect(() => {
        filterByName(searchName)
    }, [searchName])

    return (
        <Fragment>
            <ContainerGames>
                <h2 style={{flexGrow: 1}}>Top Games:</h2>
                <h2 style={{flexGrow: 1, textAlign: "right"}}>{listSlot.length} Games </h2>
            </ContainerGames>
            <Filter data={listCategory} listcategorySelected ={listcategorySelected} filterByCategory={filterByCategory}/>
            <ListSlotContainer>
                    {listSlot.map((slot:Game) => (
                        <Slot key={slot.gameName} data={slot}/>
                    ))}
            </ListSlotContainer>
          
        </Fragment>
    )
}


const ContainerGames = styled.div`
    display: flex;

`


const ListSlotContainer = styled.ul`
    display: flex;
    flex-flow: row wrap;
`

export default ListSlots
