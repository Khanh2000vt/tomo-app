import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../constants/index";
import { Tick } from "../Icon";
import { BaseCategoryProps } from "./BaseCategoryModel";
const colors = theme.colors;
const fontSize = theme.fontSize;

function BaseCategory({ item, onPress, isShowTick = true }: BaseCategoryProps) {
  const [tick, setTick] = useState<boolean>(false);

  function handleOnPress() {
    !!onPress && onPress(item, !tick);
    setTick(!tick);
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container]}
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
        <Image
          source={require("../../../assets/png/imgTest.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.textTitle}>{item.title || "Anime"}</Text>
        <Text style={styles.textBody}>{item.members || 100} members</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // height: 94,
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
    // borderRadius: 12,
  },
});

export default BaseCategory;