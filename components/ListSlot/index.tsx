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
    const [ListcategorySelected, setListCategorySelected] = useState<string[]>([])

    const {searchName} = useContext(searchContext)

    const filterByCategory = (category: string, checked: boolean) => {
    
        let listCategorySelectedClone: string[] = [...[], ...ListcategorySelected]

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

        const listSlotFiltered = data.filter( (slot: Game) => {
            
            if (ListcategorySelected.length) {
                return ListcategorySelected.some((categorySelected) => slot.categories.indexOf(categorySelected) !== -1)
            } else {
                return slot
            }
        })

        setListSlot(listSlotFiltered)

    }, [ListcategorySelected])

    useEffect(() => {
        filterByName(searchName)
    }, [searchName])

    return (
        <Fragment>
            <h2>Top Games: </h2>
            <Filter data={listCategory} filterByCategory={filterByCategory}/>
            <ListSlotContainer>
                    {listSlot.map((slot:Game) => (
                        <Slot key={slot.gameName} data={slot}/>
                    ))}
                </ListSlotContainer>
        </Fragment>
    )
}

const ListSlotContainer = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
`

export default ListSlots
