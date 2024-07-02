import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabsIcon = ({ icon, name, color, focused }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-6 h-6 ${focused ? "opacity-100" : "opacity-60"}`}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2870EA",
          tabBarInactiveTintColor: "#374151",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            backgroundColor: "#000112",
            borderWidth: 0.2,
            borderBottomWidth: 0,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderColor: "#232533",
            height: 84,
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={icons.home}
                name="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        {/* Create Tab */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={icons.plus}
                name="Create"
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={icons.profile}
                name="Profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
