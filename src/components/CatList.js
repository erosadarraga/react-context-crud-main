import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCats from '../hooks/useCats'
import { ListCats } from './ListCats'
import TaskList from './TaskList'

const Catlist = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    catSerch,
    handleChange,
    handleSubmit,
    resGatos,
    loading,
    validacion,
    validacionInput,
  } = useCats()

  console.log(catSerch.cat)

  return (
    <div className=" flex flex-col items-center flex-wrap ">
      <Link
        flex
        items-center
        mb-10
        to="/"
        className="bg-gray-700 hover:bg-gray-600 py-2 px-4 m-2 rounded"
      >
        <h5 className="text-gray-100 font-bold text-2xl ">Tareas</h5>
      </Link>
      <div className="w-8/12">
        <div className="flex-grow flex-wrap text-right px-4 py-2 m-2 flex justify-between">
          <div className=" px-4 py-2 m-2 ">
            {resGatos && resGatos.length > 1 && (
              <input
                type="text"
                placeholder="Filtrar"
                onChange={(event) => setSearchTerm(event.target.value)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              ></input>
            )}
          </div>
          <div className="flex-grow text-right px-4 py-2 m-2 flex justify-between"></div>

          <div className=" px-4 py-2 m-2 ">
            <input
              type="text"
              name="cat"
              value={catSerch.cat}
              placeholder="Cantidad de frases"
              onChange={handleChange}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
            ></input>
            {validacion && (
              <div
                class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
                role="alert"
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                </svg>
                <p>Solo se aceptan numeros</p>
              </div>
            )}
            {validacionInput && !validacion && (
              <div
                class="flex items-center bg-blue-500 text-white text-sm font-bold rounded-2xl "
                role="alert"
              >
                <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                  New
                </span>
                <span class="font-semibold mr-2 text-left flex-auto">
                  Get the coolest
                </span>
                <svg
                  class="fill-current opacity-75 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </div>
            )}
          </div>

          <button
            className="bg-gray-700  hover:bg-gray-600 py-2 px-4 m-2"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
        <div></div>
        <div className="flex-grow text-right px-4 py-2 m-2 flex  justify-center  "></div>

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
