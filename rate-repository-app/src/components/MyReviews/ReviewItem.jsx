import { useNavigate } from 'react-router-native';

import { Alert, Dimensions, Pressable, StyleSheet, View } from 'react-native';

import Text from '../Text';

import useDeleteReview from '../../hooks/useDeleteReview';

import theme from '../../theme';

const styles = StyleSheet.create({
  blueButton: {
    width: ((Dimensions.get('window').width - 16) / 2) - 16,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    padding: 12
  },
  redButton: {
    width: ((Dimensions.get('window').width - 16) / 2) - 16,
    borderRadius: 4,
    backgroundColor: theme.colors.danger,
    padding: 12
  },
  container: {
    backgroundColor: 'white',
    padding: 16
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
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

const ReviewItem = ({ item: review, refetch }) => {
  const navigate = useNavigate();

  const [deleteReview] = useDeleteReview();

  const onDelete = () => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReview({ id: review.id });
            refetch({ includeReviews: true });
          } catch (e) {
            console.log(e);
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.flexRow, { marginBottom: 8 }]}>
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
      <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
        <Pressable style={styles.blueButton} onPress={() => navigate('/repositories/' + review.repositoryId)}>
          <Text isWhite fontWeight='bold' textAlign='center'>View repository</Text>
        </Pressable>
        <Pressable style={styles.redButton} onPress={() => onDelete()}>
          <Text isWhite fontWeight='bold' textAlign='center'>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;
