import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../../constants/theme'

import React from 'react';
import Home from './Home';
import List from './List';
import Plus from './Plus';
import Exit from './Exit';
import Shoe from './Shoe';
import Repeat from './Repeat';
import Timer from './Timer';
import Pause from './Pause';
import Edit from './Edit';
import Connect from './Connect';
import Delete from './Delete';

const icons = {
    home: Home,
    list: List,
    plus: Plus,
    exit: Exit,
    shoe: Shoe,
    repeat: Repeat,
    timer: Timer,
    pause: Pause,
    edit: Edit,
    connect: Connect,
    delete: Delete,
}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}
        color={theme.colors.textLight}
        {...props}
        />
  )
}

export default Icon;

const styles = StyleSheet.create({})