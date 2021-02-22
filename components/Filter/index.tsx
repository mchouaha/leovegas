import React, { Fragment, FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import Checkbox from '../Checkbox'

interface PageProps {
  data: string[],
  filterByCategory: Function
  listcategorySelected: string[]
}

const Filter: FunctionComponent<PageProps> = ({data, filterByCategory, listcategorySelected}) => { 

  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <Fragment>
        <FilterContainer>
          <FilterButton onClick={ () => setShowFilter(!showFilter)}>Filter By Category:</FilterButton>
          {showFilter ? 
            <FilterMenu>
              <form>
                {data.map( (category: string) => 
                    <Checkbox 
                      key={category} 
                      data={category}
                      filterByCategory={filterByCategory}
                      selected={listcategorySelected.some((categorySelected) => category.indexOf(categorySelected) !== -1)}/>
                )}
              </form>
            </FilterMenu> : ''}
        </FilterContainer> 
    </Fragment>
  )
}

const FilterContainer = styled.div` 
  display: flex;
  flex-direction: column;
`

const FilterButton = styled.div`    
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
   text-decoration: underline;
  }
`

const FilterMenu = styled.div`    
  width: auto;
  margin-top:5px;
  padding: 5px 10px;
`

export default Filter
