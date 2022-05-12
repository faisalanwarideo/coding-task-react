import { useEffect, useState } from 'react'
import axios from 'axios'
import { Donation, DonationProp } from '../components/Donations'

export const useGetDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    async function getDonations() {
      try {
        const { data } = await axios.get(`https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all`)
        setDonations(data)
      } catch (error) {
        console.log((error as Error).message)
      }
    }
    getDonations()
  }, [])

  return donations
}

export const useGetLocations = () => {
  const [locations, setLocations] = useState<DonationProp[]>([])

  useEffect(() => {
    async function getLocations() {
      try {
        const { data } = await axios.get(`https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/locations`)
        setLocations(data)
      } catch (error) {
        console.log((error as Error).message)
      }
    }
    getLocations()
  }, [])

  return locations
}

export const useGetThemes = () => {
  const [themes, setThemes] = useState<DonationProp[]>([])

  useEffect(() => {
    async function getThemes() {
      try {
        const { data } = await axios.get(`https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/themes`)
        setThemes(data)
      } catch (error) {
        console.log((error as Error).message)
      }
    }
    getThemes()
  }, [])

  return themes
}

export const useGetStatuses = () => {
  const [themes, setStatuses] = useState<DonationProp[]>([])

  useEffect(() => {
    async function getStatuses() {
      try {
        const { data } = await axios.get(`https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/statuses`)
        setStatuses(data)
      } catch (error) {
        console.log((error as Error).message)
      }
    }
    getStatuses()
  }, [])

  return themes
}
