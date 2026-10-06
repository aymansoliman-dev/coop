export type Project = {
  id: string
  name: string
  statement?: string | null
  theme?: string
  private?: boolean
  logo?: string | null
}

export type ProjectUpdate = Partial<{
  name: string
  statement: string | null
  theme: string
  private: boolean
}>