import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-12 px-4 bg-gray-900/40 rounded-md border-b-2 border-black-200 focus:border-secondary-200 flex flex-row items-center">
      <TextInput
        className="flex-1 text-white text-sm mt-0.5 font-pregular"
        value={query}
        placeholder="Search for a video..."
        placeholderTextColor="#7B7B8B"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {{
          if (!query)
            return ToastAndroid.show(
              "Please enter a search query",
              ToastAndroid.SHORT
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
