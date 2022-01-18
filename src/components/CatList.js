import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCats from '../hooks/useCats'
import { ListCats } from './ListCats'
import TaskList from './TaskList'

const Catlist = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { catSerch, handleChange, handleSubmit, resGatos, loading } = useCats()

  return (
    <div className="flex justify-center">
      <div className="w-6/12">
        <div className="flex-grow text-right px-4 py-2 m-2 flex justify-between">
          <input
            type="text"
            placeholder="Filtrar"
            onChange={(event) => setSearchTerm(event.target.value)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          ></input>
          <div className="flex-grow text-right px-4 py-2 m-2 flex justify-between"></div>
          <input
            type="text"
            name="cat"
            value={catSerch.cat}
            placeholder="Cantidad de frases"
            onChange={handleChange}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          ></input>

          <button
            className="bg-gray-700  hover:bg-gray-600 py-2 px-4 m-2"
            onClick={handleSubmit}
          >
            fraces
          </button>
        </div>

        {loading && (
          <div>
            <div className=" inline-block w-8 h-8   m-12" role="status">
              <svg
                className="animate-spin h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25 fonzi "
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        )}
        {resGatos &&
          resGatos
            .filter((g) => {
              if (searchTerm == '') {
                return g
              } else if (
                g.fact.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return g
              }
            })
            .map((g) => <ListCats g={g} />)}
      </div>
    </div>
  )
}

export default Catlist
