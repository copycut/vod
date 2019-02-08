import {Location} from 'vue-router'

export default function(
  to: Location,
  _from: Location,
  savedPosition: any
): any {
  if (to.hash) {
    return {selector: to.hash, offset: {x: 0, y: 0}}
  } else if (savedPosition) {
    return savedPosition
  }
  return {x: 0, y: 0}
}
