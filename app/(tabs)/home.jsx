import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "@/lib/appwriteConfig";
import useAppwrite from "@/lib/useAppwrite";
import { useState } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary pb-24">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            className="relative"
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            username={item.creator.username}
            avatar={item.creator.avatar}
            createdAt={item.$createdAt}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username.toString()}
                </Text>
              </View>

              <Image
                source={images.logoSmall}
                className="w-12 h-14"
                resizeMode="contain"
              />
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-4 pb-2">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending
                posts={latestPosts ?? []}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            </View>

            <Text className="text-lg font-pregular text-gray-100 mt-1 mb-1">
              All Videos
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
