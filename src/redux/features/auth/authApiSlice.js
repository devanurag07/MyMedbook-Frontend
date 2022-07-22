import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoginOtp: builder.mutation({
      query: (credentials) => ({
        url: "/verify-login-otp-mobile/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/verify-login-otp-mobile/",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: (credentials) => ({
        url: "/logout/",
        method: "POST",
        body: {},
      }),
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: "/user-register/",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    // Getting User using Token
    getCurrentUser: builder.query({
      query: (credentials) => ({
        url: "/get-user/",
        method: "GET",
      }),
    }),

    sendMail: builder.mutation({
      query: (credentials) => ({
        url: "/get-otp-mail/",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    verifyMail: builder.mutation({
      query: (credentials) => ({
        url: "/verify-otp-email/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSendMailMutation,
  useVerifyMailMutation,
  useLazyGetCurrentUserQuery,
  useLogoutMutation,
} = authApiSlice;
