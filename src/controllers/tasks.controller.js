
export const getAllTasks = (req, res) => {
	res.send('obteniendo tareas')
}

export const getTask = (req, res) => {
	res.send('obteniendo tarea unica')
}

export const createTask = (req, res) => {
	const {id} = req.params
	res.send('creando tareas')
}

export const updateTask = (req, res) => {
	res.send('modificando tarea')
}

export const deleteTask = (req, res) => {
	res.send('eliminando tarea')
}