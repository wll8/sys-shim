import type { ITabChangeValue } from '../w-easy-tabs/type'
import type { RunCodeType } from '@/store/main/type'
import type { IPublicOption } from '@/types'

export type TabOptionType = IPublicOption<RunCodeType>
export type IChoiceTabChangeValue = ITabChangeValue<TabOptionType>
