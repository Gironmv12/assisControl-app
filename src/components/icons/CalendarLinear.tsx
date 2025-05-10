import Svg, { Path, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function SolarCalendarLinear(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <G fill="none">
        <Path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
        />
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M7 4V2.5M17 4V2.5M2.5 9h19"
        />
        <Path
          fill="currentColor"
          d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        />
      </G>
    </Svg>
  )
}