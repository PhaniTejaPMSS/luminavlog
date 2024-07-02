import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  title,
  thumbnail,
  video,
  username,
  avatar,
  createdAt,
}) => {
  const [play, setPlay] = useState(0);

  function adjustTimeByOffset(timestamp, hours, minutes) {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
  }

  const originalTimestamp = createdAt;
  const adjustedTimestamp = adjustTimeByOffset(originalTimestamp, 3, 30);
  const dateCreated = adjustedTimestamp.toString();

  return (
    <View className="flex flex-col items-center px-4 pt-2 mt-2 border-b-2 border-gray-400/10 pb-8">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2 flex-col items-end px-2">
          <Text className="text-xs text-gray-100 font-pregular">
            {dateCreated.substring(11, 16)}
          </Text>
          <Text className="text-xs text-gray-100 font-pregular">
            {dateCreated.substring(8, 10)}/{dateCreated.substring(5, 7)}/
            {dateCreated.substring(2, 4)}
          </Text>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
