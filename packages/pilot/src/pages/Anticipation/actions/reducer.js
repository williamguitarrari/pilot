import {
  BULK_CONFIRMED,
  BULK_CREATED,
  BULK_DELETED,
  BULK_UPDATED,
} from '.'

const initialState = {
  bulkId: null,
}

export default function anticipationReducer (state = initialState, action) {
  switch (action.type) {
    case BULK_CREATED:
    case BULK_UPDATED: {
      return { bulkId: action.payload.bulkId }
    }

    case BULK_CONFIRMED:
    case BULK_DELETED: {
      return { bulkId: null }
    }

    default:
      return state
  }
}
