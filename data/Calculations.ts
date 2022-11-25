import { useSignal, signal, effect, computed } from '@preact/signals'

// [ "2", "1", "x", "5" ]
export const CurrentStack = signal([])

// 0
export const CurrentValue = signal([])

// [[ "2", "1", "x", "5" ]]
export const AllStack = signal([])
