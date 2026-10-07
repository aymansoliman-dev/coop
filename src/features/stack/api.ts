export async function fetchStackCatalog() {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }
, 5000)

  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json`, {
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error('Failed to fetch stack catalog!')
    }

    clearTimeout(timeoutId)

    const data = await response.json() as Array<{
      name: string
      color?: string
      versions?: {
        svg?: string[]
      }
    }>

    return data
      .filter((icon) => icon.versions?.svg?.includes("original"))
      .map((icon) => ({
        name: icon.name,
      }))
  }
  catch(err) {
    throw err
  }
  finally {
    clearTimeout(timeoutId)
  }
}

export async function fetchProjectStack(projectId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/stack`, {
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

type StackUpdate = {
  name: string
}

type UpdateProjectStackResponse = {
  message?: string
}

export async function updateProjectStack(
  projectId: string,
  stack: StackUpdate[],
): Promise<UpdateProjectStackResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 5000)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stacks/${projectId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(stack),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const responseText = await response.text()
    let data: UpdateProjectStackResponse & { error?: string } = {}

    if (responseText) {
      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error(
          `Failed to update project stack (${response.status}): ${responseText.slice(0, 200)}`
        )
      }
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `Failed to update project stack (${response.status})`)
    }

    return data
  }
  catch(err) {
    clearTimeout(timeoutId)
    throw err
  }
}