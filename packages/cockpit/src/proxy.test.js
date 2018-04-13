import proxy from './proxy'

describe('proxy', () => {
  it('should return a function when passing a target', () => {
    const target = () => ({
      math: {
        add: () => {},
      },
    })

    const tobeProxied = proxy(target)
    expect(typeof tobeProxied).toEqual('function')
  })

  it('should return a object when the target is proxied with a fallback', () => {
    const target = () => ({
      math: {
        add: () => {},
      },
    })

    const fallback = {
      math: {
        sub: () => {},
      },
    }
    const proxied = proxy(target)(fallback)
    expect(typeof proxied).toEqual('object')
  })

  it('should return a function when the function exists in the target', () => {
    const target = () => ({
      math: {
        add: () => 'add',
      },
    })

    const fallback = {
      math: {
        sub: () => {},
      },
    }
    const proxied = proxy(target)(fallback)
    expect(proxied.math.add()).toEqual(target().math.add())
  })

  it('should return a function when the function doesnt exists in the target but exists in fallback', () => {
    const target = () => ({
      math: {
        add: () => {},
      },
    })

    const fallback = {
      math: {
        sub: () => 'sub',
      },
    }
    const proxied = proxy(target)(fallback)
    expect(proxied.math.sub()).toEqual(fallback.math.sub())
  })

  it('should return a undefined when the prop doesnt exists in target or fallback', () => {
    const target = () => ({
      math: {
        add: () => {},
      },
    })

    const fallback = {
      math: {
        sub: () => {},
      },
    }
    const proxied = proxy(target)(fallback)
    expect(proxied.something).toEqual(undefined)
  })
})
