import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwriteConfig";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      ToastAndroid.show("User signed in successfully", ToastAndroid.SHORT);
      router.replace("/home");
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-6">
          <View className="w-full justify-center items-center">
            <Image
              source={images.logo}
              className="w-[225px] h-[145px] mt-6"
              resizeMode="contain"
            />
          </View>

          <Text className="text-3xl text-white font-pmedium mt-5">Sign In</Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder={"tony.stark@example.com"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder={"••••••••••"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="pt-5 justify-center w-full flex-row gap-2">
            <Text className="font-pregular text-gray-100">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="font-pmedium text-[#286feaca]">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
