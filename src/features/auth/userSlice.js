import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
    },
    reducers: {
        setUser: (state, action) => {
            const p = action.payload;
            const pp = p.personalInfo ? p.personalInfo : {};
            const pa = p.address ? p.address : {};

            state.jwt = p.jwt;
            state.userId = p.userId;
            state.image = p.image;

            state.personalInfo = {
                phoneNumber: pp.phoneNumber,
                email: pp.email,
                firstname: pp.firstname,
                lastname: pp.lastname
            };
            state.address = {
                region: pa.region,
                district: pa.district,
                city: pa.city,
                street: pa.street,
                building: pa.building,
                apartment: pa.apartment,
                postalCode: pa.postalCode
            }
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;