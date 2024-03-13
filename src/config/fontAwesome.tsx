
// Font awesone icons
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

const solidSvgIcons=[
	fas,
	faCircleArrowDown,
]
const brandsSvgIcons=[
	faTwitter,
	faFontAwesome,
]
const regularSvgIcons=[
	faSquarePlus,
	faTrashCan,
]
library.add(
	...brandsSvgIcons,
	...regularSvgIcons,
	...solidSvgIcons,
)