import { users } from "../dummyData/data.js"
import bcrypt, { genSalt } from "bcryptjs";
import User from "../models/user.model.js";

const userResolver = {
    Mutation: {
        signUp: async (__, { input }, context) => {
            try {
                const { username, name, gender, password } = input;
                if (!username || !name || !gneder || !password) {
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hashedPassword(password, salt);

                // https://avatar-placeholder.iran.liara.run/
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
                })

                await newUser.save();
                await context.log(newUser);
                return newUser;
            } catch (err) {
                console.error("Error in signUp: ", err);
                throw new Error(err.message || "Internal server error");

            }
        },
        login: async (__, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new Error("All fields are requied");
                }

                const { user } = await context.authenticate("graphql-local", { username, password });

                await context.login(user);
                return user;
            } catch (err) {
                console.error("Error in login:", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        logout: async (__, __, context) => {
            try {

                await context.logout();
                context.req.session.destroy((err) => {
                    if (err) {
                        throw new err;
                    }
                })
                context.res.clearCookie("Connect.sid");
                return { message: "Loggout out successsfully" }
            } catch (err) {
                console.error("Error in logout:", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Query: {
        authUser: async (__, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.error("Error in authUser: ", err);
                throw new Error("Internal server error");
            }
        },
        user: async (__, { userId }) => {
            try {
                const user = await User.findOne({ userId });
                return user;
            } catch (err) {
                console.error("Error in user query:", err);
                throw new Error(err.message || "Error getting user");
            }
        }
    }
}

export default userResolver