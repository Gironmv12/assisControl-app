import Svg, { Path, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function SolarChartLinear(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <G fill="none" stroke="currentColor" strokeWidth="1.5">
        <Path strokeLinecap="round" d="M22 22H2" />
        <Path d="M21 22v-7.5a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5V22m0 0V5c0-1.414 0-2.121-.44-2.56C14.122 2 13.415 2 12 2s-2.121 0-2.56.44C9 2.878 9 3.585 9 5v17m0 0V9.5A1.5 1.5 0 0 0 7.5 8h-3A1.5 1.5 0 0 0 3 9.5V22" />
      </G>
    </Svg>
  )
}