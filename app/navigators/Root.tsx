/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  NavigationContainerRef,
  ParamListBase
} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function isNavigateReady(): boolean {
  return navigationRef.current?.isReady() ?? false;
}

export function navigate<RouteName extends string>(
  name: RouteName,
  params?: object,
  options?: { merge?: boolean }
): void {
  if (isNavigateReady()) {
    // @ts-ignore - React Navigation types are complex, but this is safe
    console.log("kmwekl")
    navigationRef.current?.navigate(name as any, params, options);
  }
}

export function navigateAndReset(
  routes: { name: string; params?: object }[],
  index: number
): void {
  if (isNavigateReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    );
  }
}

export function navigateAndSimpleReset(
  name: string,
  index: number = 0
): void {
  if (isNavigateReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    );
  }
}