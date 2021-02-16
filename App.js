import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//  Screens
import UserPosts from './app/components/UserPosts';
import PostComment from './app/components/PostComment';
import DeletePost from './app/components/DeletePost';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserPosts">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="UserPosts"
          component={UserPosts}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="PostComment"
          component={PostComment}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DeletePost"
          component={DeletePost}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
