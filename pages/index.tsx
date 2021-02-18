import React, { FunctionComponent } from 'react'
import Layout from '../components/Layout'
import ListSlot from '../components/ListSlot'
import { Game } from '../interfaces'

interface PageProps {
  data: Game[]
}

const IndexPage: FunctionComponent<PageProps> = ({data}) => (
  <Layout title="Home">
    <ListSlot data={data}/>
  </Layout>
)

export async function getStaticProps() {
  const res = await fetch(`https://www.mocky.io/v2/5da99f9f31000036004e0a4e`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    }
  }
}

export default IndexPage
