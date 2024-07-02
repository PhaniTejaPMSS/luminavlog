import { images } from "@/constants";
import { Image, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[56px] w-full justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {!isLoading ? (
      <Text className={`text-gray-300 font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
      )
      : (
        <Image source={images.loading} className="w-6 h-6" resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
