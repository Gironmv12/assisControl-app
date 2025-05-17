import React from 'react'
import type { ReactNode } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { SolarHome2Linear } from '../components/icons/HomeLinear'
import { SolarPeopleNearbyLinear } from '../components/icons/peopleLinear'
import { SolarAlarmLinear } from '../components/icons/ClockLinear'
import { SolarChartLinear } from '../components/icons/ChartLinear'
import { SolarUserLinear } from '../components/icons/UserLinear'

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const color = isFocused ? '#fff' : '#3e3e3e'

        // Label
        let labelElement: ReactNode
        const rawLabel = options.tabBarLabel ?? options.title ?? route.name
        if (typeof rawLabel === 'function') {
          labelElement = rawLabel({
            focused: isFocused,
            color,
            position: 'below-icon',
            children: route.name,
          })
        } else if (typeof rawLabel === 'string') {
          labelElement = <Text style={[styles.label, { color }]}>{rawLabel}</Text>
        } else {
          labelElement = rawLabel
        }

        // Icono según el nombre de la ruta
        let IconComponent: React.FC<{ color: string; width?: number; height?: number }> = () => null
        switch (route.name) {
          case 'Inicio':
            IconComponent = SolarHome2Linear
            break
          case 'Empleados':
            IconComponent = SolarPeopleNearbyLinear
            break
          case 'Asistencia':
            IconComponent = SolarAlarmLinear
            break
          case 'Reportes':
            IconComponent = SolarChartLinear
            break
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabButton}
          >
            <IconComponent color={color} width={24} height={24} />
            {labelElement}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
})