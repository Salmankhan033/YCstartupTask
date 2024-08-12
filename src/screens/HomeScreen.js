import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import {scheduleNotification} from '../utils/notificationUtils'; // Updated import

const HomeScreen = () => {
  const [toggles, setToggles] = useState(Array(10).fill(false));
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadToggles();
    loadItems();
  }, []);

  const loadToggles = async () => {
    const savedToggles = await AsyncStorage.getItem('toggles');
    if (savedToggles) {
      const loadedToggles = JSON.parse(savedToggles);
      setToggles(
        loadedToggles.length === 10 ? loadedToggles : Array(10).fill(false),
      );
    }
  };

  const loadItems = async () => {
    const savedItems = await AsyncStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  };

  const saveToggles = async newToggles => {
    await AsyncStorage.setItem('toggles', JSON.stringify(newToggles));
  };

  const handleToggle = index => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
    saveToggles(newToggles);
  };

  const addItem = () => {
    if (date === null) {
      Alert.alert(
        'Date Required',
        'Please select a date before adding an item.',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }

    if (newItem.trim() === '') {
      Alert.alert(
        'Empty Field',
        'Please enter a valid item name.',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }

    // If both date and item name are valid, proceed with adding the item
    const updatedItems = [
      ...items,
      {name: newItem.trim(), date: date.toLocaleDateString()},
    ];
    setItems(updatedItems);
    AsyncStorage.setItem('items', JSON.stringify(updatedItems));

    Toast.show({
      type: 'success',
      text1: 'Item Added',
      text2: `${newItem} has been added successfully!`,
    });

    // Clear input field and reset date picker
    setNewItem('');
    setDate(null);
  };

  const handleScheduleButtonPress = () => {
    Alert.alert(
      'Notification Scheduled',
      'A notification will be sent in 10 minutes.',
    );

    // Schedule notification 10 minutes from now
    scheduleNotification(10);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={toggles}
        keyExtractor={(item, index) => `toggle-${index}`}
        renderItem={({item, index}) => (
          <View style={styles.toggleContainer}>
            <AppText style={styles.toggleText}>{`Toggle ${index + 1}`}</AppText>
            <Switch value={item} onValueChange={() => handleToggle(index)} />
          </View>
        )}
        ListHeaderComponent={
          <>
            <AppInput
              label="Item Name"
              placeholder="Enter an item name"
              value={newItem}
              onChangeText={setNewItem}
              style={styles.inputField}
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerContainer}>
              <Icon name="calendar" size={20} color="black" />
              <AppText style={styles.dateText}>
                {date ? date.toLocaleDateString() : 'Select a date'}
              </AppText>
            </TouchableOpacity>
            {showDatePicker && (
              <DatePicker
                modal
                open={showDatePicker}
                date={date || new Date()}
                onConfirm={selectedDate => {
                  setDate(selectedDate);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            )}
            <Button title="Add Item" onPress={addItem} />
            <FlatList
              data={items}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <AppText>{`${item.name} - ${item.date}`}</AppText>
                </View>
              )}
              style={styles.itemList}
            />
          </>
        }
        ListFooterComponent={
          <>
            <Button
              title="Click to Schedule Notification"
              onPress={handleScheduleButtonPress}
            />
            <Toast />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  toggleText: {
    marginRight: wp('4%'),
    width: wp('17%'),
  },
  inputField: {
    fontWeight: '700',
    marginBottom: hp('2%'),
    borderColor: '#ccc',
    borderRadius: wp('5%'),
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  dateText: {
    marginLeft: wp('2%'),
    fontWeight: '400',
  },
  itemContainer: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('2%'),
    margin: wp('1%'),
  },
  itemList: {
    flexGrow: 1,
  },
});

export default HomeScreen;
