import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.less'

class Input extends Component {
  /**
   * @public
   * @name this.refs.input.focus
   * @description 同 HTMLInputElement.focus()
   */
  focus () {
    this.refs.input.focus()
  }

  /**
   * @public
   * @name this.refs.input.select
   * @description 同 HTMLInputElement.select()
   */
  select () {
    this.refs.input.select()
  }

  render () {
    const { className, size, width, ...other } = this.props
    const classNames = classnames(
      'cmui-input',
      {
        [`cmui-input--${size}`]: size
      },
      className
    )
    if (width) {
      other.style = Object.assign(other.style || {}, { width: width })
    }
    return <input ref="input" className={classNames} {...other} />
  }
}

Input.propTypes = {
  className: PropTypes.string,

  // 输入框的值
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 初始化输入框的值
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 输入改变后的回调，参数为 event 对象
  onChange: PropTypes.func,

  // 输入框大小，除默认外可选值：sm、lg
  size: PropTypes.oneOf(['sm', 'lg']),

  // 是否禁用
  disabled: PropTypes.bool,

  // 同 input placeholder
  placeholder: PropTypes.string,

  width: PropTypes.string,

  customProp ({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default Input
