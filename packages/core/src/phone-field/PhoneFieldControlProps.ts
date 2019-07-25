import React from 'react'

import RenderChild from '../RenderChild'

import CountryCode from './CountryCode'
import {maskArray} from '../mask'

export default interface PhoneFieldControlProps {
  countryFallback?: CountryCode
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: React.KeyboardEvent) => boolean
  onKeyUp?: (event: React.KeyboardEvent) => boolean
  children: RenderChild<{
    focused: boolean
    countryCode: CountryCode
    mask: (value: string) => maskArray
    onChange: React.ChangeEventHandler
    onFocus: React.FocusEventHandler
    onBlur: React.FocusEventHandler
    onKeyDown: React.KeyboardEventHandler
    onKeyUp: React.KeyboardEventHandler
  }>
}
