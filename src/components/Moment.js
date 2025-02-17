import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";

const {width,height} = Dimensions.get("window");

export default class Moment extends Component {
    constructor(props){
        super(props);
        this.state = {
            scale: new Animated.Value(1)
        }
        this.handlePress = this.handlePress.bind(this);
    }

    componentWillMount() {
        this.bgFadeInterpolate = this.state.scale.interpolate({
            inputRange: [.9, 1],
            outputRange: ["rgba(0,0,0,.3)", "rgba(0,0,0,0)"]
        });
        this.textFade = this.state.scale.interpolate({
            inputRange: [.9, 1],
            outputRange: [0, 1]
        });
        this.calloutTranslate = this.state.scale.interpolate({
            inputRange: [.9, 1],
            outputRange: [0, 150]
        });
    }

    handlePress() {
        if(this.props.focused) {
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: 300
            }).start(() => this.props.onFocus(false))
            return;
        }
        Animated.timing(this.state.scale, {
            toValue: .9,
            duration: 300
        }).start(() => this.props.onFocus(true))
    }

    render() {
        const animatedStyle = {
            transform: [
                { translateX: this.props.translateX },
                { scale: this.state.scale }
            ]
        };

        const bgFadeStyle = {
            backgroundColor: this.bgFadeInterpolate
        };

        const textFadeStyle = {
            opacity: this.textFade
        };

        const  calloutStyle = {
            transform: [{translateY: this.calloutTranslate}]
        };

        return(
            <View style={styles.container}>
                <View>
                    <View style={styles.container}>
                        <Animated.Image
                            source={this.props.image}
                            style={[styles.image, animatedStyle]}
                            resizeMode="cover"
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={this.handlePress}>
                        <Animated.View style={[StyleSheet.absoluteFill, styles.center, bgFadeStyle]}>
                            <Animated.View style={[styles.textWrap, textFadeStyle]}>
                                <Text style={styles.title}>{this.props.title}</Text>
                            </Animated.View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <Animated.View style={[styles.callout, calloutStyle]}>
                        <View>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        width: width,
        height: height
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    center: {
        justifyContent: "center"
    },
    textWrap: {
        backgroundColor: "rgba(0,0,0,.5)",
        paddingVertical: 10
    },
    title: {
        backgroundColor: "transparent",
        fontSize: 30,
        color: '#FFF',
        textAlign: "center"
    },
    callout: {
        height: 150,
        backgroundColor: "rgba(0,0,0,.5)",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    }
});

