import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

const TaskForm = () => {
  const [task, setTask] = useState({
    id: '',
    title: '',
  })

  const [validacion, setValidacion] = useState(false)
  const { addTask, updateTask, tasks } = useContext(GlobalContext)

  const navigate = useNavigate()
  const params = useParams()

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(task)
    if (task.title.length < 1) return setValidacion(true)
    if (!task.id) {
      addTask(task)
    } else {
      updateTask(task)
    }
    navigate('/')
  }

  useEffect(() => {
    const taskFound = tasks.find((task) => task.id === params.id)
    if (taskFound) {
      setTask({
        id: taskFound.id,
        title: taskFound.title,
        description: taskFound.description,
      })
    }
  }, [params.id, tasks])

  return (
    <div className="flex justify-center items-center h-3/4">
      <form onSubmit={handleSubmit} className="bg-gray-700  p-10">
        <h2 className="text-3xl mb-7">
          {task.id ? 'Actualizar ' : 'Crear '}Una Actividad
        </h2>
        <div className="mb-5">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Escribe una actividad"
            className="py-3 px-4 focus:outline-none focus:text-gray-200 bg-gray-600  w-full"
            autoFocus
          />
        </div>
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
            <p>Escribe una actividad</p>
          </div>
        )}
        <div className="mb-5">
          <button className="bg-gray-600 w-full hover:bg-gray-500 py-2 px-4 mt-5">
            {task.id ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
