import React from 'react';
import { Button, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker'
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class Detail1Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      language: ''
    }
  }
  render() {
    const data = ['java', 'python', '.net'];
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <Picker
          itemStyle={{ color: 'red', }}
          mode="dialog"
          selectedValue={this.state.language}
          style={{ height: 50, width: 100, color: 'red', }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
        >
          {data.map((item, index) => {
            return (< Picker.Item label={item} value={index} key={index} />);
          })}
        </Picker>
        <Text>{this.state.language}</Text>
      </View>
    );
  }
}
class Detail2Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDateTimePickerVisible: false };
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
  }
  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    console.log(this.state.chosenDate);
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <TouchableOpacity onPress={this._showDateTimePicker} style={{ paddingTop: 20 }}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="date"
          locale={'vie'}
        />
      </View>
    );
  }
}
class Detail3Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2000"
          maxDate="01-01-2100"
          confirmBtnText="Đồng ý"
          cancelBtnText="Bỏ chọn"
          customStyles={{
            dateIcon: {
              // position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => { this.setState({ date: date }); console.log(date) }}
          locale={'vie'}
        />
      </View>
    );
  }
}
class Detail4Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}
const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});

export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
    Detail1Screen: { screen: Detail1Screen },
    Detail2Screen: { screen: Detail2Screen },
    Detail3Screen: { screen: Detail3Screen },
    Detail4Screen: { screen: Detail4Screen },
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Settings') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Detail1Screen') {
          iconName = `ios-square${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Detail2Screen') {
          iconName = `ios-checkbox${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Detail3Screen') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Detail4Screen') {
          iconName = `ios-notifications${focused ? '-off' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      activeBackgroundColor: 'green',
      inactiveBackgroundColor: 'blue'
    },
  }
));
