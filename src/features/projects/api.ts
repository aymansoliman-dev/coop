export async function fetchProjectsList() {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/list`, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed!')
      }

      return data
    }
    catch(err) {
      clearTimeout(timeoutId)
      throw err
    }
}

export async function fetchProjectById(projectId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const projectPath = `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}`

    const fetchEndpoint = async (path: string) => {
      const response = await fetch(`${projectPath}${path}`, {
        headers,
        signal: controller.signal
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch project${path}`)
      }

      return data
    }

    const [project, collaborators, tasks, stacks, assets] = await Promise.all([
      fetchEndpoint(''),
      fetchEndpoint('/collaborators'),
      fetchEndpoint('/tasks'),
      fetchEndpoint('/stacks'),
      fetchEndpoint('/assets')
    ])

    return {
      ...project,
      collaborators,
      tasks,
      stacks,
      assets
    }
  } catch (err) {
      clearTimeout(timeoutId)
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}