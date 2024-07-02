import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[96vh] px-4">
          <Image
            source={images.logo}
            className="w-[225px] h-[145px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] mt-4"
            resizeMode="contain"
          />

          <View className="relative mt-2">
            <Text className="text-lg text-white font-plight text-center px-4">
              Share, Discover, Inspire
            </Text>
          </View>

          <CustomButton
            title="Continue with email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-[90%] mt-6"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#000112" style="light" />
    </SafeAreaView>
  );
}
