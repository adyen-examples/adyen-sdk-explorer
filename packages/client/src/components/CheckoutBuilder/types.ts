import { ChangeEvent } from 'react';
import type { Descriptor, OnDeckPropType } from '../../app/types';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface ConfigPropTypes {
  step: number;
  configuration: OnDeckPropType;
  descriptors: Descriptor[];
  action: ActionCreatorWithPayload<any>;
  updateStore: (value: any, action: any) => void;
  setActiveStep: (step: number) => void;
  content?: any;
}

export type UpdateConfig = (key: string, value: string | null, current?: any) => void;

export type AddOrRemoveProp = (e: ChangeEvent<HTMLInputElement>) => void | undefined;

export type HandleInput = (e: ChangeEvent<HTMLInputElement>, current?: string) => void;

export type { Descriptor, OnDeckPropType };
