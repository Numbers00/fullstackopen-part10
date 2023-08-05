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
  buttonContainer: {
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 8
  },
  detailBox: {
    width: '25%',
    alignItems: 'center'
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const RepositoryItem = ({ item }) => {
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
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ item.fullName }</Text>
          <Text color='textSecondary' mb={4} style={{ flex: 1, flexWrap: 'wrap' }}>{ item.description }</Text>
          <Pressable onPress={() => console.log('pressed')}>
            <View style={styles.buttonContainer}>
              <Text isWhite>{ item.language }</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(item.stargazersCount) }</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(item.forksCount) }</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ processCount(item.reviewCount) }</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.detailBox}>
          <Text fontWeight='bold' fontSize='subheading' mb={4}>{ item.ratingAverage }</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
