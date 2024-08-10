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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notifications} from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';

const HomeScreen = () => {
  const [toggles, setToggles] = useState(Array(10).fill(false));
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadToggles();
    loadItems();
    scheduleNotification(1); // Example usage
  }, []);

  useEffect(() => {
    Notifications.registerRemoteNotifications();

    const foregroundListener =
      Notifications.events().registerNotificationReceivedForeground(
        (notification, completion) => {
          console.log(
            `Notification received in foreground: ${notification.title} : ${notification.body}`,
          );
          completion({alert: false, sound: false, badge: false});
        },
      );

    const openedListener = Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );

    // Cleanup function to unregister listeners
    return () => {
      foregroundListener.remove();
      openedListener.remove();
    };
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

  const scheduleNotification = minutes => {
    const now = new Date();
    const fireDate = new Date(now.getTime() + minutes * 60 * 1000); // Adding minutes to current time

    Notifications.postLocalNotification({
      title: 'Toggle Notification',
      body: getOnTogglesMessage(toggles),
      fireDate: fireDate.toISOString(), // Schedule the notification for the specified time
    });
  };

  const getOnTogglesMessage = () => {
    const appIcon = '🔔'; // Replace with your actual app icon or emoji
    const onToggles = toggles
      .map((status, index) => (status ? `Toggle ${index + 1}` : null))
      .filter(Boolean);
    return `${appIcon} Toggles ${onToggles.join(
      ', ',
    )} are ON. Please turn them OFF.`;
  };

  const addItem = () => {
    if (date === null) {
      Alert.alert(
        'Date Required',
        'Please select a date before adding an item.',
      );
      return;
    }
    if (newItem.trim() !== '') {
      const updatedItems = [
        ...items,
        {name: newItem.trim(), date: date.toLocaleDateString()},
      ];
      setItems(updatedItems);
      AsyncStorage.setItem('items', JSON.stringify(updatedItems));

      Alert.alert('Item Added', `${newItem} has been added successfully!`);
      setNewItem(''); // Clear the input field
      setDate(null); // Reset the date picker
    } else {
      Alert.alert('Empty Field', 'Please enter a valid item name.');
    }
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
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleText: {
    marginRight: 8,
  },
  inputField: {
    fontWeight: '700',
    marginBottom: 16,
    borderColor: '#ccc',
    padding: 1,
    borderRadius: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    marginLeft: 8,
    fontWeight: '400',
  },
  itemContainer: {
    paddingVertical: 8,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  itemList: {
    flexGrow: 1,
  },
});

export default HomeScreen;
