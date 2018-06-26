import create from './create'
import deleteUser from './delete'
import updatePassword from './updatePassword'

export default {
  updatePassword,
  create,
  delete: deleteUser,
}

