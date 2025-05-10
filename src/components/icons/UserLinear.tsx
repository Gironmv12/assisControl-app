import Svg, { Path, G, Circle } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function SolarUserLinear(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <G fill="none" stroke="currentColor" strokeWidth="1.5">
        <Circle cx="12" cy="6" r="4" />
        <Path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
      </G>
    </Svg>
  )
}