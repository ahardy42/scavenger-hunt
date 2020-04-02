import React from 'react';
import moment, { Moment } from 'moment';

export const useStopWatch: () => [number, () => void] = () => {
    const [seconds, setSeconds] = React.useState<number>(0);
    const [startTime, setStartTime] = React.useState<Moment>(null);
    const timerRef = React.useRef<number>(null);

    const start: () => void = () => {
        setStartTime(moment());
    }

    React.useEffect(() => {
        if (startTime) {
            timerRef.current = setInterval(() => {
                let newTime: number = moment().diff(startTime, 'second');
                setSeconds(newTime);
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        }

    }, [startTime]);

    return [seconds, start];
}