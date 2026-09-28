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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
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

export async function createNewProject({ name, privacy, logo, project_statement }: { name: string, privacy: string, logo: File | null, project_statement: string | null }) {
  if (!name || !['Public', 'Private'].includes(privacy)) {
    throw new Error('Project name and privacy are required!')
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 10000)

  const body = new FormData()
  body.append('name', name)
  body.append('privacy', privacy)
  if (logo) body.append('logo', logo)
  if (project_statement) body.append('project_statement', project_statement)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create project!')
    }
    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}

export async function deleteProject(projectId: string) {
  if (!projectId) {
    throw new Error('Project ID is required!')
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete project!')
    }

    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}