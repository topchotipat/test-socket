/* eslint-disable */

import helloWorldLib from '../../../libraries/helloWorldLib'

describe('helloWorld', () => {
  it('should return hello-world', () => {
    const hw = helloWorldLib('hello-world')
    expect(hw).toBe('hello-world')
  })
})
