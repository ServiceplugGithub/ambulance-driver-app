// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://emsplug.com/api";

// interface ReportedCasesParams {
//   driverId: string;
//   token: string;
// }

// interface ReportedCasesResponse {
//   success: boolean;
//   message: string;
//   result?: any;
// }

// export const reportedCaseListApi = createAsyncThunk<
//   any,
//   ReportedCasesParams,
//   { rejectValue: string }
// >("cases/reportedCaseList", async ({ driverId, token }, thunkApi) => {
//   try {
//     const response = await axios.get<ReportedCasesResponse>(
//       `${BASE_URL}/cases/reported-cases-driver/${driverId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.data?.success) {
//       return response.data.result || true;
//     } else {
//       return thunkApi.rejectWithValue(
//         response.data.message || "Failed to fetch reported cases."
//       );
//     }
//   } catch (error: any) {
//     return thunkApi.rejectWithValue(
//       error?.response?.data?.message || "Network error while fetching cases."
//     );
//   }
// });
