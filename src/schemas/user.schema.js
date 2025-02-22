"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
