/* eslint-disable no-undef */
import hasProperty from './hasProperty'

/**
 * Add tags do zoopim chat
 *
 * @param {array} tags array of tags to add
 */
export const zopimAddTags = (tags) => {
  if (hasProperty(window.$zopim)) {
    window.$zopim(() => {
      window.$zopim.livechat.addTags(...tags)
    })
  }
}

/**
 * Clear all zopim current user data
 */
export const zopimClearAll = () => {
  if (hasProperty(window.$zopim)) {
    window.$zopim(() => {
      window.$zopim.livechat.clearAll()
    })
  }
}

