import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keyword' content={keywords}></meta>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Bem Vindo ao proshop',
    description: 'vendemos os melhores produtos nos melhores preços',
    keywords: 'eletronicos, compra, barato, preços'
}

export default Meta
