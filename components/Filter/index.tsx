import React, { Fragment, FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import Checkbox from '../Checkbox'

interface PageProps {
  data: string[],
  filterByCategory: Function
}

const Filter: FunctionComponent<PageProps> = ({data, filterByCategory}) => { 

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
                      filterByCategory={filterByCategory}/>
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
  align-items: center;
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
  border: 1px solid rgba(0,0,0,0.2);
`

export default Filter
