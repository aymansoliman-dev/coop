export async function fetchTasks(projectId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/tasks`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project!')
    }

    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}

export async function addTask(projectId: string, taskData: any) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(taskData),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to add task!')
    }

    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}

export async function deleteTask(taskId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete task!')
    }
    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}