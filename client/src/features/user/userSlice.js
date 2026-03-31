import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../api/axios";

const initialState = {
  value: null,
  loading: true,
};

// 🔄 FETCH USER
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token) => {
    try {
      const { data } = await api.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data.success ? data.user : null;
    } catch (error) {
      console.log("FETCH USER ERROR:", error);
      return null;
    }
  }
);

// 🔄 UPDATE USER
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userData, token }) => {
    try {
      const { data } = await api.put(
        "/api/user/update",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        return data.user;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      toast.error("Update failed");
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      })

      // 🔄 UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;