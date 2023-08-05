import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';

// expo-web-browser seems better than Linking since
// it opens the link in an in-app browser instead of the system browser
// but Linking is used here as per fullstack open instructions
// import * as WebBrowser from 'expo-web-browser';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import Text from '../Text';

import useRepository from '../../hooks/useRepository';

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
  largeButtonContainer: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    padding: 12
  }
});

const Repository = () => {
  const { id } = useParams();

  const { data, loading } = useRepository(id);
  const repository = data?.repository;

  const processCount = count => {
    if (count < 1000) return count;
    return `${(count / 1000).toFixed(1)}k`;
  };

  if (loading) return (<View><Text>Loading repository...</Text></View>);
  else if (!data) return (<View><Text>Repository with id: ${ id } not found</Text></View>);

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
          <Pressable style={styles.buttonContainer} onPress={() => console.log('pressed')}>
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
          style={styles.largeButtonContainer}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text isWhite fontWeight='bold' textAlign='center'>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;
