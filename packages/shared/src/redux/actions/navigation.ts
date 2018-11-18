import { ModalPayload } from '../../types'
import { createAction } from '../../utils/helpers/redux'

export function pushModal(payload: ModalPayload) {
  return createAction('PUSH_MODAL', payload)
}

export function replaceModal(payload: ModalPayload) {
  return createAction('REPLACE_MODAL', payload)
}

export function popModal() {
  return createAction('POP_MODAL')
}

export function closeAllModals() {
  return createAction('CLOSE_ALL_MODALS')
}
