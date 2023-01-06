import React, {useState, useEffect, FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {Button, SsuToast} from '../../atom';

interface Props {
  action: () => void;
  timer?: number;
}

const SsuOTPTimer: FC<Props> = props => {
  const [resend, setResend] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState<any>(0);

  useEffect(() => {
    if (props.timer) {
      setTimer(props.timer);
    }
  }, [props.timer]);

  useEffect(() => {
    let temp = 0;
    let interval: any = null;
    if (resend) {
      /* istanbul ignore next */
      interval = setInterval(() => {
        temp += 1;
        if (timer) {
          setTimer(
            (timer - temp).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }),
          );
        }
      }, 1000);
    }
    if (timer <= 0) {
      clearInterval(interval);
      setResend(false);
      if (props.timer) {
        setTimer(props.timer);
      }
    }
    return () => clearInterval(interval);
  }, [resend, timer, props.timer]);

  // ? setTimeout for modal Visibility
  const setVisibility = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    setTimeout(setVisibility, 2000);
  }, [modalVisible]);

  const renderResend = () => {
    return (
      <View style={styles.resend}>
        <Button
          label="Resend Code"
          onPress={() => {
            setModalVisible(true);
            setResend(true);
            props.action();
          }}
          type="border"
          containerStyles={{
            backgroundColor: color.Pink.linear,
            width: '100%',
            height: mvs(40),
            aspectRatio: undefined,
          }}
        />
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <>
        <View style={styles.renderTimer}>
          <Text style={styles.renderTimeText}>
            You can resend recovery code after <Text>00:{timer}</Text>
          </Text>
          <Button
            label={'Resend Code'}
            disabled={true}
            type="border"
            containerStyles={{
              backgroundColor: color.Dark[50],
              width: '100%',
              height: mvs(40),
              borderWidth: 0,
              aspectRatio: undefined,
            }}
          />
          <SsuToast
            modalVisible={modalVisible}
            onBackPressed={() => setModalVisible(false)}
            children={
              <View style={[styles.modalContainer]}>
                <Text style={[styles.textStyle]}>
                  We've just resend a new code!
                </Text>
              </View>
            }
            modalStyle={{marginHorizontal: ms(24)}}
          />
        </View>
      </>
    );
  };

  return resend ? renderTimer() : renderResend();
};

SsuOTPTimer.defaultProps = {
  timer: 90,
};

const styles = StyleSheet.create({
  resend: {
    width: '100%',
    justifyContent: 'center',
    marginTop: mvs(28),
  },
  renderTimer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: mvs(4),
  },
  renderTimeText: {
    color: color.Success[400],
    marginBottom: mvs(13),
  },
  modalContainer: {
    backgroundColor: color.Success[400],
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});

export default SsuOTPTimer;
