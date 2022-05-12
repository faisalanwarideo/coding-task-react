import axios from 'axios';
import { useState } from 'react';
import { useGetDonations, useGetLocations, useGetThemes } from '../hooks/getData';
import { useNavigate } from 'react-router-dom';
import { DonationProp } from './Donations';

interface DonationBody {
  name: string,
  location: string,
  theme: string,
  price?: object
}

export default function CreateDonation() {
  const names = useGetDonations().donations.map((donation) => donation.name)
  const locations = useGetLocations()
  const themes = useGetThemes()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('default')
  const [theme, setTheme] = useState('default')
  const [error, setError] = useState('')
  const [price, setPrice] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Name is Required')
      return
    } else if (name.length < 1 || name.length > 200) {
      setError('Name should be between 1 to 200 characters')
    } else if (names.indexOf(name) > -1) {
      setError('Name already exists')
      return
    } else if (!location) {
      setError('Please select a location')
      return
    } else if (!theme) {
      setError('Please select a theme')
      return
    } else if (price && isNaN(price)) {
      setError('Price should be a number')
      return
    } else if (price < 0) {
      setError('Price should be a positive number')
      return
    }

    const body: DonationBody = {
      name,
      theme,
      location
    }

    if (price) {
      body.price = {
        amount: price,
        currencyCode: 'GBP'
      }
    }
    setSubmitting(true)
    axios.post(`https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems`, body).then((response) => {
      if (response.status === 200) {
        navigate('/')
      }
      setSubmitting(false)
    }).catch(err => {
      setError(err.message)
      setSubmitting(false)
    })

  }

  return (
    <div className='container justify-content-center d-flex'>
      <form onSubmit={(e) => submitForm(e)} className='card p-4 m-5'>
        <div className='form-group'>
          <input className='form-control mt-2' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
          <small id="emailHelp" className="form-text text-muted">Name should be unique and between 1 and 200 characters</small>
        </div>
        <div className='form-group'>
          <select value={location} className='form-select mt-2' onChange={(e) => setLocation(e.target.value)}>
            <option value={'default'} disabled>Select Location</option>
            {locations.map((location: DonationProp) => {
              return (
                <option key={location.id} value={location.id}>{location.name}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <select value={theme} className='form-select mt-2' onChange={(e) => setTheme(e.target.value)}>
            <option value={'default'} disabled>Select Theme</option>
            {themes.map((theme: DonationProp) => {
              return (
                <option key={theme.id} value={theme.id}>{theme.name}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <input className='form-control mt-2' placeholder='Price' value={price} onChange={(e) => {
            !isNaN(Number(e.target.value)) && setPrice(Number(e.target.value))
          }}></input>
          <small id="emailHelp" className="form-text text-muted">Price should be a number greater than 0</small>
        </div>


        <button type='submit' className='btn btn-primary mt-2'>{submitting ? <div className="spinner-border-sm"></div> : 'Submit'}</button>
        <span className='text-danger'>{error}</span>
      </form>
    </div>
  )
}