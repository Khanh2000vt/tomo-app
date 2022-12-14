import { Tick } from "@components/Icon";
import { theme } from "@theme";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BaseCategoryProps } from "./BaseCategoryModel";
const colors = theme.colors;
const fontSize = theme.fontSize;

function BaseCategory({
  community,
  onPress,
  isShowTick = true,
  isShowMember = true,
  style,
}: BaseCategoryProps) {
  const amountMember = community.members.length;
  const [tick, setTick] = useState<boolean>(false);

  function handleOnPress() {
    !!onPress && onPress(community, !tick);
    setTick(!tick);
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      onPress={handleOnPress}
    >
      {isShowTick && (
        <View
          style={[
            styles.iconView,
            {
              backgroundColor: tick ? colors.primary : colors.Neutral0,
            },
          ]}
        >
          <Tick />
        </View>
      )}
      <View>
        <Image source={{ uri: community.avatar }} style={styles.image} />
      </View>
      <View style={styles.body}>
        <Text style={styles.textTitle}>{community.name}</Text>
        {isShowMember && (
          <Text style={styles.textBody}>{amountMember} members</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  iconView: {
    marginRight: 28,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  body: {
    flex: 1,
    marginLeft: 16,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: fontSize.font18,
    color: colors.Neutral10,
    marginVertical: 2,
  },
  textBody: {
    fontWeight: "500",
    fontSize: fontSize.font14,
    color: colors.Neutral4,
    marginVertical: 2,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 12,
  },
});

export default BaseCategory;
