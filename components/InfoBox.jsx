import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, titleStyles, containerStyles }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
