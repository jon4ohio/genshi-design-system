import { createComponent } from '@lit/react';
import React from 'react';
import {
  GshBadge,
  GshBox,
  GshButton,
  GshCheckbox,
  GshDialog,
  GshIcon,
  GshInput,
  GshSelect,
  GshStack,
  GshTable,
  GshText,
} from '@genshi/core';

export const Text = createComponent({
  tagName: 'gsh-text',
  elementClass: GshText,
  react: React,
  events: {},
});

export const Box = createComponent({
  tagName: 'gsh-box',
  elementClass: GshBox,
  react: React,
  events: {},
});

export const Stack = createComponent({
  tagName: 'gsh-stack',
  elementClass: GshStack,
  react: React,
  events: {},
});

export const Button = createComponent({
  tagName: 'gsh-button',
  elementClass: GshButton,
  react: React,
  events: {
    onClick: 'click',
  },
});

export const Input = createComponent({
  tagName: 'gsh-input',
  elementClass: GshInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'input',
  },
});

export const Badge = createComponent({
  tagName: 'gsh-badge',
  elementClass: GshBadge,
  react: React,
  events: {},
});

export const Icon = createComponent({
  tagName: 'gsh-icon',
  elementClass: GshIcon,
  react: React,
  events: {},
});

export const Select = createComponent({
  tagName: 'gsh-select',
  elementClass: GshSelect,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const Checkbox = createComponent({
  tagName: 'gsh-checkbox',
  elementClass: GshCheckbox,
  react: React,
  events: {
    onChange: 'change',
  },
});

export const Dialog = createComponent({
  tagName: 'gsh-dialog',
  elementClass: GshDialog,
  react: React,
  events: {
    onClose: 'close',
  },
});

export const Table = createComponent({
  tagName: 'gsh-table',
  elementClass: GshTable,
  react: React,
  events: {},
});

export type TextProps = React.ComponentProps<typeof Text>;
export type BoxProps = React.ComponentProps<typeof Box>;
export type StackProps = React.ComponentProps<typeof Stack>;
export type ButtonProps = React.ComponentProps<typeof Button>;
export type InputProps = React.ComponentProps<typeof Input>;
export type BadgeProps = React.ComponentProps<typeof Badge>;
export type IconProps = React.ComponentProps<typeof Icon>;
export type SelectProps = React.ComponentProps<typeof Select>;
export type CheckboxProps = React.ComponentProps<typeof Checkbox>;
export type DialogProps = React.ComponentProps<typeof Dialog>;
export type TableProps = React.ComponentProps<typeof Table>;
