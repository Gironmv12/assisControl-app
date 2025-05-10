import Svg, { Path, G, Circle } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function SolarAlarmLinear(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <G fill="none" stroke="currentColor" strokeWidth="1.5">
        <Circle cx="12" cy="13" r="9" />
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l2.5 2.5m-11-11l4-2.5m13 2.5l-4-2.5" />
      </G>
    </Svg>
  )
}