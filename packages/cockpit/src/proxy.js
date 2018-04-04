import {
  complement,
  either,
  has,
  is,
} from 'ramda'

const isNotObject = either(
  complement(is(Object)),
  either(
    is(Function),
    is(Array)
  )
)

const getProxyHandler = fallback => ({
  get (target, key) {
    const hasKey = has(key)

    if (hasKey(target)) {
      const propInTarget = target[key]

      if (isNotObject(propInTarget)) {
        return propInTarget
      } else if (hasKey(fallback)) {
        return new Proxy(propInTarget, getProxyHandler(fallback[key]))
      }

      return propInTarget
    }
    if (hasKey(fallback)) {
      const propInFallback = fallback[key]
      if (isNotObject(propInFallback)) {
        return propInFallback
      }
      return new Proxy(propInFallback, getProxyHandler(propInFallback))
    }
    return undefined
  },
})

const proxy = cockpit => (client) => {
  const cockpitWithClient = cockpit(client)

  return new Proxy(cockpitWithClient, getProxyHandler(client))
}

export default proxy
