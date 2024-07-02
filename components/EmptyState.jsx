import { images } from "@/constants";
import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-gray-50">{title}</Text>
      <Text className="text-sm font-pmedium text-gray-200 mt-2">{subtitle}</Text>
      <CustomButton title="Create a video" handlePress={() => router.push("/create")} containerStyles={"w-[80%] my-5"} />
    </View>
  );
};

export default EmptyState;
