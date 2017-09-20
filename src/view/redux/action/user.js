import constActionType from '../constant/actionType'
import { showFlashMessage } from '../action/flashMessage'

const updateInfo = result => ({
  type: constActionType.UPDATE,
  result
})

const updateAvatar = result => ({
  type: constActionType.UPDATE_AVATAR,
  result
})

const updateSuccess = () => ({
  message: '更新成功',
  type: 'success'
})

const updateFail = error => ({
  message: error,
  type: 'error'
})

/**
 * Update user info.
 *
 * @param {Object} [data] Info input by user, such as account and pwd.
 * @param {Function} [dispatch] Redux dispatch function.
 * @param {Function} [getState] Redux getState function.
 * @param {Object} [util] Redux middleware, such as fetch.
 * @returns {Object} Data responsed from server, for example:
 *   ```js
 *   {
 *     "_id" : "59abc62fa605eea39a2e25fd",
 *     "phoneNumber" : "18262608001",
 *     "name" : "",
 *     "gender" : "x",
 *     "bio" : "",
 *     "avatar" : "default_avatar.jpg"
 *   }
 *   ```
 * @public
 */
export const update = data => async (dispatch, getState, util) => {
  try {
    let result = await util.api.updateUserInfo(data)
    if (result.code === -1) {
      dispatch(showFlashMessage(updateFail(result.message)))
    } else {
      dispatch(updateInfo(result))
      dispatch(showFlashMessage(updateSuccess()))
    }
    return result
  } catch (e) {
    console.error(e)
  }
}

/**
 * Update after user update avatar.
 *
 * @public
 */
export const updateAfterUpload = data => dispatch => {
  data && dispatch(updateAvatar(data))
}