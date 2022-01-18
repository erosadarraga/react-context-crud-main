import React, { useContext, useEffect, useState } from 'react'
import { helpHttp } from '../helpers/helpHttp'

const useCats = () => {
  const [catSerch, setCatSerch] = useState({ cat: '' })
  const [search, setSearch] = useState(null)
  const [resGatos, setResGatos] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validacion, setValidacion] = useState(false)

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

    console.log(catSerch.cat)
    if (!catSerch) {
      alert('Datos Incompletos')
      return
    }

    handleSearch(parseInt(catSerch.cat, 10))
    setCatSerch({ cat: '' })
  }

  useEffect(() => {
    console.log(validacion)
    if (isNaN(search)) return setValidacion(true)
    setSearch(null)
    if (search === null) return

    const fetchData = async () => {
      let gatos = `https://catfact.ninja/facts?limit=${search}`

      setLoading(true)

      const dataRes = await helpHttp().get(gatos)
      console.log(dataRes.data)

      setResGatos(dataRes.data)
      setLoading(false)
      setValidacion(false)
    }

    fetchData()

    // console.log(search)
    // console.log(catSerch)
    console.log(validacion)
  }, [search])

  return {
    catSerch,
    handleChange,
    handleSubmit,
    resGatos,
    loading,
    validacion,
  }
}

export default useCats
