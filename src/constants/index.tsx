export const AUTH_CODE = 'AUTH_CODE'
export const AUTH_TOKEN = 'AUTH_TOKEN'
export const TASK_KEY = 'TASK_KEY'
export const HISTORY_KEY = 'HISTORY_KEY'

export const PHOTO_DEFAULT_ACTION_DATA = {
  type: '',
  payload: {},
}

export const PHOTO_DEFAULT_PAYLOAD = {
  scale: '2',
  prompt: '',
  mask: null,
  light: 'None',
  canvas: null,
  position: {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  },
  descript: '',
  model: 'luma',
  ratio: 0,
  label: '1:1',
  character: 'Haute Couture Illustration',
  images: [],
  srcLang: 'auto',
  tgtLang: '',
  protectLang: false,
}