import { StyleSheet, View } from 'react-native';

import Text from '../Text';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  longText: {
    flex: 1,
    flexWrap: 'wrap'
  }
});

const ReviewItem = ({ item: review }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 16 }}>
        <View style={styles.ratingCircle}>
          <Text fontSize='subheading' fontWeight='bold' color='primary'>{ review.rating }</Text>
        </View>
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text fontSize='subheading' fontWeight='bold' mb={4}>{ review.user.username }</Text>
        <Text color='textSecondary' mb={4}>{ new Date(review.createdAt).toLocaleDateString() }</Text>
        <Text style={styles.longText}>{ review.text }</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
