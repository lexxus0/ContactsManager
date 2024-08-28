import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", contactData);
      toast.success("Contact added successfully!");
      return data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      toast.success("Contact deleted successfully!");
      return data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, updatedData);
      toast.success("Contact updated successfully!");
      return data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
