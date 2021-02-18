import { useRouter } from 'next/router'
import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { searchContext } from '../../context'

const Search: FunctionComponent = () => {

  const  {setSearchName }  = useContext(searchContext)
  
  const { asPath } = useRouter()

  const [showSearch, setShowSearch] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    
    const { value } = event.target

    setSearchName(value)
  }

  useEffect(() => {
    if(asPath === "/slot") {
      setShowSearch(false)
    }
  }, [asPath])

  return (
    <Fragment>
      {showSearch ?
        <form>
        <LabelContainer>
          <span>Search:</span>
          <InputContainer 
            type="text" 
            name="search"
            placeholder="enter game name..."
            onChange={handleChange} />
        </LabelContainer>
        </form> : ''
      }
      
    </Fragment>
  )
}

const LabelContainer = styled.label`
  span {
    font-weight: bold;
    font-size: 15px;
  }
`

const InputContainer = styled.input`
  margin-left: 10px;
`

export default Search
