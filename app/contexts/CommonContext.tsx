import axios from '@/utils/axios-instance';
import { colors } from '@/utils/constants/colors';
import _ from 'lodash';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';

interface Toast {
  message?: string;
  type?: 'error' | 'success' | 'info';
}

interface CommonContextType {
  showNotification: () => void;
  toggleDialog: () => void;
  closeAlertDialog: () => void;
  toggleBackdrop: () => void;
  setToast: (toast: Toast) => void;
}

const CommonContext = createContext<CommonContextType>({
  showNotification: () => {},
  toggleDialog: () => {},
  closeAlertDialog: () => {},
  toggleBackdrop: () => {},
  setToast: () => {}
});

interface CommonProviderProps {
  children: ReactNode;
}

function CommonProvider({ children }: CommonProviderProps) {
  const showNotification = () => {};
  const toggleDialog = () => {};
  const closeAlertDialog = () => {};
  const [showBackdrop, setBackdrop] = useState(false);
  const [toast, setToast] = useState<Toast>({});

  const toggleBackdrop = () => {
    setBackdrop((prev) => !prev);
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(undefined, (error: any) => {
      if (error.response) {
        const { status, data } = error.response;
        const errMsgFromApi = data?.message || 'Error occurred, try later';
        
        if (!_.isEmpty(data) && data?.code === 16) {
          // dispatch(commonActions.setReloginDialog(true));
        }

        switch (status || undefined) {
          case 401:
            // logout();
            break;
          case 500:
            setToast({ message: errMsgFromApi, type: 'error' });
            break;
          default:
            break;
        }

        return Promise.reject((error.response && error.response.data) || 'Something went wrong');
      }
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <CommonContext.Provider 
      value={{ 
        showNotification, 
        toggleDialog, 
        closeAlertDialog, 
        toggleBackdrop, 
        setToast 
      }}
    >
      {children}
      {showBackdrop && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
            backgroundColor: colors.coolGray[100]
          }}
        >
          <ActivityIndicator 
            size="large" 
            color={colors.primary} 
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          />
        </View>
      )}

      <Portal>
        <Snackbar
          visible={!_.isEmpty(toast)}
          onDismiss={() => setToast({})}
          duration={5000}
          style={{ 
            backgroundColor: toast.type === 'error' ? colors.error : colors.primary 
          }}
          action={{
            label: 'Dismiss',
            onPress: () => setToast({}),
          }}
        >
          {toast?.message}
        </Snackbar>
      </Portal>
    </CommonContext.Provider>
  );
}

export { CommonContext, CommonProvider };
