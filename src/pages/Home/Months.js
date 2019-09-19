import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Rest from '../../utils/rest'

const baseURL = 'https://mymoney-jp.firebaseio.com/'

const { useGet } = Rest(baseURL)

const Months = () => {
    const data = useGet('meses')
    return (
        <Fragment>
            {data.loading && <span>Carregando...</span>}
            {!data.loading && (
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Mês</th>
                            <th>Previsão de entrada</th>
                            <th>Entrada</th>
                            <th>Previsão de saida</th>
                            <th>Saida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object
                                .keys(data.data)
                                .map((mes, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Link to={`/movimentacoes/${mes}`} title='Acessar mês'>{mes}</Link></td>
                                            <td>{data.data[mes].previsao_entrada ? data.data[mes].previsao_entrada : 0}</td>
                                            <td>{!data.data[mes].entradas ? '0' : data.data[mes].entradas}</td>
                                            <td>{data.data[mes].previsao_saida ? data.data[mes].previsao_saida : 0}</td>
                                            <td>{!data.data[mes].saidas ? '0' : data.data[mes].saidas}</td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            )}
        </Fragment>
    )
}

export default Months