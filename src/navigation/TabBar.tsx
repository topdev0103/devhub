import React, { ComponentType } from 'react'
import { TabBarBottomProps, TabBarTopProps } from 'react-navigation'
import TabBarBottom from 'react-navigation-deprecated-tab-navigator/src/views/TabBarBottom'
import TabBarTop from 'react-navigation-deprecated-tab-navigator/src/views/TabBarTop'

import Platform from '../libs/platform'
import darkTheme from '../styles/themes/dark'
import { ITheme } from '../types'

// TODO: Use real theme coming from state management library
interface IWithThemeRenderProps {
  theme: ITheme
}

interface IWithThemeProps {
  children: (args: IWithThemeRenderProps) => any
}

const WithTheme = ({ children }: IWithThemeProps) =>
  children({ theme: darkTheme })

type BaseTabBarProps = TabBarBottomProps | TabBarTopProps

const BaseTabBar = Platform.selectUsingRealOS({
  android: TabBarTop as ComponentType<BaseTabBarProps>,
  default: TabBarBottom as ComponentType<BaseTabBarProps>,
})

const TabBar = (props: BaseTabBarProps) => (
  <WithTheme>
    {({ theme }: IWithThemeRenderProps) => (
      <BaseTabBar
        {...props}
        activeTintColor={theme.brand}
        inactiveTintColor={theme.base05}
        indicatorStyle={{
          backgroundColor: theme.brand,
        }}
        showLabel={Platform.OS === 'ios'}
        showIcon
        style={{
          backgroundColor: theme.tabBarBackground || theme.base02,
          ...Platform.selectUsingRealOS({
            ios: { padding: 3, borderTopColor: theme.base01 },
          }),
        }}
      />
    )}
  </WithTheme>
)

export default TabBar
