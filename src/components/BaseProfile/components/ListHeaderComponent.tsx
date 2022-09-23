import { BaseButton, PencilLine, SvgCopy, VectorBack } from "@components";
import { BaseHeader } from "@components/BaseHeader";
import { Navigation, OtherProfile } from "@constant/index";
import { theme } from "@theme";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListHeaderProps } from "../BaseProfileModel";

function ListHeaderComponent({
  isProfileSelf,
  status,
  listAmount = [],
  listSocial = [],
  listJoined = [],
  avatar,
  name,
  idAccount,
  introduction,
  navigation,
}: ListHeaderProps) {
  return (
    <>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../../../assets/png/coverImage.png")}
          style={styles.profileImageCover}
        />
        <BaseHeader
          title={isProfileSelf ? "Your profile" : undefined}
          IconLeft={<VectorBack stroke={theme.colors.Neutral0} />}
          onPressLeft={() => navigation.goBack()}
          IconRight={isProfileSelf && <PencilLine />}
          onPressRight={() =>
            isProfileSelf && navigation.navigate(Navigation.UPDATE_PROFILE)
          }
          styleHeader={styles.styleHeader}
          styleTitleHeader={styles.styleTitleHeader}
        />
        <Image source={{ uri: avatar }} style={styles.profileImageAvt} />
      </View>

      <View style={styles.accountViewBody}>
        <Text style={styles.textNameAccount}>{name}</Text>
        <View style={styles.accountViewID}>
          <Text style={styles.textID}>ID: {idAccount}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
            <SvgCopy />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.amountView}>
        {listAmount.map((item) => {
          return (
            <BaseButton
              title={item.amount}
              IconLeft={item.icon}
              color={item.color}
              backgroundColor={theme.colors.colorInput}
              style={styles.buttonListAmount}
              styleText={styles.textButtonListAmount}
              key={item.id}
            />
          );
        })}
      </View>

      {(status === OtherProfile.FRIEND || isProfileSelf) && (
        <View style={styles.viewSocial}>
          {listSocial.map((item) => {
            return (
              <BaseButton
                title={item.title}
                key={item.id}
                IconLeft={item.icon}
                style={styles.buttonListSocial}
                styleText={styles.textButtonSocial}
                backgroundColor={theme.colors.colorInput}
                color={theme.colors.Neutral10}
              />
            );
          })}
        </View>
      )}

      <View style={styles.viewIntroduction}>
        <Text style={styles.textTitle}>Introduction</Text>
        <Text style={styles.textBodyIntroduction}>{introduction}</Text>
      </View>

      <View style={styles.viewJoinedCommunities}>
        <Text style={styles.textTitle}>Joined communities</Text>
        <View style={styles.bodyJoinedCommunities}>
          {listJoined.map((joinedCommunity, index) => {
            return (
              <TouchableOpacity style={styles.viewJoinedCommunity} key={index}>
                <Image
                  source={{ uri: joinedCommunity.image_url }}
                  style={styles.imageJoined}
                />
                <Text style={styles.textJoinedCommunity}>
                  {joinedCommunity.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    height: 212 + 54,
    justifyContent: "flex-end",
  },
  profileImageCover: {
    position: "absolute",
    top: 0,
    height: 212,
  },
  profileImageAvt: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
  },
  styleHeader: {
    marginBottom: 33,
    paddingHorizontal: 28,
  },
  styleTitleHeader: {
    color: theme.colors.Neutral0,
  },
  accountViewBody: {
    flex: 1,
    // marginLeft: 20,
    alignItems: "center",
    marginTop: 14,
  },
  textNameAccount: {
    color: theme.colors.darkerPrimary,
    fontWeight: "600",
    fontSize: theme.fontSize.font24,
    marginBottom: 4,
  },
  accountViewID: {
    flexDirection: "row",
  },
  textID: {
    fontWeight: "400",
    fontSize: theme.fontSize.font14,
    color: theme.colors.Neutral6,
    marginRight: 20,
  },
  buttonListSocial: {
    marginVertical: 6,
    paddingVertical: 17,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
  },
  textButtonSocial: {
    paddingHorizontal: 16,
  },
  viewIntroduction: {
    marginTop: 42,
    paddingHorizontal: 24,
  },
  textBodyIntroduction: {
    fontWeight: "400",
    fontSize: theme.fontSize.font16,
    color: theme.colors.Neutral6,
    flex: 1,
    lineHeight: 26,
    marginTop: 20,
  },
  amountView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  viewSocial: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  textTitle: {
    fontWeight: "600",
    fontSize: theme.fontSize.font24,
    color: theme.colors.Neutral10,
    lineHeight: 33,
  },
  buttonListAmount: {
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 16,
    borderRadius: 100,
    height: undefined,
    marginHorizontal: 8,
  },
  textButtonListAmount: {
    marginHorizontal: 0,
    marginLeft: 12,
  },
  viewJoinedCommunities: {
    marginTop: 48,
    paddingHorizontal: 24,
  },
  bodyJoinedCommunities: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewJoinedCommunity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.colorInput,
    padding: 10,
    paddingRight: 16,
    borderRadius: 16,
    marginVertical: 8,
    marginRight: 15,
    // flex: 1,
  },
  textJoinedCommunity: {
    fontWeight: "600",
    fontSize: theme.fontSize.font18,
    color: theme.colors.Neutral6,
    marginLeft: 16,
  },
  imageJoined: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
});

export default ListHeaderComponent;
