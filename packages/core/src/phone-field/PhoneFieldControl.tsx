import React from 'react'

import PhoneFieldControlProps from './PhoneFieldControlProps'
import PhoneFieldControlState from './PhoneFieldControlState'

// TODO: get countries from props
import countries from './countries'
import Country from './Country'
import {maskArray} from '../mask'

export default class PhoneFieldControl extends React.Component<PhoneFieldControlProps, PhoneFieldControlState> {

  public state: PhoneFieldControlState = {
    focused: false,
    countryCode: this.props.countryFallback || 'RU',
  }

  private onChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (this.props.onChange) {
      this.props.onChange(e.currentTarget.value)
    }
    const country = this.getCountryByPhone(e.currentTarget.value)
    this.setState({
      countryCode: country !== undefined ? country.code : this.state.countryCode,
    })
  }

  private onFocus: React.FocusEventHandler = (e: React.FocusEvent) => {
    this.setState({
      focused: true,
    })
    e.preventDefault()
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  private onBlur: React.FocusEventHandler = (e: React.FocusEvent) => {
    this.setState({
      focused: false,
    })
    e.preventDefault()
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  private onKeyDown: React.KeyboardEventHandler = (event: React.KeyboardEvent) => {
    if (this.props.onKeyDown && this.props.onKeyDown(event)) {
      event.preventDefault()
    }
  }

  private onKeyUp: React.KeyboardEventHandler = (event: React.KeyboardEvent) => {
    if (this.props.onKeyUp && this.props.onKeyUp(event)) {
      event.preventDefault()
    }
  }

  private getCountryByPhone(phoneNumber: string): Country | undefined {
    const clearPhone = phoneNumber.replace(/\D/g, '')
    const country = countries
      .slice(0)
      .sort((a, b) => b.mask.replace(/\D/g, '').length - a.mask.replace(/\D/g, '').length)
      .find((option) => clearPhone.indexOf(option.mask.replace(/\D/g, '')) === 0)
    return country || countries.find(country => country.code === this.props.countryFallback)
  }

  private getMask: (phoneNumber: string) => maskArray = (phoneNumber = '') => {
    const clearMasks = countries
      .map(country => country.mask.slice(1))
      .sort((a, b) => b.length - a.length)
    const mask: maskArray = ['+']
    const clearValue = phoneNumber.replace(/\D/g, '')
    if (clearValue === '') {
      return mask
    }
    const selectedMask = clearMasks.find(clearMask => clearValue.startsWith(clearMask.replace(/\D/g, '').slice(0, clearValue.length)))
    if (!selectedMask) {
      return this.getMask(phoneNumber.slice(0, -1))
    }
    return mask.concat(selectedMask.split('').map(char => char === 'd' ? /\d/ : new RegExp(char)))
  }

  public render() {
    return this.props.children({
      focused: this.state.focused,
      countryCode: this.state.countryCode,
      mask: this.getMask,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
    })
  }

}
