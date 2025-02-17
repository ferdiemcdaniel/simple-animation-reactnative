import React from 'react';
import { 
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Moment from './src/components/moment';

const { width, height } = Dimensions.get("window");
const Images = [
  {image: require('./images/drink1.jpg'), title: "Vodka Cranberry"},
  {image: require('./images/drink2.jpg'), title: "Old Fashion"},
  {image: require('./images/drink3.jpg'), title: "Mule"},
  {image: require('./images/drink4.jpg'), title: "Strawberry Daiquiri"}
];

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    i - 1 * width,
    i * width,
    (i + 1) * width
  ];
  
  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  });
}

const getSeparator = (i) => {
  return (
    <View
      key={i}
      style={[styles.separator, {left: (i - 1) * width - 2.5}]}
    />
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0),
      scrollEnabled: true,
    }

    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus(focused) {
    this.setState({
      scrollEnabled: !focused
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEnabled={this.state.scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: {  contentOffset: { x: this.state.animatedScroll }  } }]
          )}
        >
          {
            Images.map((image, i) => {
              return (
                <Moment
                  key={i}
                  {...image}
                  translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
                  onFocus={this.handleFocus}
                />
              )
            })
          }
          { Array.apply( null, { length: Images.length + 1 } ).map((val, i) => getSeparator(i) ) }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  separator: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5
  }
});
