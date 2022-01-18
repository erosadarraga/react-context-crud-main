import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'
import useCats from '../hooks/useCats'

const TaskList = () => {
  const { tasks, deleteTask, toggleTaskDone } = useContext(GlobalContext)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col items-center">
      <Link
        flex
        items-center
        mb-10
        to="/cats"
        className="bg-gray-700 hover:bg-gray-600 py-2 px-4 m-2 rounded"
      >
        <h5 className="text-gray-100 font-bold text-2xl">Random cats</h5>
      </Link>
      {tasks.length > 0 ? (
        <div className="w-6/12  justify-center ">
          {tasks.length > 1 && (
            <div className="flex-grow text-right px-4 py-2 m-2 flex  justify-center  ">
              <input
                type="text"
                placeholder="Filtrar"
                onChange={(event) => setSearchTerm(event.target.value)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              ></input>
            </div>
          )}

          <div className="flex-grow text-right px-4 py-2 m-2 flex  justify-center  "></div>

          {tasks
            .filter((task) => {
              if (searchTerm == '') {
                return task
              } else if (
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return task
              }
            })
            .map((task) => (
              <div
                className="bg-gray-700  px-10 py-2 text-white shadow-lg mb-2 flex flex-wrap  justify-between"
                key={task.id}
              >
                <div className="text-left mb-8 items-center ">
                  <h1 className="text-2xl uppercase">{task.title}</h1>

                  <p>{task.description}</p>
                  <button
                    className="bg-purple-600 hover:bg-purple-500 py-1 px-3 mt-2 "
                    className={
                      !task.done
                        ? 'bg-pink-600 hover:bg-pink-500 py-1 px-3 mt-2 '
                        : 'bg-green-600 hover:bg-green-500 py-1 px-3 mt-2  '
                    }
                    onClick={() => toggleTaskDone(task.id)}
                  >
                    {task.done ? 'Hecho' : 'Pendiente'}
                  </button>
                </div>
                <div className=" items-center">
                  <Link
                    to={`/edit/${task.id}`}
                    className="bg-gray-600 hover:bg-gray-500 py-2 px-4 mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="bg-red-600 hover:bg-red-500 py-2 px-4 mr-2 "
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="bg-gray-600 text-gray-100 py-5 px-10 flex">
          No Hay Actividad
        </p>
      )}
    </div>
  )
}

export default TaskList
