# 💤 SleepTracker App 

## About

SleepTracker is a simple cross-platform mobile app built using Ionic, React, and IndexedDB. The primary goal of this project was to explore Ionic's capabilities for building mobile applications that work seamlessly on iOS and Android while leveraging web technologies.

## 🚀 Features  
✅ **Track Overnight Sleep** – Log sleep start and wake-up times  

✅ **Daytime Sleepiness Tracking** – Record sleepiness ratings, timestamps, and optional notes  

✅ **Sleep Duration Calculation** – Automatically calculates total hours slept  

✅ **Offline Support** – Data is stored locally using **IndexedDB**  

✅ **Modern UI** – Designed with Ionic components for a native-like experience. 

## Why This App?

This project was created as an experiment to evaluate how well Ionic handles mobile development, including:

- Performance across different devices.

- Ease of use for integrating native functionalities.

- Data storage capabilities with IndexedDB in a mobile environment.

![Screenshot 2025-03-05 at 19 00 06](https://github.com/user-attachments/assets/2963b428-9e5d-4266-bf5c-ee25b6b160b5)


## Future Improvements

💡 Cloud Syncing – Sync sleep data with Firebase or a backend API for cross-device access

💡 Push Notifications – Reminders for a consistent sleep schedule

💡 Data Visualization – Graphs and trends for better sleep insights

💡 Dark Mode – Improve user experience in low-light conditions

## 🛠 Running the App Locally  

### 1 Install Dependencies  
Ensure you have **Node.js** and **Ionic CLI** installed. If not, install them:  

``` npm install -g @ionic/cli ```

Clone the repository and install dependencies

### 2 Run the App in the Browser
Start the development server with:

``` ionic serve ```

### 3 Run on a Mobile Device (Optional)
To run on a connected Android/iOS device or emulator:

``` ionic capacitor run android ```

``` ionic capacitor run ios ```
