import React, { PureComponent } from 'react'
import {
  NavigationScreenConfig,
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation'

import Columns from '../components/columns/Columns'
import EventColumn from '../components/columns/EventColumn'
import Screen from '../components/common/Screen'

export default class FeedScreen extends PureComponent<NavigationScreenProps> {
  static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = {
    header: null,
  }

  render() {
    return (
      <Screen>
        <Columns>
          <EventColumn
            subtype="received_events"
            type="users"
            username="brunolemos"
          />
          <EventColumn subtype="events" type="users" username="brunolemos" />
        </Columns>
      </Screen>
    )
  }
}
