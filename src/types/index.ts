export type Status = 'Wait' | 'Ready' | 'Pending' | 'Done' | 'Finish' | 'Error'

export interface Tool {
  id: number
  name: string
  icon: string
  title: string
  desc: string
}

export interface Action {
  type: string
  payload: any
}

export interface History {
  id: number
  tool: Tool
  src: string
  action: any
  base64: string
  result: string
  video: string
  text: string
}