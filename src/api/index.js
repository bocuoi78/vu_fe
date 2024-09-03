import * as Student from './student'
import * as Authentication from './Authentication'
import * as Order from './Order'

export default {
    ...Student,
    ...Authentication,
    ...Order,
}