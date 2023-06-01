import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BulkState {
    isBulk: boolean
}

const initialState = { isBulk: false } as BulkState

const bulkSlice = createSlice({
    name: 'bulkSlice',
    initialState,
    reducers: {

        setIsBulk(state, action: PayloadAction<boolean>) {
            state.isBulk = action.payload;
        }

    },
})

export const { setIsBulk } = bulkSlice.actions
export default bulkSlice.reducer