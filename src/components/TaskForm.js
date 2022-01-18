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
