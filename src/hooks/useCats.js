import React, { useContext, useEffect, useState } from 'react'
import { helpHttp } from '../helpers/helpHttp'

const useCats = () => {
  const [catSerch, setCatSerch] = useState({ cat: '' })
  const [search, setSearch] = useState(null)
  const [resGatos, setResGatos] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setCatSerch({
      ...catSerch,
      [e.target.name]: e.target.value,
    })
  }
  const handleSearch = (data) => {
    //console.log(data);
    setSearch(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!catSerch) {
      alert('Datos Incompletos')
      return
    }

    handleSearch(catSerch)
    setCatSerch({ cat: '' })
  }

  useEffect(() => {
    if (search === null) return
    console.log(search)
    console.log(catSerch)

    const fetchData = async () => {
      let gatos = `https://catfact.ninja/facts?limit=${search.cat}`

      setLoading(true)

      const dataRes = await helpHttp().get(gatos)
      console.log(dataRes.data)

      setResGatos(dataRes.data)
      setLoading(false)
    }

    fetchData()
  }, [search])

  return {
    catSerch,
    handleChange,
    handleSubmit,
    resGatos,
    loading,
  }
}

export default useCats
