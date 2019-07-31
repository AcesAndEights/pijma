import React, {FC} from 'react'

import {Flex, FlexItem, IconWrapper, LinkControl, Lnk} from '@qiwi/pijma-core'
import {Icon} from '@qiwi/pijma-media'
import {Text} from '../typography'

export interface FileLinkProps {
  onClick?: (
    href?: string,
    target?: string,
    download?: string | boolean,
    rel?: string,
  ) => void
  onFocus?: () => void
  onBlur?: () => void
  tabIndex?: number
  href?: string
  target?: string
  download?: string | boolean
  rel?: string
  title?: string
}

const FlexLink = Flex.withComponent(Lnk)

export const FileLink: FC<FileLinkProps> = (props) => (
  <LinkControl
    onClick={props.onClick}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    href={props.href}
    target={props.target}
    download={props.download}
    rel={props.rel}
    children={(renderProps) => (
      <FlexLink
        tabIndex={props.tabIndex}
        href={props.href}
        role="link"
        aria-label="file"
        target={props.target}
        download={props.download}
        rel={props.rel}
        title={props.title}
        display="inline-flex"
        cursor="pointer"
        onFocus={renderProps.onFocus}
        onBlur={renderProps.onBlur}
        onClick={renderProps.onClick}
        onMouseEnter={renderProps.onMouseEnter}
        onMouseLeave={renderProps.onMouseLeave}
        onMouseUp={renderProps.onMouseUp}
        onMouseDown={renderProps.onMouseDown}
      >
        <FlexItem
          display="inline-block"
          width={6}
          height={6}
          mr={2}
          shrink={0}
        >
          <IconWrapper
            color={
              renderProps.hover || renderProps.focus || renderProps.active
                ? '#FF8C00'
                : '#000'
            }
          >
            <Icon name="file" />
          </IconWrapper>
        </FlexItem>
        <FlexItem>
          <Text
            color={
              renderProps.hover || renderProps.focus || renderProps.active ? 'warning' : 'default'
            }
            decoration="none"
            size="m"
            bold={false}
            children={props.children}
          />
        </FlexItem>
      </FlexLink>
    )}
  />
)