import styled from '../styled'

import {Card, CardProps, CardNonProps} from './Card'
import {pxValue} from './Value'

export interface TextAreaProps extends CardProps {
  valueSize?: number
  valueWeight?: number
  valueColor?: string
  valueTransform?: 'lowercase' | 'uppercase' | 'capitalize' | 'none'
  valueSpacing?: number
  placeholderSize?: number
  placeholderWeight?: number
  placeholderColor?: string
  placeholderTransform?: 'lowercase' | 'uppercase' | 'capitalize' | 'none'
  placeholderSpacing?: number
}

export const TextAreaNonProps = [
  'valueSize', 'valueWeight', 'valueColor', 'valueTransform', 'valueSpacing',
  'placeholderSize', 'placeholderWeight', 'placeholderColor', 'placeholderTransform', 'placeholderSpacing',
].concat(CardNonProps)

export const TextArea = styled(Card.withComponent('textarea'), {
  shouldForwardProp: (prop) => !TextAreaNonProps.includes(prop),
})<TextAreaProps>(({theme, ...props}) => ({
  fontFamily: theme.font.family,
  fontSize: pxValue(props.valueSize, theme.scale),
  fontWeight: props.valueWeight,
  lineHeight: pxValue(props.valueSize, theme.scale),
  color: props.valueColor,
  textTransform: props.valueTransform,
  textIndent: 0,
  letterSpacing: pxValue(props.valueSpacing),
  outline: 'none',
  resize: 'none',
  overflowY: 'auto',
  MozAppearance: 'textfield',
  '&::placeholder': {
    fontSize: pxValue(props.placeholderSize, theme.scale),
    fontWeight: props.placeholderWeight,
    lineHeight: pxValue(props.placeholderSize, theme.scale),
    color: props.placeholderColor,
    textTransform: props.placeholderTransform,
    letterSpacing: pxValue(props.placeholderSpacing),
  },
}))