import React, { Fragment, FunctionComponent, useState } from 'react'
import styled from 'styled-components'

interface PageProps {
    data: string,
    filterByCategory: Function
    selected: boolean
}

const Checkbox: FunctionComponent<PageProps> = ({data, filterByCategory, selected}) => { 

    const [checked, setChecked] = useState<boolean>(selected)

    const checkCategory = (category: string) => {

        setChecked(!checked)

        filterByCategory(category, !checked)
    }

    return (
        <Fragment>
            <LabelContainer>
                <InputContainer
                    name={data}
                    type="checkbox"
                    checked={checked}
                    onChange={() => checkCategory(data)}
                    />
                {data}
            </LabelContainer>
        </Fragment>
    )
}

const LabelContainer = styled.label`    
  display: flex;
`

const InputContainer = styled.input`    
   margin-right: 10px;
`


export default Checkbox
