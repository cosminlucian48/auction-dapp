import { Meta } from '@storybook/angular/types-6-0';

import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    // Can't rerender component, so changing the args does nothing
    label: { control: 'text' },
    modifier: {},
    disabled: {},
  },
} as Meta;

export const CreateAccount = () => ({
  props: {
    label: 'Create Account',
    modifier: 'gradient round',
  },
});

export const Privacy = () => ({
  props: {
    label: 'I Accept',
    modifier: 'dashed round',
  },
});

export const Continue = () => ({
  props: {
    label: 'Continue',
    modifier: 'wide',
  },
});

export const Social = () => ({
  props: {
    modifier: 'light',
    label: 'Log in with Google',
    image: '/assets/img/google.svg',
  },
});

export const Default = () => ({
  props: {
    label: 'Default',
  },
});

export const Disabled = () => ({
  props: {
    label: 'Default',
    modifier: 'disabled',
  },
});

export const LogIn = () => ({
  props: {
    label: 'Log In',
    modifier: 'image-right round uppercase',
    image: '/assets/img/button__login.svg',
  },
});

export const LogOut = () => ({
  props: {
    label: 'Log Out',
    modifier: 'image-right round uppercase',
    image: '/assets/img/button__logout.svg',
  },
});
