import React, { useEffect } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0, over = false, setOver, timerStyle, resetTimer }: { hours?: number, minutes?: number, seconds?: number, over: boolean, setOver: (over: boolean) => void, timerStyle?: object, resetTimer?: boolean }) => {
  const [paused, setPaused] = React.useState(false);
  // const [over, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: parseInt(String(hours), 10),
    minutes: parseInt(String(minutes), 10),
    seconds: parseInt(String(seconds), 10)
  });

  useEffect(() => {
    if (resetTimer) {
      reset();
    }
  }, [resetTimer]);

  const tick = () => {
    if (paused || over) {
      return;
    }
    //   if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) setOver(true);
    if (time.seconds === 0) {
      setOver(true);
    } else if (time.minutes == 0 && time.seconds == 0) {
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    } else if (time.seconds == 0) {
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }
  };

  const reset = () => {
    setTime({
      hours: parseInt(String(hours), 10),
      minutes: parseInt(String(minutes), 10),
      seconds: parseInt(String(seconds), 10)
    });
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  //   return <View>
  //       <Text>{'  ' + time.seconds.toString().padStart(2, '0')}</Text>
  //       </View> ;
  return <Text style={timerStyle}>{'  00:' + time.seconds.toString().padStart(2, '0')}</Text>;
};

export default CountdownTimer;
