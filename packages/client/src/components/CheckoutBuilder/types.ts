import { ChangeEvent } from 'react';
import type { Descriptor, OnDeckPropType } from '../../app/types';

export type HandleInput = (e: ChangeEvent<HTMLInputElement>, current?: string) => void;

export type { Descriptor, OnDeckPropType };
