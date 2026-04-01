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
      const { data } = await api.post(
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
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.value = action.payload;
      }).addCase(updateUser.fulfilled, (state,action)=>
      {
        state.value=action.payload
      })
  },
});

export default userSlice.reducer;