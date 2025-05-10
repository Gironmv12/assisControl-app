import Svg, { Path, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

export function SolarHome2Linear(props: SvgProps) {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <G fill="none" stroke="currentColor" strokeWidth="1.5">
        <Path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z"></Path>
        <Path strokeLinecap="round" d="M12 15v3"></Path>
      </G>
    </Svg>
  )
}