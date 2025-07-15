// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { reportedCaseListApi } from './CaseReportedApi';

// interface ReportAccidentState {
//   reportedAccidentList: Record<string, any>; 
//   isReportedAccidentLoading: boolean;
// }

// const initialState: ReportAccidentState = {
//   reportedAccidentList: {},
//   isReportedAccidentLoading: false,
// };

// const reportAccidentSlice = createSlice({
//   name: 'ReportAccident',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(reportedCaseListApi.pending, (state) => {
//         state.isReportedAccidentLoading = true;
//       })
//       .addCase(reportedCaseListApi.rejected, (state) => {
//         state.isReportedAccidentLoading = true;
//       })
//       .addCase(reportedCaseListApi.fulfilled, (state, action: PayloadAction<any>) => {
//         state.isReportedAccidentLoading = false;
//         state.reportedAccidentList = action.payload;
//       });
//   },
// });

// export default reportAccidentSlice.reducer;
