import React, {useState} from 'react'

import Rest from '../utils/rest'

const baseURL = 'https://mymoney-jp.firebaseio.com/'

const { useGet , usePost, useDelete, usePatch } = Rest(baseURL)

const FinancialMovements = ({ match }) => {
    const [form, setForm] = useState({descricao: '', valor: ''})
    const [change, setChange] = useState({inputForecast: false, exitForecast: false})
    
    const dataMonth = useGet(`meses/${match.params.date}`)
    const [, patch] = usePatch(`meses/${match.params.date}`)
    const data = useGet(`movimentacoes/${match.params.date}`)
    const [, post] = usePost(`movimentacoes/${match.params.date}`)
    const [, remove] = useDelete(`movimentacoes/${match.params.date}/`)

    const onChangeDescription = e => setForm({...form, descricao: e.target.value})
    const onChangeValue = e => setForm({...form, valor: e.target.value})
    const saveMovement = async() => {
        if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await post({descricao: form.descricao, valor: parseFloat(form.valor)})
            setForm({descricao: '', valor: 0})
            data.refetch()
            setTimeout(() => dataMonth.refetch(), 1000)
        } 
    }
    const removeMovement = async(id) => {
        await remove(id)
        data.refetch()
        setTimeout(() => dataMonth.refetch(), 1000)
    }
    const setInputForecast = (e) => {
        patch({previsao_entrada: e.target.value})
        setChange({...change, inputForecast: false})
        setTimeout(() => dataMonth.refetch(), 1000)
    }
    const setExitForecast = (e) => {
        patch({previsao_saida: e.target.value})
        setChange({...change, exitForecast: false})
        setTimeout(() => dataMonth.refetch(), 1000)
    }
    return (
        <div className='container'>
            <div className='row align-items-center justify-content-between mb-4'>
                <h2 className='mb-4 col-6'>Movimentações {match.params.date}</h2>
                {!dataMonth.loading && (
                    <table className='col-5 pt-3 table table-sm table-striped'>
                        <tbody> 
                            <tr>
                                <td>Previsão de entrada (R$):</td>
                                <td className='text-center'>
                                    {!change.inputForecast 
                                        ? <button onClick={() => setChange({...change, inputForecast: true })} className='btn btn-info py-0' title='Alterar previsão de entrada'>{dataMonth.data.previsao_entrada ? dataMonth.data.previsao_entrada : 0}</button> 
                                            : <input className='text-center' onBlur={setInputForecast} type='text' autoFocus />}
                                </td>
                            </tr>
                            <tr>
                                <td>Entrada (R$):</td>
                                <td className='text-center'>{dataMonth.data ? dataMonth.data.entradas : 0}</td>
                            </tr>
                            <tr>
                                <td>Previsão de saída (R$):</td>
                                <td className='text-center'>
                                    {!change.exitForecast 
                                        ? <button onClick={() => setChange({...change, exitForecast: true })} className='btn btn-info py-0' title='Alterar previsão de saída'>{dataMonth.data.previsao_saida ? dataMonth.data.previsao_saida : 0}</button> 
                                            : <input className='text-center' onBlur={setExitForecast} type='text' autoFocus />}
                                </td>
                            </tr>
                            <tr>
                                <td>Saída (R$):</td>
                                <td className='text-center'>{dataMonth.data ? dataMonth.data.saidas : 0}</td>
                            </tr>
                            <tr >
                                <td>Saldo (R$):</td>
                                <td className='text-center'>{dataMonth.data ? dataMonth.data.entradas - dataMonth.data.saidas : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            {data.loading && <span>Carregando...</span>}
            {!data.loading && (
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Movimentação</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.data &&
                            Object
                                .keys(data.data)
                                .map((mov, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{mov}</td>
                                            <td>{data.data[mov].descricao}</td>
                                            <td>{data.data[mov].valor.toFixed(2)}</td>
                                            <td><button onClick={() => removeMovement(mov)} className='btn btn-danger' title='Excluir'>&#10005;</button></td>
                                        </tr>
                                    )
                                })
                        }
                        <tr>
                            <td className='text-secondary'>Adicione uma movimentação</td>
                            <td><input onChange={onChangeDescription} value={form.descricao} type='text' className='form-control' placeholder='Digite a descrição' /></td>
                            <td><input onChange={onChangeValue} value={form.valor} type='text' className='form-control' placeholder='Digite o valor' /></td>
                            <td><button className='btn btn-success' onClick={saveMovement} title='Salvar'>&#10003;</button></td>
                        </tr>
                    </tbody>
                </table>
                )}
        </div>
    )
}

export default FinancialMovements