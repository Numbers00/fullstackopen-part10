import { useNavigate } from 'react-router-native';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import Text from '../Text';

import theme from '../../theme';

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 4
  },
  imageContainer: {
    padding: 16,
    paddingTop: 0
  },
  buttonContainer: {
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const RepositoryItem = ({ item: repository }) => {
  const navigate = useNavigate();

  const processCount = count => {
    if (count < 1000) return count;
    return `${(count / 1000).toFixed(1)}k`;
  };

  return (
    <Pressable onPress={() => navigate(`/repositories/${repository.id}`)}>
      <View testID='repositoryItem' style={{ backgroundColor: 'white', paddingTop: 16, paddingBottom: 16 }}>
        <View style={[styles.flexRow, { marginBottom: 8 }]}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: repository.ownerAvatarUrl }}
            />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text fontWeight='bold' fontSize='subheading' mb={4}>{ repository.fullName }</Text>
            <Text color='textSecondary' mb={4} style={{ flex: 1, flexWrap: 'wrap' }}>{ repository.description }</Text>
            <Pressable onPress={() => {}}>
              <View style={styles.buttonContainer}>
                <Text isWhite>{ repository.language }</Text>
              </View>
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
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
