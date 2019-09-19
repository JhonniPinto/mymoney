import React, {Fragment, useState, useRef} from 'react'
import { Redirect } from 'react-router-dom'

const now = new Date()
const minYear = now.getFullYear()
const maxYear = (now.getFullYear() + 3)

const AddMonth = () => {
    const refYear = useRef()
    const refMonth = useRef()

    const [redir, setRedir] = useState('')

    const years = []
    for (let i = minYear; i <= maxYear; i++) years.push(i)

    const months = []
    const zeroPad = num => num < 10 ? '0' + num : num
    for (let i = 1; i <= 12; i++) months.push(i)

    const setMonth = () => setRedir(refYear.current.value + '-' + refMonth.current.value)

    if (redir !== '') return <Redirect to={`/movimentacoes/${redir}`} />

    return (        
        <Fragment>
            <h2 className='mb-4'>Adicionar Mês</h2>
            <div className='row justify-content-between'>
            <div className='form-group col-5'>
                <select ref={refYear} className='form-control' id='inYear'>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>
            <div className='form-group col-5'>
                <select ref={refMonth} className='form-control mb-3' id='inMonth'>
                    {months.map(zeroPad).map(month => <option key={month} value={month}>{month}</option>)}
                </select>
            </div>
            <div className='form-group col-2'>
                <button onClick={setMonth} className='btn btn-info'>Adicionar mês</button>
            </div>
            </div>
        </Fragment>
    )
}

export default AddMonth