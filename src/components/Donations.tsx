import { useEffect, useState } from 'react'
import { useGetDonations, useGetStatuses } from '../hooks/getData'
import { useNavigate } from 'react-router-dom';

export interface DonationProp {
    id: string,
    name: string
}

export interface Donation {
    id: string,
    reference: {
        type: {
            id: string,
            prefix: string
        },
        number: number,
        text: string
    },
    name: string,
    location: DonationProp,
    theme: DonationProp,
    price: {
        currency: {
            id: string,
            symbol: string
        },
        amount: number,
        text: string
    },
    status: DonationProp
}

export default function Donations() {
    const { donations, loading } = useGetDonations()
    const [filteredDonations, setFilteredDonations] = useState(donations)
    const [status, setStatus] = useState('All')
    const statuses = useGetStatuses()
    const navigate = useNavigate()


    useEffect(() => {
        if (status === 'All') {
            setFilteredDonations(donations)
        } else {
            setFilteredDonations(donations.filter((donation: Donation) => donation.status.id === status))
        }
    }, [status, donations])

    return (
        <div className='container'>
            <div className='d-flex flex-row justify-content-between p-4'>
                <select className='form-select w-25' defaultValue={'All'} onChange={(e) => setStatus(e.target.value)}>
                    <option value={'All'}>All</option>
                    {statuses.map((status: DonationProp) => {
                        return (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        )
                    })}
                </select>
                <button onClick={() => navigate('/new')} className='btn btn-primary w-25'>Add new</button>
            </div>
            <ul className='list-group mt-2'>
                <li className='d-flex flex-row justify-content-between list-group-item active'>
                    <span className='p-2 col-2'>Name</span>
                    <span className='p-2 col-2'>Reference</span>
                    <span className='p-2 col-2'>Price</span>
                    <span className='p-2 col-2'>Status</span>
                    <span className='p-2 col-2'>Location</span>
                    <span className='p-2 col-2'>Theme</span>
                </li>
                {loading ? <li className="d-flex flex-row justify-content-center list-group-item p-'">
                    <div className="spinner-border spinner-border-sm"></div>
                </li> :
                    filteredDonations.length ?
                        filteredDonations.map((donation: Donation, index) => {
                            return (
                                <li key={index} className='d-flex flex-row justify-content-between list-group-item'>
                                    <span className='p-2 col-2'>{donation.name}</span>
                                    <span className='p-2 col-2'>{donation.reference.text}</span>
                                    <span className='p-2 col-2'>{donation.price && donation.price.text}</span>
                                    <span 
                                    className={`p-2 col-2 
                                    ${donation.status.name === 'Active' ? 'text-success' : ''} 
                                    ${donation.status.name === 'Inactive' ? 'text-danger' : ''}
                                    ${donation.status.name === 'Awaiting Approval' ? 'text-warning' : ''}`}>{donation.status.name}</span>
                                    <span className='p-2 col-2'>{donation.location.name}</span>
                                    <span className='p-2 col-2'>{donation.theme.name}</span>
                                </li>
                            )
                        }) :
                        <li className='list-group-item'>No donations to show</li>
                }
            </ul>

        </div>
    )
}