import React, { PureComponent } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { getColumnHeaderDetails } from '../../utils/helpers/github/events'
import { columnHeaderHeight } from '../columns/ColumnHeader'
import { ColumnHeaderItem } from '../columns/ColumnHeaderItem'
import { Avatar } from '../common/Avatar'
import { ColumnsConsumer } from '../context/ColumnsContext'
import { ThemeConsumer } from '../context/ThemeContext'
import { UserConsumer, UserProviderState } from '../context/UserContext'

const logo = require('../../../assets/logo.png') // tslint:disable-line

export const sidebarSize = columnHeaderHeight

const styles = StyleSheet.create({
  centerContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export interface LeftSidebarProps {
  navigation: NavigationScreenProps['navigation']
}

class LeftSidebarComponent extends PureComponent<
  LeftSidebarProps & {
    setAccessToken: UserProviderState['setAccessToken']
  }
> {
  logout = () => {
    this.props.setAccessToken(null)
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View
            style={{
              width: sidebarSize,
              backgroundColor: theme.backgroundColor,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: theme.backgroundColorDarker08,
            }}
          >
            <View
              style={[
                styles.centerContainer,
                {
                  backgroundColor: theme.backgroundColorLess08,
                  width: '100%',
                  height: sidebarSize + StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.backgroundColorDarker08,
                },
              ]}
            >
              <Avatar
                shape="circle"
                size={sidebarSize / 2}
                username="brunolemos"
              />
            </View>

            <ScrollView style={{ flex: 1 }}>
              <ColumnsConsumer>
                {({ columns }) =>
                  !columns
                    ? null
                    : columns.map((column, index) => {
                        const requestTypeIconAndData = getColumnHeaderDetails(
                          column,
                        )

                        return (
                          <View
                            key={`left-sidebar-column-${index}`}
                            style={[
                              styles.centerContainer,
                              {
                                width: '100%',
                                height: sidebarSize + StyleSheet.hairlineWidth,
                              },
                            ]}
                          >
                            <ColumnHeaderItem
                              avatarDetails={
                                requestTypeIconAndData.avatarDetails
                              }
                              iconName={requestTypeIconAndData.icon}
                            />
                          </View>
                        )
                      })
                }
              </ColumnsConsumer>
            </ScrollView>

            <TouchableOpacity
              onPress={this.logout}
              style={[
                styles.centerContainer,
                {
                  width: '100%',
                  height: sidebarSize + StyleSheet.hairlineWidth,
                  paddingLeft: 3,
                },
              ]}
            >
              <ColumnHeaderItem iconName="sign-out" />
            </TouchableOpacity>

            <View
              style={[
                styles.centerContainer,
                {
                  width: '100%',
                  height: sidebarSize + StyleSheet.hairlineWidth,
                },
              ]}
            >
              <Image
                resizeMode="contain"
                source={logo}
                style={{
                  width: sidebarSize / 2,
                  height: sidebarSize / 2,
                  borderRadius: sidebarSize / (2 * 2),
                }}
              />
            </View>
          </View>
        )}
      </ThemeConsumer>
    )
  }
}

export const LeftSidebar = (props: LeftSidebarProps) => (
  <UserConsumer>
    {({ setAccessToken }) => (
      <LeftSidebarComponent {...props} setAccessToken={setAccessToken} />
    )}
  </UserConsumer>
)
