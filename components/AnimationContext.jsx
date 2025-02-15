import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { theme } from '../constants/theme';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animationColor, setAnimationColor] = useState(theme.colors.transparent);
  const animationProgress = useRef(new Animated.Value(0));

  const startAnimation = (duration, lapCountNumber, repetitions, delay) => {
    const timePerLap = duration / lapCountNumber;
    animationProgress.current.setValue(0);

    const lapAnimation = Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: timePerLap,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    Animated.loop(
      Animated.sequence([
        Animated.loop(lapAnimation, { iterations: lapCountNumber }),
        Animated.delay(delay),
      ]),
      { iterations: repetitions }
    ).start();
  };

  return (
<AnimationContext.Provider
  value={{
    startAnimation,
    animationProgress,
    animationColor,
    setAnimationColor,
  }}
>
  {children}
</AnimationContext.Provider>
  );
};

export const useAnimationContext = () => useContext(AnimationContext);
