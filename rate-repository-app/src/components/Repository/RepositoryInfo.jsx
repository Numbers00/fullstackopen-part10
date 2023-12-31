import * as Linking from 'expo-linking';

// expo-web-browser seems better than Linking since
// it opens the link in an in-app browser instead of the system browser
// but Linking is used here as per fullstack open instructions
// import * as WebBrowser from 'expo-web-browser';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import Text from '../Text';

import theme from '../../theme';

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 8
  },
  imageContainer: {
    padding: 16,
    paddingTop: 0
  },
  button: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 4
  },
  detailBox: {
    width: '25%',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  largeButton: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    padding: 12
  }
});

const RepositoryInfo = ({ repository }) => {
  
  const processCount = count => {
    if (count < 1000) return count;
    return `${(count / 1000).toFixed(1)}k`;
  };

  return (
    <View testID='repositoryItem' style={{ backgroundColor: 'white', paddingTop: 16, paddingBottom: 16 }}>
      <View style={[styles.flexRow, { marginBottom: 8 }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ repository.fullName }</Text>
          <Text color='textSecondary' mb={4} style={{ flexWrap: 'wrap' }}>{ repository.description }</Text>
          <Pressable style={styles.button} onPress={() => console.log('pressed')}>
            <Text isWhite>{ repository.language }</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(repository.stargazersCount) }</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(repository.forksCount) }</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(repository.reviewCount) }</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ repository.ratingAverage }</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Pressable
          style={styles.largeButton}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text isWhite fontWeight='bold' textAlign='center'>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RepositoryInfo;
